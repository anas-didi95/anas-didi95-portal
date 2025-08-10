/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.sse.service;

import com.anasdidi.portal.module.sse.dto.SseDTO;
import io.micronaut.context.annotation.Value;
import jakarta.annotation.PreDestroy;
import jakarta.inject.Singleton;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.EmitResult;
import reactor.core.publisher.Sinks.Many;

@Singleton
public class SseRegistry {

  private static final Logger LOG = LoggerFactory.getLogger(SseRegistry.class);
  private final Map<String, Sinks.Many<SseDTO>> sinkMap;
  private final Duration sinkTimeout;

  public SseRegistry(@Value("${app.module.SSE.timeout}") Duration sinkTimeout) {
    this.sinkMap = new ConcurrentHashMap<>();
    this.sinkTimeout = sinkTimeout;
    LOG.info("SSE Timeout: {}", sinkTimeout);
  }

  public Flux<SseDTO> registerClient(String clientId) {
    LOG.info("Registering client: {}", clientId);

    // Handle re-registration
    Sinks.Many<SseDTO> oldSink = sinkMap.remove(clientId);
    if (oldSink != null) {
      LOG.warn("Client {} is already registered. Replacing existing connection.", clientId);
      oldSink.tryEmitComplete(); // Clean up previous sink
    }

    Sinks.Many<SseDTO> sink = Sinks.many().multicast().onBackpressureBuffer(100, false);

    // Send initial connection message
    emitToSink(clientId, sink, new SseDTO("SSE Connected"));

    sinkMap.put(clientId, sink);

    return sink.asFlux()
        .timeout(sinkTimeout)
        .doOnError(err -> LOG.warn("Client {} error: {}", clientId, err.getMessage()))
        .doFinally(
            signalType -> {
              LOG.info("Cleaning up client {}: {}", clientId, signalType);
              sinkMap.remove(clientId);
              sink.tryEmitComplete(); // Ensure sink completes
            });
  }

  public void sendToClient(String clientId, SseDTO message) {
    Many<SseDTO> sink = sinkMap.get(clientId);
    if (sink != null) {
      emitToSink(clientId, sink, message);
    } else {
      LOG.warn("No sink found for client: {}", clientId);
    }
  }

  public void broadcastToAll(SseDTO message) {
    sinkMap.forEach((id, sink) -> emitToSink(id, sink, message));
  }

  public int getActiveClientCount() {
    return sinkMap.size();
  }

  @PreDestroy
  void shutdown() {
    LOG.info("Shutting down SseRegistry. Disconnecting all clients.");
    sinkMap.forEach(
        (id, sink) -> {
          sink.tryEmitComplete();
          LOG.info("Client {} disconnected during shutdown.", id);
        });
    sinkMap.clear();
  }

  private void emitToSink(String clientId, Sinks.Many<SseDTO> sink, SseDTO message) {
    EmitResult result = sink.tryEmitNext(message);
    if (result.isFailure()) {
      LOG.warn("Emit failed for client {}: {}", clientId, result);
    }
  }
}
