plugins {
  id("io.micronaut.application") version "4.5.3"
  id("com.gradleup.shadow") version "8.3.6"
  id("io.micronaut.aot") version "4.5.3"
  id("com.diffplug.spotless") version "7.0.2"
}

version = "0.1"

group = "com.anasdidi.portal"

repositories { mavenCentral() }

dependencies {
  annotationProcessor("io.micronaut:micronaut-http-validation")
  annotationProcessor("io.micronaut.security:micronaut-security-annotations")
  annotationProcessor("io.micronaut.serde:micronaut-serde-processor")
  implementation("io.micrometer:context-propagation")
  implementation("io.micronaut.reactor:micronaut-reactor")
  implementation("io.micronaut.security:micronaut-security-session")
  implementation("io.micronaut.serde:micronaut-serde-jackson")
  compileOnly("io.micronaut:micronaut-http-client")
  runtimeOnly("ch.qos.logback:logback-classic")
  runtimeOnly("org.yaml:snakeyaml")
  testImplementation("io.micronaut:micronaut-http-client")
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
