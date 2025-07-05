/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.enums;

public enum ErrorEnum {
  E01_VALIDATION_ERR("E01"),
  E99_UNEXPECTED_ERR("E99");

  public final String code;

  ErrorEnum(String code) {
    this.code = code;
  }
}
