/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

@Serdeable
public record AddUserDTO(
    @NotBlank String username, @NotBlank String password, @NotBlank String name)
    implements IUserDTO {}
