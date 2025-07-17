# Install Graphviz Composite Action

This composite action installs the Graphviz command-line tools (including `dot`) on Ubuntu, Windows, and macOS runners.

## Usage

Add to your workflow after setting up Java:

```yaml
- name: Install Graphviz
  uses: e-CODEX/workflows/.github/actions/install-graphviz@main
```

Supported platforms:
- **Ubuntu:** Installed via `apt-get`
- **Windows:** Installed via `choco`
- **macOS:** Installed via `brew`

## Purpose

Ensures `dot` is available for Maven builds that generate documentation with diagrams.

See [Issue #122](https://github.com/e-CODEX/workflows/issues/122).
