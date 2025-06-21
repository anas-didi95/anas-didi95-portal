/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record AddUserDTO(String username, String password, String name) implements IUserDTO {}
