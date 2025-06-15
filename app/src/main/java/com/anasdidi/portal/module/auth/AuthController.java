/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.auth;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Controller(value = "/api/auth")
public class AuthController {

  @Post(value = "/test")
  HttpResponse<Map<String, String>> signIn(Principal principal) {
    Map<String, String> resBody = new HashMap<>();
    resBody.put("message", "Hello, %s".formatted(principal.getName()));
    return HttpResponse.ok(resBody);
  }
}
