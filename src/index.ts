import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import cli from 'cli-ux'
import clipboardy from 'clipboardy'
import camelCase from 'lodash.camelcase'
import Colors from './colors'

type Palette = {
  colors: {
    [name: string]: {
      [key: number]: string;
    };
  };
};

class Twcolorgen extends Command {
  static description = 'Generate Tailwind Css color shades'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'N', description: 'name of color'}),
    levels: flags.string({
      char: 'L',
      description: 'the levels to generate shades for',
      multiple: true,
      default: [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
      ]}),
    copy: flags.boolean({char: 'C', description: 'copy to clipboard'}),
  }

  static args = [{name: 'color'}]

  async run() {
    const {args, flags} = this.parse(Twcolorgen)
    let color = `#${args.color}`.toLowerCase().replace('##', '#')
    let format: string

    switch (args.color.substring(0, 3)) {
    case 'rgb':
      format = 'rgb'
      color = args.color
      break
    case 'hsl':
      format = 'hsl'
      color = args.color
      break
    default:
      format = 'hex'
    }

    const colors = new Colors(color, format)

    const name = flags.name ? camelCase(flags.name) : camelCase(colors.getColorName())

    const response: Palette = {
      colors: {
        [name]: {
          500: color,
        },
      },
    }

    const intensityMap: {
      [key: number]: number;
    } = {
      50: 0.95,
      100: 0.9,
      200: 0.75,
      300: 0.6,
      400: 0.3,
      600: 0.9,
      700: 0.75,
      800: 0.6,
      900: 0.49,
    }

    const levels = flags.levels.map((level: string) => parseInt(level, 10))
    const lightLevels = levels.filter((level: number) => level <= 400)
    const darkLevels = levels.filter((level: number) => level >= 600)

    lightLevels.forEach(level => {
      response.colors[name][level] = colors.lighten(intensityMap[level])
    })

    darkLevels.forEach(level => {
      response.colors[name][level] = colors.darken(intensityMap[level])
    })

    const shadeArray: Array<any> = []
    Object.entries(response.colors[name]).forEach(([key, value]) => {
      const obj = {
        level: key,
        value: value,
        example: colors.colorize(value),
      }

      shadeArray.push(obj)
    })

    cli.table(shadeArray, {
      level: {
        minWidth: 7,
      },
      value: {
        minWidth: 10,
      },
      example: {
        minWidth: 7,
      },
    })

    if (flags.copy) {
      let levels = ''
      Object.entries(response.colors[name]).forEach(([key, value]) => {
        levels += `  ${key}: '${value}',\n`
      })

      await clipboardy.write(`${name}: {\n${levels.slice(0, -1)}\n}`)

      this.log(chalk.green('\n\nCopied color shade palette to clipboard!'))
    }
  }
}

export = Twcolorgen
