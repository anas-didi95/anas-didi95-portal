/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.sse.service;

import com.anasdidi.portal.module.sse.dto.SseDTO;
import jakarta.inject.Singleton;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.Many;

@Singleton
public class SseRegistry {

  private static final Logger LOG = LoggerFactory.getLogger(SseRegistry.class);
  private final Map<String, Sinks.Many<SseDTO>> clientSinks = new ConcurrentHashMap<>();

  public Flux<SseDTO> registerClient(String clientId) {
    LOG.info("Registering client: {}", clientId);
    Sinks.Many<SseDTO> sink = Sinks.many().multicast().onBackpressureBuffer(100, false);
    sink.tryEmitNext(new SseDTO("SSE Connected"));
    clientSinks.put(clientId, sink);

    return sink.asFlux()
        .timeout(Duration.ofMinutes(5))
        .doOnError(err -> LOG.warn("Client {} error: {}", clientId, err))
        .doFinally(
            signalType -> {
              LOG.info("Cleaning up client {}: {}", clientId, signalType);
              clientSinks.remove(clientId);
            });
  }

  public void sendToClient(String clientId, SseDTO message) {
    Many<SseDTO> sink = clientSinks.get(clientId);
    if (sink != null) {
      sink.tryEmitNext(message);
    } else {
      LOG.warn("No sink found for client: {}", clientId);
    }
  }

  public void broadcastToAll(SseDTO message) {
    clientSinks.forEach((id, sink) -> sink.tryEmitNext(message));
  }

  public int getActiveClientCount() {
    return clientSinks.size();
  }
}
