import configureCssApi from '../..'
import { key1, key2, key3, value1 } from '../testHelpers/fixtures/generic'

describe(`helpers`, () => {
  const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
  const scaleData = {
    scale: {
      small: 12,
      medium: 16,
      large: 22,
    },
  }
  const colorData = {
    color: {
      [key1]: value1,
    },
  }

  describe(`box helpers`, () => {
    const api = configureCssApi({
      breakpoints: breakpointMap,
      data: {
        ...colorData,
      },
    })

    describe(`padding-h`, () => {
      describe(`with one arguments`, () => {
        it(`returns left and right padding`, () => {
          expect(api({ paddingH: [`10px`, `15px`, `20px`] })).toEqualMultiline(`
              @media (max-width: 24.99em) {
                padding-left: 10px;
                padding-right: 10px;
              }
              
              @media (min-width: 25em) and (max-width: 49.99em) {
                padding-left: 15px;
                padding-right: 15px;
              }
              
              @media (min-width: 50em) {
                padding-left: 20px;
                padding-right: 20px;
              }
            `)
        })
      })

      describe(`with two arguments`, () => {
        it(`returns left and right padding`, () => {
          expect(api({ paddingH: [`10px 20px`, `15px 30px`, `20px 40px`] }))
            .toEqualMultiline(`
              @media (max-width: 24.99em) {
                padding-left: 10px;
                padding-right: 20px;
              }
              
              @media (min-width: 25em) and (max-width: 49.99em) {
                padding-left: 15px;
                padding-right: 30px;
              }
              
              @media (min-width: 50em) {
                padding-left: 20px;
                padding-right: 40px;
              }`)
        })
      })
    })

    describe(`padding-v`, () => {
      describe(`with one arguments`, () => {
        it(`returns top and bottom padding`, () => {
          expect(api({ paddingV: [`10px`, `15px`, `20px`] })).toEqualMultiline(`
            @media (max-width: 24.99em) {
              padding-top: 10px;
              padding-bottom: 10px;
            }
            
            @media (min-width: 25em) and (max-width: 49.99em) {
              padding-top: 15px;
              padding-bottom: 15px;
            }
            
            @media (min-width: 50em) {
              padding-top: 20px;
              padding-bottom: 20px;
            }
          `)
        })
      })

      describe(`with two arguments`, () => {
        it(`returns top and bottom padding`, () => {
          expect(api({ paddingV: [`10px 20px`, `15px 30px`, `20px 40px`] }))
            .toEqualMultiline(`
              @media (max-width: 24.99em) {
                padding-top: 10px;
                padding-bottom: 20px;
              }
              
              @media (min-width: 25em) and (max-width: 49.99em) {
                padding-top: 15px;
                padding-bottom: 30px;
              }
              
              @media (min-width: 50em) {
                padding-top: 20px;
                padding-bottom: 40px;
              }`)
        })
      })
    })

    describe(`border-v`, () => {
      it(`returns top and bottom borders`, () => {
        expect(
          api({
            borderV: [`1ru solid c:key1`, `2ru solid black`, `3ru solid black`],
          })
        ).toEqualMultiline(`
            @media (max-width: 24.99em) {
              border-top: 1.25rem solid value1;
              border-bottom: 1.25rem solid value1;
            }
            
            @media (min-width: 25em) and (max-width: 49.99em) {
              border-top: 2.5rem solid black;
              border-bottom: 2.5rem solid black;
            }
            
            @media (min-width: 50em) {
              border-top: 3.75rem solid black;
              border-bottom: 3.75rem solid black;
            }
            `)
      })
    })

    describe(`border-h`, () => {
      it(`returns left and right borders`, () => {
        expect(
          api({
            borderH: [`1ru solid c:key1`, `2ru solid black`, `3ru solid black`],
          })
        ).toEqualMultiline(`
            @media (max-width: 24.99em) {
              border-left: 1.25rem solid value1;
              border-right: 1.25rem solid value1;
            }
            
            @media (min-width: 25em) and (max-width: 49.99em) {
              border-left: 2.5rem solid black;
              border-right: 2.5rem solid black;
            }
            
            @media (min-width: 50em) {
              border-left: 3.75rem solid black;
              border-right: 3.75rem solid black;
            }
            `)
      })
    })
  })

  describe(`offset`, () => {
    const api = configureCssApi({ breakpoints: breakpointMap })

    it(`renders a single value`, () => {
      const result = api({ offset: `10px` })
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 10px;
        bottom: 10px;
        left: 10px;
      `)
    })

    it(`renders two values`, () => {
      const result = api({ offset: `10px 20px` })
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 20px;
        bottom: 10px;
        left: 20px;
      `)
    })

    it(`renders three values`, () => {
      const result = api({
        offset: `10px 20px 5px`,
      })
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 20px;
        bottom: 5px;
        left: 20px;
      `)
    })

    it(`renders four values`, () => {
      const result = api({
        offset: `10px 20px 5px 2px`,
      })
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 20px;
        bottom: 5px;
        left: 2px;
      `)
    })
  })

  describe(`offsetV`, () => {
    const api = configureCssApi({ breakpoints: breakpointMap })

    it(`renders a single value`, () => {
      const result = api({
        offsetV: `10px`,
      })
      expect(result).toEqualMultiline(`
        top: 10px;
        bottom: 10px;
      `)
    })

    it(`renders two values`, () => {
      const result = api({ offsetV: `10px 20px` })
      expect(result).toEqualMultiline(`
        top: 10px;
        bottom: 20px;
      `)
    })
  })

  describe(`offsetH`, () => {
    const api = configureCssApi({ breakpoints: breakpointMap })

    it(`renders a single value`, () => {
      const result = api({ offsetH: `10px` })
      expect(result).toEqualMultiline(`
        left: 10px;
        right: 10px;
      `)
    })

    it(`renders two values`, () => {
      const result = api({ offsetH: `10px 20px` })
      expect(result).toEqualMultiline(`
        left: 10px;
        right: 20px;
      `)
    })
  })

  describe(`baseline`, () => {
    describe(`half lines`, () => {
      const api = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scaleData,
        },
      })

      describe(`with explicit font-size`, () => {
        describe(`with explicit lines`, () => {
          const result = api({ baseline: `16px 1` })
          expect(result).toEqualMultiline(`
            font-size: 16px;
            line-height: 1.25rem;
          `)
        })

        describe(`with auto lines`, () => {
          expect(api({ baseline: `16px` })).toEqualMultiline(`
            font-size: 16px;
            line-height: 1.25rem;
          `) // 1 lines

          expect(api({ baseline: `20px` })).toEqualMultiline(`
            font-size: 20px;
            line-height: 1.875rem;
          `) // 1.5 lines

          expect(api({ baseline: `21px` })).toEqualMultiline(`
            font-size: 21px;
            line-height: 1.875rem;
          `) // 1.5 lines
        })
      })

      describe(`with unitless font-size`, () => {
        describe(`with explicit lines`, () => {
          const result = api({ baseline: `16 1` })
          expect(result).toEqualMultiline(`
            font-size: 1rem;
            line-height: 1.25rem;
          `)
        })
      })

      describe(`with rhythm unit font-size`, () => {
        describe(`with explicit lines`, () => {
          const result = api({ baseline: `1ru` })
          expect(result).toEqualMultiline(`
            font-size: 1.25rem;
            line-height: 1.875rem;
          `)
        })
      })

      describe(`with font name`, () => {
        describe(`with explicit lines`, () => {
          const result = api({ baseline: `s:large 1` })
          expect(result).toEqualMultiline(`
            font-size: 1.375rem;
            line-height: 1.25rem;
          `)
        })
      })
    })

    describe(`whole lines`, () => {
      const api = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scaleData,
          baseline: {
            allowHalfLines: false,
          },
        },
      })

      expect(api({ baseline: `20px` })).toEqualMultiline(`
        font-size: 20px;
        line-height: 2.5rem;
      `) // 2 lines
    })

    describe(`leading`, () => {
      const api = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scaleData,
          baseline: {
            minLeading: 4,
          },
        },
      })

      expect(api({ baseline: `17px` })).toEqualMultiline(`
        font-size: 17px;
        line-height: 1.875rem;
      `) // 1.5 lines

      expect(api({ baseline: `16px` })).toEqualMultiline(`
        font-size: 16px;
        line-height: 1.25rem;
      `) // 1 line
    })

    describe(`lineHeight`, () => {
      const api = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scaleData,
          baseline: {
            lineHeight: 24,
          },
        },
      })

      expect(api({ baseline: `22px` })).toEqualMultiline(`
        font-size: 22px;
        line-height: 1.5rem;
      `) // 1 lines

      expect(api({ baseline: `23px` })).toEqualMultiline(`
        font-size: 23px;
        line-height: 2.25rem;
      `) // 1.5 lines
    })
  })
})
