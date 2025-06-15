/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user;

import com.anasdidi.portal.module.common.BaseEntity;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Serdeable
@Entity
@Table(name = "T_USER")
public class UserEntity extends BaseEntity {

  @Column(name = "UserId")
  private String userId;

  @Column(name = "Pwd")
  private String password;

  @Column(name = "Nm")
  private String name;

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
