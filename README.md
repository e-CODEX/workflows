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
    uses: eu-LISA/ecodex-workflows/.github/workflows/sonar-java.yaml@main
    with:
        jacoco-xml-report-path: 'target/site/jacoco/jacoco.xml'
        java-version: 17
        build-tool: 'maven'
    secrets: inherit
```

| Name                     | Description                                                     | Required | Default |
| ------------------------ | --------------------------------------------------------------- | -------- | ------- |
| `jacoco-xml-report-path` | Path to the coverage report generated by JaCoCo                 | Yes      | -       |
| `java-version`           | Java version to use for the analysis. Must be 17 or higher      | Yes      | 21      |
| `build-tool`             | Build tool to use for the analysis. Must be 'maven' or 'gradle' | Yes      | 'maven' |

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
    uses: eu-LISA/ecodex-workflows/.github/workflows/commitlint.yaml@main
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
    uses: eu-LISA/ecodex-workflows/.github/workflows/maven-ci.yaml@main
    with:
      java-version: 17
      maven-parameters: '-Djacoco.skip=true'
      sbom-path: 'target/bom.xml'
      artifact-path: 'target/*.jar'
              
```

It requires the following inputs:

| Name               | Description                                                      | Required | Default |
| ------------------ | ---------------------------------------------------------------- | -------- | ------- |
| `java-version`     | Java version to use for the build. Tests are run on LTS versions | Yes      | 17      |
| `maven-parameters` | Extra parameters to pass to Maven                                | No       | -       |
| `sbom-path`        | Path to the SBOM file generated by the build                     | Yes      | -       |
| `artifact-path`    | Path to the artifact generated by the build                      | Yes      | -       |

## Maven Snapshot Publish to Repository

This workflow publishes a Maven snapshot to a Maven repository. It assumes that the `deploy` goal is configured to deploy the artifacts to a repository.
It also assumes that the repository URL is configured in the `pom.xml` file, also that the server id is the same as the one supplied in the `maven-repo-id` input.

### Usage

```yaml
on:
  push:
    branches:
      - main
jobs:
  publish:
    uses: eu-LISA/ecodex-workflows/.github/workflows/maven-publish-snapshot.yaml@main
    with:
      java-version: 17
      maven-parameters: '-DrepositoryId=artifactory'
      maven-repo-id: 'artifactory'
    secrets:
      MAVEN_NAME: ${{ secrets.MAVEN_NAME }}
      MAVEN_SECRET: ${{ secrets.MAVEN_SECRET }}
```

It requires the following inputs:

| Name               | Description                        | Required | Default |
| ------------------ | ---------------------------------- | -------- | ------- |
| `java-version`     | Java version to use for the build. | Yes      | 17      |
| `maven-parameters` | Extra parameters to pass to Maven  | No       | -       |
| `maven-repo-id`    | Maven repository ID                | Yes      | -       |

It also requires the following secrets:

| Name           | Description               | Required |
| -------------- | ------------------------- | -------- |
| `MAVEN_NAME`   | Maven repository username | Yes      |
| `MAVEN_SECRET` | Maven repository password | Yes      |



