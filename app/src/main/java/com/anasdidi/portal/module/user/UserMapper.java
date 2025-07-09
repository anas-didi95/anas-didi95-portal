/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user;

import com.anasdidi.portal.module.user.dto.UserDTO;
import com.anasdidi.portal.module.user.entity.UserEntity;
import io.micronaut.context.annotation.Mapper;

public interface UserMapper {

  @Mapper
  UserDTO toDTO(UserEntity entity);
}
