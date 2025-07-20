/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.error;

import com.anasdidi.portal.common.enums.ErrorEnum;
import java.util.Arrays;

public final class E02RecordAlreadyExistsError extends BaseError {

  public E02RecordAlreadyExistsError(String field) {
    super(ErrorEnum.E02_RECORD_ALREADY_EXIST_ERR, Arrays.asList(field).toArray(String[]::new));
  }
}
