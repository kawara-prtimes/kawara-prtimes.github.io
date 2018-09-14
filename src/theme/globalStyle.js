import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    padding:0;
    margin: 0;
    font-size: 16px;
    * {
      box-sizing: border-box;
    }
    h1,h2,h3,h4 {
      font-size: inherit;
    }
    a {
      text-decoration: none;
    }
    input,textarea {
      font-size: inherit;
    }
    ul,li {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    p, dl, dd {
      margin: 0;
    }
  }
`
