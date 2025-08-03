/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common;

import java.util.List;

public record SearchDTO<T>(List<T> resultList, Pagination pagination) {

  public static record Pagination(int pageNo, long totalRecords, int totalRecordsPerPage) {}
}
