import {
  compose,
  assoc,
  defaultTo,
  pipe,
  mergeDeepRight,
  unless,
  lensProp,
  over,
  lensPath,
} from 'ramda'
import { lensSatisfies } from 'ramda-adjunct'
import resolveBreakpoints from './breakpoints/resolveBreakpoints'
import { ensureBreakpointMapHasDefault } from './utils/breakpoints'
import { reduceObjIndexed } from './utils/objects'
import defaultConfig from './config/defaultConfig'
import defaultBreakpointMapProvider from './breakpoints/defaultBreakpointProvider'
import declarationBuilder from './api/declarationBuilder'
import expandStyles from './api/expandStyles'
import buildApi from './api/buildApi'
import expandData from './api/expandData'
import { isBreakpointProvider } from './utils/predicate'
import { CONFIG_FIELD_NAMES } from './const'

const { BREAKPOINTS } = CONFIG_FIELD_NAMES

const lBreakpoints = lensProp(BREAKPOINTS)

const mergeDefaultConfig = pipe(defaultTo({}), mergeDeepRight(defaultConfig))

const ensureDataScopes = over(lensPath([`data`, `scopes`]), defaultTo([]))

const buildDeclarationProcessor = (breakpointProvider, data) => (
  acc,
  [name, style]
) => {
  const r = assoc(
    name,
    pipe(
      resolveBreakpoints(breakpointProvider),
      declarationBuilder(name, data, style)
    ),
    acc
  )

  return r
}

const buildDefaultBreakpointProvider = compose(
  defaultBreakpointMapProvider,
  ensureBreakpointMapHasDefault
)

const ensureBreakpointProvider = pipe(
  unless(
    lensSatisfies(isBreakpointProvider, lBreakpoints),
    over(lBreakpoints, buildDefaultBreakpointProvider)
  )
)

const buildDeclarationProcessors = ({ breakpoints, data, api }) =>
  reduceObjIndexed(buildDeclarationProcessor(breakpoints, data), {}, api)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = pipe(
  mergeDefaultConfig,
  ensureDataScopes,
  expandData,
  expandStyles,
  ensureBreakpointProvider,
  buildDeclarationProcessors,
  buildApi
)

export default api
