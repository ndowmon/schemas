# schemas

This repository is responsible for publishing a public schema that can use used 
as JSON schema validation in `integrationDefinition.json` files.

## Prerequisites

Please install the [Typescript JSON schema generator](https://marketplace.visualstudio.com/items?itemName=marcoq.vscode-typescript-to-json-schema) 
extension for VSCode.

## Generating the `integrationDefinition.json` schema

1. Navigate into the `integrationDefinition.d.ts` file
2. Execute the `Generate JSON schema for type...` command from the extension above
3. Select `IntegrationDefinition`

The program should have produced a new `Untitled-1` JSON file in your editor. Copy the file to `integrationDefinition.json` and push to main.

The raw schema is available at https://raw.githubusercontent.com/ndowmon/schemas/main/integrationDefinition.json

