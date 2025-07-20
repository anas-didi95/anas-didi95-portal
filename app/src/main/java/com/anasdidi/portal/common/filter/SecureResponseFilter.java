/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.filter;

import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.ResponseFilter;
import io.micronaut.http.annotation.ServerFilter;
import jakarta.annotation.Nullable;

@ServerFilter(ServerFilter.MATCH_ALL_PATTERN)
class SecureResponseFilter {

  @ResponseFilter
  void responseFilter(MutableHttpResponse<?> response, @Nullable Throwable failure) {
    // do not allow proxies to cache the data
    response.getHeaders().add("Cache-Control", "no-store, no-cache");

    // prevents Internet Explorer from MIME - sniffing a response away from the declared
    // content-type
    response.getHeaders().add("X-Content-Type-Options", "nosniff");

    // Strict HTTPS (for about ~6Months)
    response.getHeaders().add("Strict-Transport-Security", "max-age=" + 15768000);

    // IE8+ do not allow opening of attachments in the context of this resource
    response.getHeaders().add("X-Download-Options", "noopen");

    // enable XSS for IE
    response.getHeaders().add("X-XSS-Protection", "1; mode=block");

    // deny frames
    response.getHeaders().add("X-FRAME-OPTIONS", "DENY");
  }
}
