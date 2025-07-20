/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.controller;

import com.anasdidi.portal.common.aspect.TraceLog;
import com.anasdidi.portal.module.user.dto.AddUserDTO;
import com.anasdidi.portal.module.user.dto.IUserDTO;
import com.anasdidi.portal.module.user.enums.EventEnum;
import com.anasdidi.portal.module.user.service.UserService;
import io.micronaut.http.HttpResponse;
import java.util.Map;

@TraceLog
public abstract class UserController {

  protected final Map<String, UserService<?, ?>> serviceMap;

  protected UserController(Map<String, UserService<?, ?>> serviceMap) {
    this.serviceMap = serviceMap;
  }

  protected abstract HttpResponse<Void> addUser(AddUserDTO reqBody);

  @SuppressWarnings("unchecked")
  protected final <A extends IUserDTO, B> UserService<A, B> prepareService(EventEnum event) {
    UserService<A, B> service = (UserService<A, B>) serviceMap.get(event.code);
    return service;
  }
}
