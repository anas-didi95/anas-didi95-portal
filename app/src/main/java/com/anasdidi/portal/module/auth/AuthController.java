/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.auth;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.session.Session;
import java.util.HashMap;
import java.util.Map;

@Controller(value = "/portal/api/auth")
public class AuthController {

  @Post(value = "/test")
  HttpResponse<Map<String, String>> signIn(Session session) {
    Map<String, String> resBody = new HashMap<>();
    resBody.put("message", "Hello, %s".formatted(session.getId()));
    return HttpResponse.ok(resBody);
  }
}
