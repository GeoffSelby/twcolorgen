import {expect, test} from '@oclif/test'

import Colors from '../src/colors'

describe('Colors class', () => {
  test.it('converts hex to rgb', () => {
    const colors = new Colors('#ffffff', 'hex', 'hex')

    const rgb = colors.hexToRgb()

    expect(rgb).to.haveOwnProperty('r', 255)
    expect(rgb).to.haveOwnProperty('g', 255)
    expect(rgb).to.haveOwnProperty('b', 255)
  })

  test.it('converts hsl to rgb', () => {
    const colors = new Colors('hsl(0, 0%, 100%)', 'hsl', 'hsl')

    const rgb = colors.hslToRgb('hsl(0, 0%, 100%)')

    expect(rgb).to.haveOwnProperty('r', 255)
    expect(rgb).to.haveOwnProperty('g', 255)
    expect(rgb).to.haveOwnProperty('b', 255)
  })

  test.it('converts rgb to hex', () => {
    const colors = new Colors('rgb(255, 255, 255)', 'rgb', 'rgb')

    const hex = colors.rgbToHex(255, 255, 255)

    expect(hex).to.equal('#ffffff')
  })

  test.it('converts rgb to hsl', () => {
    const colors = new Colors('rgb(255, 255, 255)', 'hsl', 'hsl')

    const hex = colors.rgbToHsl(255, 255, 255)

    expect(hex).to.equal('hsl(0, 0%, 100%)')
  })

  test.it('parses an rgb string', () => {
    const colors = new Colors('rgb(255, 255, 255)', 'rgb', 'rgb')

    const parsed = colors.parseRgbString()

    expect(parsed).to.haveOwnProperty('r', 255)
    expect(parsed).to.haveOwnProperty('g', 255)
    expect(parsed).to.haveOwnProperty('b', 255)
  })

  test.it('formats output as hex', () => {
    const colors = new Colors('#ffffff', 'hex', 'hex')

    const formatted = colors.formatOutput([255, 255, 255])

    expect(formatted).to.equal('#ffffff')
  })

  test.it('formats output as hsl', () => {
    const colors = new Colors('hsl(0, 0%, 100%)', 'hsl', 'hsl')

    const formatted = colors.formatOutput([255, 255, 255])

    expect(formatted).to.equal('hsl(0, 0%, 100%)')
  })

  test.it('formats output as rgb', () => {
    const colors = new Colors('rgb(255, 255, 255)', 'rgb', 'rgb')

    const formatted = colors.formatOutput([255, 255, 255])

    expect(formatted).to.equal('rgb(255, 255, 255)')
  })

  test.it('lightens a hex color when format is hex', () => {
    const colors = new Colors('#3b82f6', 'hex', 'hex')

    const lightened = colors.lighten(0.6)

    expect(lightened).to.equal('#b1cdfb')
  })

  test.it('lightens a hsl color when format is hsl', () => {
    const colors = new Colors('hsl(217, 91%, 60%)', 'hsl', 'hsl')

    const lightened = colors.lighten(0.6)

    expect(lightened).to.equal('hsl(217, 90%, 84%)')
  })

  test.it('lightens a rgb color when format is rgb', () => {
    const colors = new Colors('rgb(59, 130, 246)', 'rgb', 'rgb')

    const lightened = colors.lighten(0.6)

    expect(lightened).to.equal('rgb(177, 205, 251)')
  })

  test.it('darkens a hex color when format is hex', () => {
    const colors = new Colors('#3b82f6', 'hex', 'hex')

    const lightened = colors.darken(0.6)

    expect(lightened).to.equal('#234e94')
  })

  test.it('darkens a hsl color when format is hsl', () => {
    const colors = new Colors('hsl(217, 91%, 60%)', 'hsl', 'hsl')

    const lightened = colors.darken(0.6)

    expect(lightened).to.equal('hsl(217, 61%, 36%)')
  })

  test.it('darkens a rgb color when format is rgb', () => {
    const colors = new Colors('rgb(59, 130, 246)', 'rgb', 'rgb')

    const lightened = colors.darken(0.6)

    expect(lightened).to.equal('rgb(35, 78, 148)')
  })
})
