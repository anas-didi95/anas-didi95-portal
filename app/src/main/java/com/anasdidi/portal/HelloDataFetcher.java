/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import jakarta.inject.Singleton;

@Singleton
public class HelloDataFetcher implements DataFetcher<String> {

  @Override
  public String get(DataFetchingEnvironment env) {
    String name = env.getArgument("name");
    if (name == null || name.trim().isEmpty()) {
      name = "World";
    }
    return String.format("Hello %s!", name);
  }
}
