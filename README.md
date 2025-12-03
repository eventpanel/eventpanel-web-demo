# EventPanel Web Demo

A demonstration NestJS app showcasing EventPanel CLI integration for type-safe analytics event code generation.

## Overview

This demo app demonstrates how to integrate EventPanel CLI into a web project to generate type-safe analytics events from YAML configuration files.

## Features

- 🎯 **Type-Safe Analytics**: Generated analytics events with compile-time safety
- 📝 **YAML Configuration**: Event definitions managed through `EventPanel.yaml`
- 🔄 **Code Generation**: Automated TypeScript code generation from event schemas

## Project Structure

```
src/
├── analytics/
│   └── events.ts                # Generated event code
├── app.controller.ts            # HTTP controller
├── app.service.ts               # Service with analytics integration
├── app.module.ts                # Root NestJS module
└── main.ts                      # App entry point
```

## Generated Analytics Events

The app includes example analytics events:

- **Dialog Screen Events**: `dialogScreenTestOptionTapped()` — User selected an answer option in a test question

## Usage

### Setup

1. **Install EventPanel CLI**:
   ```bash
   brew tap eventpanel/eventpanel
   brew install eventpanel
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Generate Analytics Code**:
   ```bash
   eventpanel generate
   ```

4. **Run the App**:
   ```bash
   yarn start:dev
   ```

### Configuration

The app uses `EventPanel.yaml` to define analytics events:

```yaml
workspaceId: 9e7122fa-97d4-42b9-8171-c37991eb97b4
source: web
plugin:
  typescriptgen:
    outputFilePath: src/analytics/events.ts
    namespace: AnalyticsEvents
    shouldGenerateType: true
    eventClassName: AnalyticsEvent
    documentation: true
events:
  - id: F53ZoV4lBswnVy_wWj8kU
    version: 2
```

## Example Usage

```typescript
import { AnalyticsEvents } from './analytics/events';

// Track a dialog screen test option tap
const event = AnalyticsEvents.dialogScreenTestOptionTapped();
analytics.track(event);

// Event structure
// {
//   name: 'Dialog Screen Test Option Tapped',
//   parameters: {}
// }
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `yarn start` | Start the application |
| `yarn start:dev` | Start with hot reload |
| `yarn build` | Build for production |
| `yarn test` | Run unit tests |
| `yarn lint` | Lint and fix code |

## Learn More

- 🚀 [EventPanel CLI](https://github.com/eventpanel/eventpanel-cli)
- 🌐 [EventPanel Website](https://eventpanel.net)

