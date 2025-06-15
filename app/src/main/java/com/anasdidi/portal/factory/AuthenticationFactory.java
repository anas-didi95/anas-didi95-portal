/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.factory;

import com.anasdidi.portal.module.user.UserEntity;
import com.anasdidi.portal.module.user.UserRepository;
import io.micronaut.context.annotation.Factory;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.security.authentication.AuthenticationException;
import io.micronaut.security.authentication.AuthenticationFailed;
import io.micronaut.security.authentication.AuthenticationFailureReason;
import io.micronaut.security.authentication.AuthenticationResponse;
import io.micronaut.security.authentication.provider.HttpRequestReactiveAuthenticationProvider;
import jakarta.inject.Named;
import jakarta.inject.Singleton;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

@Factory
public class AuthenticationFactory {

  private final Logger log = LoggerFactory.getLogger(AuthenticationFactory.class);
  private final Scheduler scheduler;
  private final UserRepository userRepository;

  public AuthenticationFactory(
      @Named(TaskExecutors.BLOCKING) ExecutorService executorService,
      UserRepository userRepository) {
    this.scheduler = Schedulers.fromExecutor(executorService);
    this.userRepository = userRepository;
  }

  @Singleton
  public <A> HttpRequestReactiveAuthenticationProvider<A> authenticationProvider() {
    return (requestContext, authenticationRequest) ->
        Flux.<AuthenticationResponse>create(
                emitter -> {
                  log.trace("[authenticationProvider] Start authentication...");

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
                  } else if (!userEntity.getPassword().equals(authenticationRequest.getSecret())) {
                    log.error("[authenticationProvider] User Password Not Matched! {}", username);
                    emitter.error(
                        new AuthenticationException(
                            new AuthenticationFailed(
                                AuthenticationFailureReason.CREDENTIALS_DO_NOT_MATCH)));
                  } else {
                    log.debug("[authenticationProvider] User authenticated. {}", username);
                    emitter.next(AuthenticationResponse.success(userEntity.getUsername()));
                    emitter.complete();
                  }
                },
                FluxSink.OverflowStrategy.ERROR)
            .subscribeOn(scheduler);
  }
}
