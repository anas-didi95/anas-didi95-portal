/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.sse.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record SseDTO(String message) {}
