/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.config;

import io.micronaut.context.annotation.Factory;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpRequest;
import io.micronaut.security.authentication.AuthenticationRequest;
import io.micronaut.security.authentication.AuthenticationResponse;
import io.micronaut.security.authentication.provider.HttpRequestReactiveAuthenticationProvider;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

@Factory
public class AuthenticationProvider<B> implements HttpRequestReactiveAuthenticationProvider<B> {

  @Override
  public @NonNull Publisher<AuthenticationResponse> authenticate(
      @Nullable HttpRequest<B> requestContext,
      @NonNull AuthenticationRequest<String, String> authenticationRequest) {
    System.out.println("HERE");
    return Flux.create(
        emitter -> {
          System.out.println("HERE1 " + authenticationRequest.getIdentity());
          if (authenticationRequest.getIdentity().equals("sherlock")
              && authenticationRequest.getSecret().equals("password")) {
            emitter.next(
                AuthenticationResponse.success((String) authenticationRequest.getIdentity()));
            emitter.complete();
          } else {
            System.out.println("HERE2");
            emitter.error(AuthenticationResponse.exception());
          }
        },
        FluxSink.OverflowStrategy.ERROR);
  }
}
