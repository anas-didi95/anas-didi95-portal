/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.entity;

import com.anasdidi.portal.common.BaseEntity;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Serdeable
@Entity
@Table(name = "T_USER")
public class UserEntity extends BaseEntity {

  @Column(name = "USERNAME")
  private String username;

  @Column(name = "PWD")
  private String password;

  @Column(name = "NM")
  private String name;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
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
