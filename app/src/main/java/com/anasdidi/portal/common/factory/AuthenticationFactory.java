/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.factory;

import com.anasdidi.portal.common.CommonConstants;
import com.anasdidi.portal.module.user.entity.UserEntity;
import com.anasdidi.portal.module.user.entity.UserTokenEntity;
import com.anasdidi.portal.module.user.repository.UserRepository;
import com.anasdidi.portal.module.user.repository.UserTokenRepository;
import com.nimbusds.jwt.JWTClaimsSet;
import io.micronaut.context.annotation.Factory;
import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.authentication.AuthenticationException;
import io.micronaut.security.authentication.AuthenticationFailed;
import io.micronaut.security.authentication.AuthenticationFailureReason;
import io.micronaut.security.authentication.AuthenticationResponse;
import io.micronaut.security.authentication.provider.HttpRequestReactiveAuthenticationProvider;
import io.micronaut.security.event.LogoutEvent;
import io.micronaut.security.token.jwt.validator.GenericJwtClaimsValidator;
import io.micronaut.security.token.jwt.validator.JWTClaimsSetUtils;
import jakarta.inject.Named;
import jakarta.inject.Singleton;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

@Factory
class AuthenticationFactory {

  private static final Logger log = LoggerFactory.getLogger(AuthenticationFactory.class);
  private final Scheduler scheduler;
  private final UserRepository userRepository;
  private final UserTokenRepository userTokenRepository;
  private final PasswordEncoder passwordEncoder;

  AuthenticationFactory(
      @Named(TaskExecutors.BLOCKING) ExecutorService executorService,
      UserRepository userRepository,
      UserTokenRepository userTokenRepository,
      PasswordEncoder passwordEncoder) {
    this.scheduler = Schedulers.fromExecutor(executorService);
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Singleton
  <A> HttpRequestReactiveAuthenticationProvider<A> authenticationProvider() {
    return (requestContext, authenticationRequest) ->
        Flux.<AuthenticationResponse>create(
                emitter -> {
                  log.trace("[authenticationProvider] START...");

                  String username = authenticationRequest.getIdentity();
                  Optional<UserEntity> result = userRepository.findByUsername(username);
                  if (result.isEmpty()) {
                    log.error("[authenticationProvider] User Not Found! {}", username);
                    emitter.error(
                        new AuthenticationException(
                            new AuthenticationFailed(AuthenticationFailureReason.USER_NOT_FOUND)));
                  }

                  UserEntity userEntity = result.get();
                  if (userEntity.getIsDeleted()) {
                    log.error("[authenticationProvider] User Deleted! {}", username);
                    emitter.error(
                        new AuthenticationException(
                            new AuthenticationFailed(AuthenticationFailureReason.USER_DISABLED)));
                  } else if (!passwordEncoder.matches(
                      authenticationRequest.getSecret(), userEntity.getPassword())) {
                    log.error("[authenticationProvider] User Password Not Matched! {}", username);
                    emitter.error(
                        new AuthenticationException(
                            new AuthenticationFailed(
                                AuthenticationFailureReason.CREDENTIALS_DO_NOT_MATCH)));
                  } else {
                    OffsetDateTime effectiveFromDate =
                        OffsetDateTime.now().truncatedTo(ChronoUnit.SECONDS);
                    Optional<UserTokenEntity> result2 =
                        userTokenRepository.findByUserId(userEntity.getId());
                    result2.ifPresentOrElse(
                        o -> {
                          o.setEffectiveFromDate(effectiveFromDate);
                          userTokenRepository.update(o);
                        },
                        () -> {
                          UserTokenEntity o = new UserTokenEntity();
                          o.setVersion(0);
                          o.setIsDeleted(false);
                          o.setCreateBy(CommonConstants.USER_SYSTEM);
                          o.setUpdateBy(CommonConstants.USER_SYSTEM);
                          o.setUserId(userEntity.getId());
                          o.setEffectiveFromDate(effectiveFromDate);
                          userTokenRepository.save(o);
                        });

                    log.info("[authenticationProvider] User authenticated...{}", username);

                    emitter.next(AuthenticationResponse.success(userEntity.getUsername()));
                    emitter.complete();
                  }
                },
                FluxSink.OverflowStrategy.ERROR)
            .subscribeOn(scheduler);
  }

  @Singleton
  <T> GenericJwtClaimsValidator<T> effectiveFromJwtClaimsValidator() {
    return (claims, request) -> {
      log.trace("[effectiveFromJwtClaimsValidator] START...");

      JWTClaimsSet jwt = JWTClaimsSetUtils.jwtClaimsSetFromClaims(claims);
      String username = jwt.getSubject();
      Optional<UserTokenEntity> result = userTokenRepository.findByUsername(username);

      if (result.isEmpty()) {
        log.error("[effectiveFromJwtClaimsValidator] User Token Not Found! {}", username);
        return false;
      }

      UserTokenEntity token = result.get();
      OffsetDateTime effectiveFromDate = token.getEffectiveFromDate();
      OffsetDateTime issueTime = jwt.getIssueTime().toInstant().atOffset(ZoneOffset.UTC);
      log.debug(
          "[effectiveFromJwtClaimsValidator] username={}, effectiveFromDate={}, issueTime={}",
          username,
          effectiveFromDate,
          issueTime);

      if (token
          .getEffectiveFromDate()
          .isAfter(OffsetDateTime.from(jwt.getIssueTime().toInstant().atOffset(ZoneOffset.UTC)))) {
        log.error("[effectiveFromJwtClaimsValidator] User Token Ineffective! {}", username);
        return false;
      }
      return true;
    };
  }

  @Singleton
  ApplicationEventListener<LogoutEvent> logoutEventListener() {
    return event -> {
      log.trace("[logoutEventListener] START...");

      Authentication authentication = (Authentication) event.getSource();
      String username = authentication.getName();

      OffsetDateTime effectiveFromDate = OffsetDateTime.now().truncatedTo(ChronoUnit.SECONDS);
      Optional<UserTokenEntity> result = userTokenRepository.findByUsername(username);
      result.ifPresent(
          o -> {
            o.setEffectiveFromDate(effectiveFromDate);
            userTokenRepository.update(o);
          });

      log.info("[logoutEventListener] User logout...{}", username);
    };
  }
}
