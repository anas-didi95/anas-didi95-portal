/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.module.user.enums;

import com.anasdidi.portal.module.user.UserConstants;

public enum EventEnum {
  ADD_USER(UserConstants.EVENT_ADD_USER);

  public final String code;

  EventEnum(String code) {
    this.code = code;
  }
}
