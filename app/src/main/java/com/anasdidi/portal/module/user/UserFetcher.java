/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user;

import com.anasdidi.portal.common.SearchDTO;
import com.anasdidi.portal.module.user.dto.UserDTO;
import com.anasdidi.portal.module.user.entity.UserEntity;
import com.anasdidi.portal.module.user.repository.UserRepository;
import graphql.schema.DataFetcher;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import jakarta.inject.Singleton;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Singleton
public class UserFetcher {

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  UserFetcher(UserRepository userRepository, UserMapper userMapper) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
  }

  public DataFetcher<SearchDTO<UserDTO>> getUsers() {
    return env -> {
      int pageNo = env.getArgument("pageNo");
      int totalRecordsPerPage =
          (int) Optional.ofNullable(env.getArgument("totalRecordsPerPage")).orElse(10);
      Pageable pageable = Pageable.from(pageNo - 1, totalRecordsPerPage);

      Page<UserEntity> search = userRepository.search(pageable);
      List<UserDTO> resultList = search.getContent().stream().map(userMapper::toDTO).toList();
      SearchDTO.Pagination pagination =
          new SearchDTO.Pagination(pageNo, search.getTotalSize(), totalRecordsPerPage);
      return new SearchDTO<UserDTO>(resultList, pagination);
    };
  }

  public DataFetcher<UserDTO> getUser() {
    return env -> {
      UUID id = UUID.fromString(env.getArgument("id"));

      Optional<UserEntity> result = userRepository.findById(id);
      return result.map(userMapper::toDTO).orElse(null);
    };
  }
}
