/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.controller.impl;

import com.anasdidi.portal.module.user.controller.UserController;
import com.anasdidi.portal.module.user.dto.AddUserDTO;
import com.anasdidi.portal.module.user.enums.EventEnum;
import com.anasdidi.portal.module.user.service.UserService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import java.net.URI;
import java.util.Map;
import java.util.UUID;

@Controller("/api/v1/user")
class UserControllerV1 extends UserController {

  UserControllerV1(Map<String, UserService<?, ?>> serviceMap) {
    super(serviceMap);
  }

  @Override
  @Post
  public HttpResponse<Void> addUser(@Body AddUserDTO reqBody) {
    UserService<AddUserDTO, UUID> service = this.prepareService(EventEnum.ADD_USER);
    UUID id = service.handle(reqBody);
    return HttpResponse.created(URI.create("/api/v1/user/" + id.toString()));
  }
}
