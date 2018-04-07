import {
  compose,
  assoc,
  defaultTo,
  pipe,
  when,
  mergeDeepRight,
  props,
  apply,
} from 'ramda'
import { stubObj, isObject } from 'ramda-adjunct'
import breakpointResolver from './breakpoints/breakpointResolver'
import { ensureBreakpointMapHasDefault } from './utils/breakpoints'
import { reduceObjIndexed } from './utils/objects'
import defaultConfig from './config/defaultConfig'
import defaultBreakpointMapProvider from './breakpoints/defaultBreakpointProvider'
import declarationBuilder from './api/declarationBuilder'
import expandStyles from './api/expandStyles'
import buildApi from './api/buildApi'

const mergeDefaultConfig = pipe(
  defaultTo(stubObj()),
  mergeDeepRight(defaultConfig)
)

const buildDeclarationProcessor = (breakpointProvider, data) => (
  acc,
  [name, style]
) =>
  assoc(
    name,
    pipe(
      breakpointResolver(breakpointProvider),
      declarationBuilder(name, data, style)
    ),
    acc
  )

const buildDeclarationProcessors = (breakpointMapOrProvider, data, api) => {
  const configuredBreakpointMapProvider = pipe(
    when(
      isObject,
      compose(defaultBreakpointMapProvider, ensureBreakpointMapHasDefault)
    )
  )(breakpointMapOrProvider)

  return reduceObjIndexed(
    buildDeclarationProcessor(configuredBreakpointMapProvider, data),
    stubObj(),
    api
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = pipe(
  mergeDefaultConfig,
  expandStyles,
  props([`breakpoints`, `data`, `api`]),
  apply(buildDeclarationProcessors),
  buildApi
)

export default api
