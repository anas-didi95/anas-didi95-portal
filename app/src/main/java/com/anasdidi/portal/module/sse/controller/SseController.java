/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.sse.controller;

import com.anasdidi.portal.common.aspect.TraceLog;
import com.anasdidi.portal.module.sse.dto.SseDTO;
import com.anasdidi.portal.module.sse.service.SseRegistry;
import io.micronaut.http.HttpResponse;
import io.micronaut.security.authentication.Authentication;
import reactor.core.publisher.Flux;

@TraceLog
public abstract class SseController {

  protected final SseRegistry registry;

  protected SseController(SseRegistry registry) {
    this.registry = registry;
  }

  protected abstract Flux<SseDTO> connect(Authentication authentication);

  protected abstract HttpResponse<Integer> count();
}
