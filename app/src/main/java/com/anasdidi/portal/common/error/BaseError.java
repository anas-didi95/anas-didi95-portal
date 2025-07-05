/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.error;

import com.anasdidi.portal.common.enums.ErrorEnum;
import java.util.HashMap;
import java.util.Map;

public abstract class BaseError extends RuntimeException {

  public final ErrorEnum error;
  public final String[] variables;

  BaseError(ErrorEnum error, String[] variables) {
    super(error.code);
    this.error = error;
    this.variables = variables;
  }

  protected static String parseParamMap(Map<String, Object> paramMap) {
    return String.join(
        ",",
        paramMap.entrySet().stream()
            .map(param -> "%s=%s".formatted(param.getKey(), param.getValue()))
            .toList());
  }

  protected static String parseParamMap(String[] fields, Object[] values) {
    Map<String, Object> paramMap = new HashMap<>();
    for (int i = 0; i < fields.length; i++) {
      paramMap.put(fields[i] + "Matched", values[i]);
    }
    return parseParamMap(paramMap);
  }
}
