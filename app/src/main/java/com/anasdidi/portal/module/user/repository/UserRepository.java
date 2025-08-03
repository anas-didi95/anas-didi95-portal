/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.repository;

import com.anasdidi.portal.module.user.entity.UserEntity;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.repository.PageableRepository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends PageableRepository<UserEntity, UUID> {

  Optional<UserEntity> findByUsername(String username);

  Page<UserEntity> search(Pageable pageable);
}
