---
name: e2e-executor
description: Execute end-to-end tests and provide test report.
allowed-tools: Bash(npx:*) Bash(npm:*)
context: fork
model: Haiku
---

## Tasks:
1. execute end-to-end tests using desktop chrome
2. provide test results

**Examples** [examples](./examples.md)
**End-to-end Tests are available at:** /web-profile/app/tests
**Test Run Summary is located at:** /web-profile/app/test-results
**Test Report is available at:** /web-profile/app/playwright-report
**For Debug use skill:** /playwright-cli
