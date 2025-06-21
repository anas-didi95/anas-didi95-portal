/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.controller.impl;

import com.anasdidi.portal.module.user.controller.UserController;
import com.anasdidi.portal.module.user.dto.AddUserDTO;
import com.anasdidi.portal.module.user.service.UserService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import java.net.URI;
import java.util.Map;

@Controller("/api/v1/user")
class UserControllerV1 implements UserController {

  private final Map<String, UserService<?, ?>> serviceMap;

  UserControllerV1(Map<String, UserService<?, ?>> serviceMap) {
    this.serviceMap = serviceMap;
  }

  @SuppressWarnings("unchecked")
  @Override
  @Post
  public HttpResponse<Void> addUser(@Body AddUserDTO reqBody) {
    UserService<AddUserDTO, Void> service =
        (UserService<AddUserDTO, Void>) serviceMap.get("USER_ADD_USER");
    service.handle(reqBody);
    return HttpResponse.created(URI.create("/api/v1/user"));
  }
}
