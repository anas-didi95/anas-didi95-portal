/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.repository;

import com.anasdidi.portal.module.user.entity.UserTokenEntity;
import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserTokenRepository extends CrudRepository<UserTokenEntity, UUID> {

  Optional<UserTokenEntity> findByUserId(UUID userId);

  @Query(
      value =
          """
          SELECT a.*
          FROM T_USER_TOKEN a
          INNER JOIN T_USER b ON b.ID = a.USER_ID
          WHERE b.USERNAME = :username
          """,
      nativeQuery = true)
  Optional<UserTokenEntity> findByUsername(String username);
}
