/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.controller;

import com.anasdidi.portal.common.aspect.TraceLog;
import com.anasdidi.portal.module.user.dto.AddUserDTO;
import io.micronaut.http.HttpResponse;

@TraceLog
public interface UserController {

  HttpResponse<Void> addUser(AddUserDTO reqBody);
}
