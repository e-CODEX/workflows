# ecodex-workflows

This repository contains reusable workflows for the e-Codex project.

## SonarCloud Java Analysis

This workflow runs a SonarCloud analysis on a Java project. It requires the following inputs:

### Usage

```yaml
on:
  push:
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonar:
    uses: e-CODEX/workflows/.github/workflows/sonar-java.yaml@main
    with:
        jacoco-xml-report-path: 'target/site/jacoco/jacoco.xml'
        java-version: 21
        build-tool: 'maven'
    secrets: inherit
```

| Name                     | Description                                                     | Required | Default |
| ------------------------ | --------------------------------------------------------------- | -------- | ------- |
| `jacoco-xml-report-path` | Path to the coverage report generated by JaCoCo                 | No       | -       |
| `java-version`           | Java version to use for the analysis. Must be 17 or higher      | Yes      | 21      |
| `build-tool`             | Build tool to use for the analysis. Must be 'maven' or 'gradle' | Yes      | 'maven' |

> [!IMPORTANT]
> Building with Gradle requires the use of the Gradle wrapper.

> [!TIP]
>  Using jacoco-xml-report-path with multi module can be problematic.


It also requires the following secret:

| Name          | Description      | Required |
| ------------- | ---------------- | -------- |
| `SONAR_TOKEN` | SonarCloud token | Yes      |

## Commitlint Conventional Commit Check

This workflow checks if the commit messages follow the Conventional Commit format. It does not require any inputs.

### Usage

```yaml
on:
  push:
  pull_request:
    types: [opened, synchronize]
jobs:
  commitlint:
    uses: e-CODEX/workflows/.github/workflows/commitlint.yaml@main
```

## Java CI with Maven

This workflow tests a Java project using Maven on multiple operating systems, and creates and publishes a Software Bill of Materials (SBOM) file.
It assumes that the `verify` goal runs the tests, and the `package` goal creates the artifacts as well as a sbom file. 

### Usage

```yaml
on:
  push:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  CI:
    uses: e-CODEX/workflows/.github/workflows/maven-ci.yaml@main
    with:
      java-version: 21
      maven-parameters: '-Djacoco.skip=true'
      sbom-path: 'target/bom.xml'
      artifact-path: 'target/*.jar'
              
```

It requires the following inputs:

| Name               | Description                                                      | Required | Default |
| ------------------ | ---------------------------------------------------------------- | -------- | ------- |
| `java-version`     | Java version to use for the build. Tests are run on LTS versions | Yes      | 21      |
| `maven-parameters` | Extra parameters to pass to Maven                                | No       | -       |
| `sbom-path`        | Path to the SBOM file generated by the build                     | Yes      | -       |
| `artifact-path`    | Path to the artifact generated by the build                      | Yes      | -       |

## Maven Snapshot Publish to Repository

This workflow publishes a Maven snapshot to a JFROG Maven repository. It assumes that the `deploy` goal is configured to deploy the artifacts to a repository.
It also assumes that the repository URL is configured in the `pom.xml` file, also that the server id is the same as the one supplied in the `maven-repo-id` input.

### Usage

```yaml
on:
  push:
    branches:
      - main
jobs:
  publish:
    uses: e-CODEX/workflows/.github/workflows/maven-snapshot-publish.yaml@main
    with:
      java-version: 21
      maven-parameters: '-DrepositoryId=artifactory'
      maven-repo-id: 'artifactory'
```

It requires the following inputs:

| Name               | Description                        | Required | Default |
| ------------------ | ---------------------------------- | -------- | ------- |
| `java-version`     | Java version to use for the build. | Yes      | 21      |
| `maven-parameters` | Extra parameters to pass to Maven  | No       | -       |
| `maven-repo-id`    | Maven repository ID                | Yes      | -       |


## CodeQL Java Analysis

This workflow runs a CodeQL analysis on a Java project. It requires the following inputs:

### Usage

```yaml
on:
  push:
    branches:
      - develop
    pull_request:
      branches:
        - develop  
    schedule:
    - cron: '36 15 * * 1'    

jobs:
  codeql:
    uses: e-CODEX/workflows/.github/workflows/codeql-java.yaml@main
    with:
      java-version: 21
      build-tool: 'maven'
```

It requires the following inputs:

| Name               | Description                                                      | Required | Default |
| ------------------ | ---------------------------------------------------------------- | -------- | ------- |
| `java-version`     | Java version to use for the analysis. Must be 17 or higher       | Yes      | 21      |
| `build-tool`       | Build tool to use for the analysis. Must be 'maven' or 'gradle'  | Yes      | 'maven' |

> [!IMPORTANT]
> Building with Gradle requires the use of the Gradle wrapper.

## Checkstyle Java Linting

This workflow runs the Checkstyle linter with our [custom configuration](checkstyle.xml) based on the Google one. You can set up your IDE to track this config file with the URL: `https://raw.githubusercontent.com/e-CODEX/workflows/main/checkstyle.xml`

### Usage
```yaml
on: 
  push:
  pull_request:
  merge_group:
name: Java code Checkstyle
jobs:
  checkstyle:
    uses: e-CODEX/workflows/.github/workflows/java-linting.yaml@main
```


