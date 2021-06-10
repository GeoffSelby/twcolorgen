import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('twcolorgen', () => {
  test
  .stdout()
  .do(() => cmd.run(['#3b82f6', '--name', 'blue']))
  .it('generates a color shade palette using hex', ctx => {
    expect(ctx.stdout).to.contain('Level  Value     Example \n50     #f5f9ff           \n100    #ebf3fe           \n200    #cee0fd           \n300    #b1cdfb           \n400    #76a8f9           \n500    #3b82f6           \n600    #3575dd           \n700    #2c62b9           \n800    #234e94           \n900    #1d4079           \n')
  })

  test
  .stdout()
  .do(() => cmd.run(['rgb(59, 130, 246)', '--name', 'blue']))
  .it('generates a color shade palette using rgb', ctx => {
    expect(ctx.stdout).to.contain('Level  Value              Example \n50     rgb(245, 249, 255)         \n100    rgb(235, 243, 254)         \n200    rgb(206, 224, 253)         \n300    rgb(177, 205, 251)         \n400    rgb(118, 168, 249)         \n500    rgb(59, 130, 246)          \n600    rgb(53, 117, 221)          \n700    rgb(44, 98, 185)           \n800    rgb(35, 78, 148)           \n900    rgb(29, 64, 121)           \n')
  })

  test
  .stdout()
  .do(() => cmd.run(['hsl(217, 91%, 60%)', '--name', 'blue']))
  .it('generates a color shade palette using hsl', ctx => {
    expect(ctx.stdout).to.contain('Level  Value               Example \n50     hsl(216, 100%, 98%)         \n100    hsl(217, 90%, 96%)          \n200    hsl(217, 92%, 90%)          \n300    hsl(217, 90%, 84%)          \n400    hsl(217, 92%, 72%)          \n500    hsl(217, 91%, 60%)          \n600    hsl(217, 71%, 54%)          \n700    hsl(217, 61%, 45%)          \n800    hsl(217, 61%, 36%)          \n900    hsl(217, 61%, 29%)          \n')
  })

  test
  .stdout()
  .do(() => cmd.run(['#3b82f6', '--name', 'blue', '--levels', '100', '200', '300', '400', '500']))
  .it('only generates levels 100 - 500', ctx => {
    expect(ctx.stdout).to.contain('Level  Value     Example \n100    #ebf3fe           \n200    #cee0fd           \n300    #b1cdfb           \n400    #76a8f9           \n500    #3b82f6           \n')
  })
})
