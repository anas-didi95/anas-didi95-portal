plugins {
  id("io.micronaut.application") version "4.5.3"
  id("com.gradleup.shadow") version "8.3.6"
  id("io.micronaut.aot") version "4.5.3"
  id("com.diffplug.spotless") version "7.0.2"
}

version = "v0.2.0"

group = "com.anasdidi.portal"

repositories { mavenCentral() }

dependencies {
  annotationProcessor("io.micronaut.data:micronaut-data-processor")
  annotationProcessor("io.micronaut:micronaut-http-validation")
  annotationProcessor("io.micronaut.security:micronaut-security-annotations")
  annotationProcessor("io.micronaut.serde:micronaut-serde-processor")
  annotationProcessor("io.micronaut.validation:micronaut-validation-processor")
  implementation("io.micrometer:context-propagation")
  implementation("io.micronaut.data:micronaut-data-hibernate-jpa")
  implementation("io.micronaut.graphql:micronaut-graphql")
  implementation("io.micronaut.liquibase:micronaut-liquibase")
  implementation("io.micronaut.reactor:micronaut-reactor")
  implementation("io.micronaut.security:micronaut-security")
  implementation("io.micronaut.security:micronaut-security-jwt")
  implementation("io.micronaut.serde:micronaut-serde-jackson")
  implementation("io.micronaut.sql:micronaut-jdbc-hikari")
  implementation("io.micronaut.validation:micronaut-validation")
  implementation("jakarta.validation:jakarta.validation-api")
  implementation("org.slf4j:jul-to-slf4j")
  implementation("org.springframework.security:spring-security-crypto:6.3.4")
  implementation("org.slf4j:jcl-over-slf4j")
  implementation("ch.qos.logback:logback-classic")
  compileOnly("io.micronaut:micronaut-http-client")
  runtimeOnly("com.h2database:h2")
  runtimeOnly("org.yaml:snakeyaml")
  testImplementation("io.micronaut:micronaut-http-client")
  aotPlugins(platform("io.micronaut.platform:micronaut-platform:4.9.0"))
  aotPlugins("io.micronaut.security:micronaut-security-aot")
}

application { mainClass = "com.anasdidi.portal.Application" }

java {
  sourceCompatibility = JavaVersion.toVersion("21")
  targetCompatibility = JavaVersion.toVersion("21")
}

graalvmNative.toolchainDetection = false

micronaut {
  runtime("netty")
  testRuntime("junit5")
  processing {
    incremental(true)
    annotations("com.anasdidi.portal.*")
  }
  aot {
    // Please review carefully the optimizations enabled below
    // Check https://micronaut-projects.github.io/micronaut-aot/latest/guide/ for more details
    optimizeServiceLoading = false
    convertYamlToJava = false
    precomputeOperations = true
    cacheEnvironment = true
    optimizeClassLoading = true
    deduceEnvironment = true
    optimizeNetty = true
    replaceLogbackXml = true
    configurationProperties.put("micronaut.security.jwks.enabled", "false")
  }
}

tasks.named<io.micronaut.gradle.docker.NativeImageDockerfile>("dockerfileNative") {
  jdkVersion = "21"
}

configure<com.diffplug.gradle.spotless.SpotlessExtension> {
  format("misc") {
    target(".gitattributes", ".gitignore")
    trimTrailingWhitespace()
    leadingTabsToSpaces(2)
    endWithNewline()
  }
  java {
    importOrder()
    removeUnusedImports()
    cleanthat()
    googleJavaFormat()
    formatAnnotations()
    licenseHeader("/* (C) Anas Juwaidi Bin Mohd Jeffry. All rights reserved. */")
  }
  // groovyGradle {
  //  target("*.gradle") // default target of groovyGradle
  //  greclipse()
  // }
  kotlinGradle {
    target("*.gradle.kts") // default target for kotlinGradle
    ktfmt()
    // ktlint() // or ktfmt() or prettier()
  }
}
