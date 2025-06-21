/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.service;

import com.anasdidi.portal.module.user.dto.IUserDTO;

public interface UserService<A extends IUserDTO, B> {

  B handle(A inDTO);
}
