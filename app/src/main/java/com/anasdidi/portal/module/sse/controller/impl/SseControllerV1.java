/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.sse.controller.impl;

import com.anasdidi.portal.module.sse.controller.SseController;
import com.anasdidi.portal.module.sse.dto.SseDTO;
import com.anasdidi.portal.module.sse.service.SseRegistry;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.security.authentication.Authentication;
import reactor.core.publisher.Flux;

@Controller("/api/v1/sse")
class SseControllerV1 extends SseController {

  SseControllerV1(SseRegistry registry) {
    super(registry);
  }

  @Override
  @Get(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM)
  protected Flux<SseDTO> connect(Authentication authentication) {
    String clientId = authentication.getName();
    return this.registry.registerClient(clientId);
  }

  @Override
  @Get("/count")
  protected HttpResponse<Integer> count() {
    return HttpResponse.ok(this.registry.getActiveClientCount());
  }
}
