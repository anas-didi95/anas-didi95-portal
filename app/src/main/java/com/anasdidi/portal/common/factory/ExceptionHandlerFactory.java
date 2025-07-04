/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.factory;

import com.anasdidi.portal.common.aspect.TraceContext;
import com.anasdidi.portal.common.error.BaseError;
import com.anasdidi.portal.common.error.UnexpectedError;
import io.micronaut.context.LocalizedMessageSource;
import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MediaType;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Factory
class ExceptionHandlerFactory {

  private static final Logger log = LoggerFactory.getLogger(ExceptionHandlerFactory.class);
  private final LocalizedMessageSource messageSource;
  private final TraceContext traceContext;

  @Inject
  ExceptionHandlerFactory(LocalizedMessageSource messageSource, TraceContext traceContext) {
    this.messageSource = messageSource;
    this.traceContext = traceContext;
  }

  @Singleton
  @Requires(classes = {Exception.class, ExceptionHandler.class})
  ExceptionHandler<Exception, HttpResponse<?>> unexpectedError() {
    return (request, exception) -> {
      log.error("", exception);

      HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
      UnexpectedError error = new UnexpectedError(Map.of("message", exception.getMessage()));
      String message = getMessage(error, httpStatus);
      return prepareResponse("unexpectedError", error, message, request, httpStatus);
    };
  }

  private String getMessage(BaseError error, HttpStatus httpStatus) {
    String errorCode = error.error.code;
    return "[%s] %s Ref[%s]"
        .formatted(
            errorCode,
            messageSource.getMessageOrDefault(
                "error." + errorCode, httpStatus.getReason(), error.variable),
            traceContext.getTraceId());
  }

  private HttpResponse<?> prepareResponse(
      String logTag,
      BaseError exception,
      String message,
      HttpRequest<?> request,
      HttpStatus httpStatus) {
    log.debug("[{}] errorCode={}, message={}", logTag, exception.error.code, message);
    log.debug(
        "[{}] classMethod={}, variable={}",
        logTag,
        traceContext.getClassMethod(),
        exception.variable);
    log.debug(
        "[{}] controller={}, controllerParam={}",
        logTag,
        traceContext.getController(),
        traceContext.getControllerParam());

    return HttpResponse.status(httpStatus).contentType(MediaType.TEXT_PLAIN).body(message);
  }
}
