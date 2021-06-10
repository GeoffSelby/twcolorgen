import colorNamer from 'color-namer'
import chalk from 'chalk'

type Rgb = {
  r: number;
  g: number;
  b: number;
};

class Colors {
  private color: string

  private format: string

  constructor(
    color: string,
    format: string
  ) {
    this.color = color
    this.format = format
  }

  colorize(color: string) {
    if (this.format === 'hex') {
      return chalk.bgHex(color)('       ')
    }

    if (this.format === 'rgb') {
      const [r, g, b] = color.match(/\d+/g)!.map(Number)
      return chalk.bgRgb(r, g, b)('       ')
    }

    if (this.format === 'hsl') {
      const rgb = this.hslToRgb()

      return chalk.bgRgb(rgb.r, rgb.g, rgb.b)('       ')
    }
  }

  lighten(intensity: number): string {
    let rgb: Rgb | null = null

    switch (this.format) {
    case 'hex':
      rgb = this.hexToRgb()
      break
    case 'hsl':
      rgb = this.hslToRgb()
      break
    case 'rgb':
      rgb = this.parseRgbString()
      break
    }

    if (!rgb) {
      return ''
    }

    const r = Math.round(rgb.r + ((255 - rgb.r) * intensity))
    const g = Math.round(rgb.g + ((255 - rgb.g) * intensity))
    const b = Math.round(rgb.b + ((255 - rgb.b) * intensity))

    return this.formatOutput([r, g, b])
  }

  darken(intensity: number): string {
    let rgb: Rgb | null = null

    switch (this.format) {
    case 'hex':
      rgb = this.hexToRgb()
      break
    case 'hsl':
      rgb = this.hslToRgb()
      break
    case 'rgb':
      rgb = this.parseRgbString()
      break
    }

    if (!rgb) {
      return ''
    }

    const r = Math.round(rgb.r * intensity)
    const g = Math.round(rgb.g * intensity)
    const b = Math.round(rgb.b * intensity)

    return this.formatOutput([r, g, b])
  }

  getColorName(): string {
    const {name} = colorNamer(`#${this.color}`.replace('##', '#')).ntc[0]
    const sanitizedName = name.replace(/['/]/gi, '').replace(/\s+/g, '-').toLowerCase()

    return sanitizedName
  }

  hexToRgb(): Rgb | null {
    const sanitizedHex = this.color.replace(/##/g, '#')
    const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      sanitizedHex
    )

    if (!colorParts) {
      return null
    }

    const [, r, g, b] = colorParts

    return {
      r: parseInt(r, 16),
      g: parseInt(g, 16),
      b: parseInt(b, 16),
    } as Rgb
  }

  rgbToHex(r: number, g: number, b: number): string {
    const toHex = (c: number) => `0${c.toString(16)}`.slice(-2)
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  hslToRgb(): Rgb {
    const sep = this.color.indexOf(',') > -1 ? ',' : ' '
    const hsl: Array<any> = this.color.substr(4).split(')')[0].split(sep)

    let h = hsl[0]
    const s = hsl[1].substr(0, hsl[1].length - 1) / 100
    const l = hsl[2].substr(0, hsl[2].length - 1) / 100

    if (h.indexOf('deg') > -1) {
      h = h.substr(0, h.length - 3)
    } else if (h.indexOf('rad') > -1) {
      h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI))
    } else if (h.indexOf('turn') > -1) {
      h = Math.round(h.substr(0, h.length - 4) * 360)
    }

    if (h >= 360) {
      h %= 360
    }

    const c = (1 - Math.abs((2 * l) - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - (c / 2)
    let r = 0
    let g = 0
    let b = 0
    if (h >= 0 && h < 60) {
      r = c
      g = x
      b = 0
    } else if (h >= 60 && h < 120) {
      r = x
      g = c
      b = 0
    } else if (h >= 120 && h < 180) {
      r = 0
      g = c
      b = x
    } else if (h >= 180 && h < 240) {
      r = 0
      g = x
      b = c
    } else if (h >= 240 && h < 300) {
      r = x
      g = 0
      b = c
    } else if (h >= 300 && h < 360) {
      r = c
      g = 0
      b = x
    }
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return {
      r,
      g,
      b,
    } as Rgb
  }

  rgbToHsl(r: number, g: number, b: number) {
    r /= 255
    g /= 255
    b /= 255

    const cmin = Math.min(r, g, b)
    const cmax = Math.max(r, g, b)
    const delta = cmax - cmin
    let h = 0
    let s = 0
    let l = 0

    if (delta === 0) {
      h = 0
    } else if (cmax === r) {
      h = ((g - b) / delta) % 6
    } else if (cmax === g) {
      h = ((b - r) / delta) + 2
    } else {
      h = ((r - g) / delta) + 4
    }

    h = Math.round(h * 60)

    if (h < 0) {
      h += 360
    }

    l = (cmax + cmin) / 2

    s = delta === 0 ? 0 : delta / (1 - Math.abs((2 * l) - 1))

    s = Number((s * 100).toFixed(0))
    l = Number((l * 100).toFixed(0))

    return `hsl(${h}, ${s}%, ${l}%)`
  }

  formatOutput(rgb: Array<number>): string {
    const [r, g, b] = rgb
    let output = ''

    switch (this.format) {
    case 'hex':
      output = this.rgbToHex(r, g, b)
      break
    case 'hsl':
      output = this.rgbToHsl(r, g, b)
      break
    case 'rgb':
      output = `rgb(${r}, ${g}, ${b})`
      break
    }

    return output
  }

  parseRgbString(): Rgb {
    const [r, g, b] = this.color.match(/\d+/g)!.map(Number)

    return {
      r,
      g,
      b,
    } as Rgb
  }
}

export = Colors
