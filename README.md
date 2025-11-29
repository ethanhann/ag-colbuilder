# AG Grid Column Builder

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://www.typescriptlang.org/)
![AG Grid Version](https://img.shields.io/badge/AG%20Grid-34%2B-brightgreen)

A small, strongly typed, fluent API for building AG Grid column definitions with much less verbosity than standard AG Grid configuration objects.

This library is designed for developers who want:

- Smaller and cleaner column definitions
- Strong TypeScript checking based on row data interfaces
- Consistent defaults for text, number, and date columns
- Global configuration that applies to all columns
- A reusable, testable, composable abstraction for column definitions

This package supports `AG Grid 34` and later, including strict typing for field like properties such as `field` and `tooltipField`.

## Features

- Fluent builder API for column definitions
- Type checked by row interface
- Built-in presets for text, number, and date columns
- Global defaults via `setGlobalDefaults`
- Automatic header name humanization
- Custom column overrides with `.custom()`
- Runtime field normalization to satisfy strict AG Grid typing
- Zero runtime dependencies

## Installation

Using bun:

```sh
bun add ag-colbuilder
```

Using npm:

```sh
npm install ag-colbuilder
```

Using yarn:

```sh
yarn add ag-colbuilder
```

## Getting Started

### Define your row type

```ts
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}
```

### Build columns

```ts
import { col } from "ag-colbuilder";

const columns = col<User>()
  .text("name")
  .text("email", { width: 250 })
  .date("created_at")
  .build();
```

The result is a fully typed `ColDef<User>[]` array that you can pass directly to AG Grid.

```tsx
import { AgGridReact } from "ag-grid-react";

<AgGridReact<User> rowData={rows} columnDefs={columns} />;
```

## Presets

The builder includes three built in presets that apply sensible AG Grid defaults.

### `.text(field, options?)`

Applies:

- `sortable: true`
- `filter: "agTextColumnFilter"`
- `resizable: true`

Example:

```ts
const columns = col<User>()
  .text("name")
  .text("email", { width: 400 })
  .build();
```

### `.number(field, options?)`

Applies:

- `type: "numericColumn"`
- `filter: "agNumberColumnFilter"`
- `sortable: true`
- `resizable: true`

Example:

```ts
const columns = col<User>()
  .number("id", { width: 120 })
  .build();
```

### `.date(field, options?)`

Applies:

- `filter: "agDateColumnFilter"`
- `sortable: true`
- `resizable: true`

Example:

```ts
const columns = col<User>()
  .date("created_at")
  .build();
```

You can override any AG Grid column property through the `options` object.

## Custom Columns

You can inject a custom AG Grid column definition when presets are not enough.

```ts
const columns = col<User>()
  .custom({
    field: "name",
    headerName: "User Name",
    valueGetter: params => params.data.name.toUpperCase(),
  })
  .build();
```

The library uses a loose input type internally and normalizes field like properties so it still plays nicely with strict AG Grid 34 typing.

## Global Defaults

You can define global defaults that apply to every column built by this library.

```ts
import { setGlobalDefaults } from "ag-colbuilder";

setGlobalDefaults({
  sortable: true,
  resizable: true,
  suppressMovable: false,
});
```

Any column created with `col<T>()` will automatically include these settings unless they are overridden per column.

Example:

```ts
setGlobalDefaults({ sortable: true });

const columns = col<User>()
  .text("name")
  .build();

// columns[0].sortable will be true
```

## Type Safety

The builder is fully typed against your row interface.

If you reference a property that does not exist on the row type, TypeScript will fail at compile time.

```ts
interface User {
  id: number;
  name: string;
}

// This line will cause a TypeScript error
col<User>().text("email");
```

## Testing

The library is tested with Vitest using the Arrange, Act, Assert pattern.

You can run tests with:

```sh
bun test
```

or, if you use npm:

```sh
npm test
```

## Usage With React

This library is framework agnostic, but it integrates naturally with `ag-grid-react`.

```tsx
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { col } from "ag-colbuilder";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns = col<User>()
  .text("name")
  .text("email")
  .build();

export function UserGrid({ rows }: { rows: User[] }) {
  return <AgGridReact<User> rowData={rows} columnDefs={columns} />;
}
```

## Roadmap

Planned enhancements include:

- Additional presets for enum, currency, and status columns
- Column group builder support
- Utilities for React cell renderers
- Optional support for nested field paths such as `"address.city"`

## Contributing

Contributions are welcome.

If you add a new preset, please include:

- Runtime tests
- Type level tests
- Documentation updates

## License

MIT License

Copyright (c) 2025 Ethan Hann

See the LICENSE file for details.
