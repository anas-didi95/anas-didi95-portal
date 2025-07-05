/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.error;

import com.anasdidi.portal.common.enums.ErrorEnum;
import java.util.Arrays;
import java.util.Map;

public final class E99UnexpectedError extends BaseError {

  public E99UnexpectedError(Map<String, Object> paramMap) {
    super(
        ErrorEnum.E99_UNEXPECTED_ERR,
        Arrays.asList(parseParamMap(paramMap)).toArray(String[]::new));
  }
}
