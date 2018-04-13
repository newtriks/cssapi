import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
} from '../testHelpers/fixtures/generic'
import configureCssApi from '../../index'

describe(`api()`, () => {
  const breakpointMap = [
    [breakpoint1, `25em`],
    [breakpoint2, `50em`],
    [breakpoint3, `75em`],
  ]

  const cssApi = configureCssApi({
    breakpoints: breakpointMap,
    data: {
      color: {
        red: `#FA0000`,
        green: `#00FA00`,
        blue: `#0000FA`,
      },
    },
  })

  it(`batches mulitple api functions into media queries`, () => {
    const result = cssApi({
      padding: [`1rem`, `2rem`, `3rem`],
      margin: [`0.5rem`, `1.5rem`],
      color: [`red`, `green`, `blue`],
    })

    const expected = `
      padding: 1rem;
      margin: 0.5rem;
      color: #FA0000;
      @media (min-width: 25em) {
        padding: 2rem;
        margin: 1.5rem;
        color: #00FA00;
      }
      @media (min-width: 50em) {
        padding: 3rem;
        color: #0000FA;
      }`

    expect(result).toEqualMultiline(expected)
  })
})
