/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */
package com.anasdidi.portal;

import ch.qos.logback.classic.jul.LevelChangePropagator;
import com.anasdidi.portal.common.aspect.MaskingPatternLayout;
import io.micronaut.core.annotation.ReflectionConfig;
import io.micronaut.core.annotation.TypeHint.AccessType;
import io.micronaut.runtime.Micronaut;
import java.util.function.Function;
import liquibase.change.core.RawSQLChange;
import liquibase.parser.SqlParserFactory;
import org.slf4j.bridge.SLF4JBridgeHandler;

@ReflectionConfig(
    type = LevelChangePropagator.class,
    accessType = AccessType.ALL_DECLARED_CONSTRUCTORS)
@ReflectionConfig(
    type = MaskingPatternLayout.class,
    accessType = {AccessType.ALL_DECLARED_CONSTRUCTORS, AccessType.ALL_DECLARED_METHODS})
@ReflectionConfig(type = RawSQLChange.class, accessType = AccessType.ALL_DECLARED_METHODS)
@ReflectionConfig(type = SqlParserFactory.class, accessType = AccessType.ALL_DECLARED_CONSTRUCTORS)
@ReflectionConfig(
    type = Function[].class,
    accessType = {})
public class Application {

  public static void main(String[] args) {
    SLF4JBridgeHandler.removeHandlersForRootLogger();
    SLF4JBridgeHandler.install();
    Micronaut.run(Application.class, args);
  }
}
