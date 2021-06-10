# Tailwind Color Shades Generator

Generate Tailwind Css color shades in the blink of an eye right in your terminal.

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/GeoffSelby/twcolorgen/tests/main?logo=github&style=for-the-badge)](https://github.com/GeoffSelby/twcolorgen)
[![Version](https://img.shields.io/npm/v/twcolorgen.svg?style=for-the-badge)](https://npmjs.org/package/twcolorgen)
[![License](https://img.shields.io/npm/l/twcolorgen.svg?style=for-the-badge)](https://github.com/GeoffSelby/twcolorgen/blob/master/package.json)

<!-- toc -->

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
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

```bash
# Using HEX format
twcolorgen 3b82f6 --name blue

# Using HSL format
twcolorgen "hsl(217, 91%, 60%)" --name blue

# Using RGB format
twcolorgen "rgb(59, 130, 246)" --name blue

# Using specific levels
twcolorgen 3b82f6 --name blue --levels 200 300 400 700 800
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

[MIT](https://choosealicense.com/licenses/mit/)
