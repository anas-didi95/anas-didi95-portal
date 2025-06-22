/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.error;

import com.anasdidi.portal.common.enums.ErrorEnum;
import java.util.Map;

public final class UnexpectedError extends BaseError {

  public UnexpectedError(Map<String, Object> paramMap) {
    super(ErrorEnum.E99_UNEXPECTED, parseParamMap(paramMap));
  }
}
