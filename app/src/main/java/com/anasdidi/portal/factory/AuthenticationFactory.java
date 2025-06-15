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
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

@Factory
public class AuthenticationFactory {

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
                  System.out.println("HERE");
                  Optional<UserEntity> result =
                      userRepository.findByUserId(authenticationRequest.getIdentity());
                  if (result.isEmpty()) {
                    System.out.println("HERE 1");
                    emitter.error(
                        new AuthenticationException(
                            new AuthenticationFailed(AuthenticationFailureReason.USER_NOT_FOUND)));
                  }

                  UserEntity userEntity = result.get();
                  if (userEntity.getIsDeleted()) {
                    System.out.println("HERE 2");
                    emitter.error(
                        new AuthenticationException(
                            new AuthenticationFailed(AuthenticationFailureReason.USER_DISABLED)));
                  } else if (!userEntity.getPassword().equals(authenticationRequest.getSecret())) {
                    System.out.println("HERE 3");
                    emitter.error(
                        new AuthenticationException(
                            new AuthenticationFailed(
                                AuthenticationFailureReason.CREDENTIALS_DO_NOT_MATCH)));
                  } else {
                    System.out.println("OK");
                    emitter.next(AuthenticationResponse.success(userEntity.getUserId()));
                    emitter.complete();
                  }
                },
                FluxSink.OverflowStrategy.ERROR)
            .subscribeOn(scheduler);
  }
}
