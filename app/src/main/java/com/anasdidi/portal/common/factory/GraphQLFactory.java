/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal.common.factory;

import com.anasdidi.portal.HelloDataFetcher;
import com.anasdidi.portal.module.user.UserFetcher;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import io.micronaut.context.annotation.Factory;
import io.micronaut.core.io.ResourceResolver;
import jakarta.inject.Singleton;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Factory
public class GraphQLFactory {

  private final UserFetcher userFetcher;

  GraphQLFactory(UserFetcher userFetcher) {
    this.userFetcher = userFetcher;
  }

  @Singleton
  GraphQL graphQL(ResourceResolver resourceResolver, HelloDataFetcher helloDataFetcher) {
    SchemaParser schemaParser = new SchemaParser();
    SchemaGenerator schemaGenerator = new SchemaGenerator();

    TypeDefinitionRegistry typeRegistry = new TypeDefinitionRegistry();
    typeRegistry.merge(
        schemaParser.parse(
            new BufferedReader(
                new InputStreamReader(
                    resourceResolver.getResourceAsStream("classpath:schema.graphqls").get()))));

    RuntimeWiring runtimeWiring =
        RuntimeWiring.newRuntimeWiring()
            .type(
                "Query",
                typeWiring ->
                    typeWiring
                        .dataFetcher("hello", helloDataFetcher)
                        .dataFetcher("users", userFetcher.getUserList())
                        .dataFetcher("user", userFetcher.getUser()))
            .build();

    GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);

    return GraphQL.newGraphQL(graphQLSchema).build();
  }
}
