import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import api from './api'

injectGlobal`
  ${styledNormalize}
  
  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, Arial, Sans-Serif;
    ${api({
      backgroundColor: [`background`],
      fontFamily: `default`,
      lineHeight: [`2ru`, `2ru`],
      fontSize: [`medium`, `medium`],
    })}
  }

  h1, 
  h2, 
  h3 {
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  p {
    ${api({
      margin: `2ru 0`,
    })}
  }

  ul,
  ol {
    padding: 0,
    margin: 0;
  }
  html,
  body,
  #root {
    min-height: 100%;
  }
`
