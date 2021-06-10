# Tailwind Color Shades Generator

Generate Tailwind Css color shades in the blink of an eye right in your terminal.

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/GeoffSelby/twcolorgen/tests/main?logo=github&style=for-the-badge)](https://github.com/GeoffSelby/twcolorgen)
[![Version](https://img.shields.io/npm/v/twcolorgen.svg?style=for-the-badge)](https://npmjs.org/package/twcolorgen)
[![License](https://img.shields.io/npm/l/twcolorgen.svg?style=for-the-badge)](https://github.com/GeoffSelby/twcolorgen/blob/master/package.json)

<!-- toc -->

- [Tailwind Color Shades Generator](#tailwind-color-shades-generator)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [License](#license)
<!-- tocstop -->

# Features

<!-- features -->

- Generate Tailwind Css color shades from your terminal
- Preview generated shades in your terminal
- Copy generated shade object
- Choose which levels to generate
- Use custom name or let us choose one for you

<!-- featuresstop -->

# Installation

<!-- installation -->

```bash
npm install -g twcolorgen
```

<!-- installationstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g twcolorgen
$ twcolorgen COMMAND
running command...
$ twcolorgen (-v|--version|version)
twcolorgen/1.0.0 darwin-x64 node-v12.19.0
$ twcolorgen --help [COMMAND]
USAGE
  $ twcolorgen COMMAND
...
```

<!-- usagestop -->

# Options

<!-- options -->

The `twcolorgen` command accepts multiple flags. All of the flags are optional.

| Option      | Type      | Description                       |
| :---------- | :-------- | :-------------------------------- |
| `--version` | `boolean` | The CLI version                   |
| `--help`    | `boolean` | Shows CLI help page               |
| `--name`    | `string`  | The name to use for the color     |
| `--levels`  | `string`  | The levels to generate shades for |
| `--copy`    | `boolean` | Copy shade object to clipboard    |

<!-- optionsstop -->

# License

<!-- license -->

[MIT](https://choosealicense.com/licenses/mit/)

<!-- licensestop -->
