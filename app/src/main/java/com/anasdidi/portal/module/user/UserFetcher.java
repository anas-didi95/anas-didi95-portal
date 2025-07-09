/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user;

import com.anasdidi.portal.module.user.dto.UserDTO;
import com.anasdidi.portal.module.user.repository.UserRepository;
import graphql.schema.DataFetcher;
import jakarta.inject.Singleton;
import java.util.List;

@Singleton
public class UserFetcher {

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  UserFetcher(UserRepository userRepository, UserMapper userMapper) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
  }

  public DataFetcher<List<UserDTO>> getUserList() {
    return env -> userRepository.findAll().stream().map(userMapper::toDTO).toList();
  }
}
