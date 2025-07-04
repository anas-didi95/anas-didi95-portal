/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.service.impl;

import com.anasdidi.portal.module.user.UserConstants;
import com.anasdidi.portal.module.user.dto.AddUserDTO;
import com.anasdidi.portal.module.user.entity.UserEntity;
import com.anasdidi.portal.module.user.repository.UserRepository;
import com.anasdidi.portal.module.user.service.UserService;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.utils.SecurityService;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Named;
import jakarta.inject.Singleton;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;

@Singleton
@Named(UserConstants.EVENT_ADD_USER)
@Transactional
class AddUserService implements UserService<AddUserDTO, UUID> {

  private static final Logger log = LoggerFactory.getLogger(AddUserService.class);
  private final SecurityService securityService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  AddUserService(
      SecurityService securityService,
      UserRepository userRepository,
      PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.securityService = securityService;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UUID handle(AddUserDTO inDTO) {
    log.trace("[handle] START...");

    String createBy = securityService.getAuthentication().map(Authentication::getName).orElse(null);
    UserEntity user = new UserEntity();
    user.setIsDeleted(false);
    user.setVersion(0);
    user.setCreateBy(createBy);
    user.setUpdateBy(createBy);
    user.setUsername(inDTO.username());
    user.setPassword(passwordEncoder.encode(inDTO.password()));
    user.setName(inDTO.name());
    userRepository.save(user);

    log.info("[handle] User created...{}", user.getUsername());
    return user.getId();
  }
}
