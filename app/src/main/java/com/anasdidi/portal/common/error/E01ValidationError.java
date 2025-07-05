/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.error;

import com.anasdidi.portal.common.enums.ErrorEnum;
import java.util.Map;

public final class E01ValidationError extends BaseError {

  public E01ValidationError(Map<String, Object> paramMap) {
    super(ErrorEnum.E01_VALIDATION_ERR, parseParamMap(paramMap));
  }
}
