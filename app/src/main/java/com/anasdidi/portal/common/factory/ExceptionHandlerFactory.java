/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.factory;

import com.anasdidi.portal.common.aspect.TraceContext;
import com.anasdidi.portal.common.error.BaseError;
import com.anasdidi.portal.common.error.E01ValidationError;
import com.anasdidi.portal.common.error.E99UnexpectedError;
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
import jakarta.validation.ConstraintViolationException;
import java.util.Map;
import java.util.Optional;
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
  @Requires(classes = {ConstraintViolationException.class})
  ExceptionHandler<ConstraintViolationException, HttpResponse<?>> E01ValidationError() {
    return (request, exception) -> {
      log.error("", exception);

      HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
      E01ValidationError error = new E01ValidationError(Map.of("message", exception.getMessage()));
      String message = getMessage(error, httpStatus);
      return prepareResponse("E01ValidationError", error, message, request, httpStatus);
    };
  }

  @Singleton
  @Requires(classes = {Exception.class, ExceptionHandler.class})
  ExceptionHandler<Exception, HttpResponse<?>> E99UnexpectedError() {
    return (request, exception) -> {
      log.error("", exception);

      HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
      E99UnexpectedError error = new E99UnexpectedError(Map.of("message", exception.getMessage()));
      String message = getMessage(error, httpStatus);
      return prepareResponse("E99UnexpectedError", error, message, request, httpStatus);
    };
  }

  private String getMessage(BaseError error, HttpStatus httpStatus) {
    String errorCode = error.error.code;
    String message =
        "[%s] %s"
            .formatted(
                errorCode,
                messageSource.getMessageOrDefault(
                    "error." + errorCode, httpStatus.getReason(), error.variable));
    return Optional.ofNullable(traceContext.getTraceId())
        .map(s -> message + " Ref[%s]".formatted(s))
        .orElse(message);
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
