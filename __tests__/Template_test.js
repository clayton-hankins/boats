import Template from '../es6/Template'
const string1 = `
Weather: mixin('some/path', 321)

Weathers: mixin('some/pther/path', 654654)
`

const string2 = `
Weather: 
  object: mixin('some/path', 321)

Weathers: 
  object: mixin('some/other/path', 654654)
`
describe('setMixinPositions', () => {
  it('match simple mixin', () => {
    const response = JSON.stringify(Template.setMixinPositions(string1, 2))
    expect(response).toBe(JSON.stringify([
      { index: 33,
        match: "mixin('some/path', 321)",
        mixinLinePadding: '  ' },
      { index: 77,
        match: "mixin('some/pther/path', 654654)",
        mixinLinePadding: '  '
      }
    ]))
  })

  it('match nested mixin', () => {
    const response = JSON.stringify(Template.setMixinPositions(string2, 2))
    expect(response).toBe(JSON.stringify([
      { index: 44,
        match: "mixin('some/path', 321)",
        mixinLinePadding: '  ' },
      { index: 99,
        match: "mixin('some/other/path', 654654)",
        mixinLinePadding: '  ' } ]
    ))
  })
})

describe('getHelperFunctionNameFromPath', () => {
  it('should return untouched a valid string', () => {
    expect(Template.getHelperFunctionNameFromPath('/some/path/helpers/myCoolHelper.js'))
      .toBe('myCoolHelper')
  })

  it('should strip out non (alpha numeric _ )chars', () => {
    expect(Template.getHelperFunctionNameFromPath('/some/path/helpers/my-Cool$Helper!_.js'))
      .toBe('myCoolHelper_')
  })
})
