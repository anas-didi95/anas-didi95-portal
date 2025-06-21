/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.entity;

import com.anasdidi.portal.module.common.BaseEntity;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.UUID;

@Serdeable
@Entity
@Table(name = "T_USER_TOKEN")
public class UserTokenEntity extends BaseEntity {

  @Column(name = "USER_ID")
  private UUID userId;

  @Column(name = "EFF_FROM_DT")
  private OffsetDateTime effectiveFromDate;

  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public OffsetDateTime getEffectiveFromDate() {
    return effectiveFromDate;
  }

  public void setEffectiveFromDate(OffsetDateTime effectiveFromDate) {
    this.effectiveFromDate = effectiveFromDate;
  }
}
