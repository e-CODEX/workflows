# ecodex-workflows

This repository contains reusable workflows for the e-Codex project.

## SonarCloud Java Analysis

This workflow runs a SonarCloud analysis on a Java project. It requires the following inputs:

### Usage

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonar:
    uses: eu-LISA/ecodex-workflows/.github/workflows/sonar-java.yaml
    with:
        jacoco-xml-report-path: 'target/site/jacoco/jacoco.xml'
        java-version: '17'
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
    uses: eu-LISA/ecodex-workflows/.github/workflows/commitlint.yaml
```

