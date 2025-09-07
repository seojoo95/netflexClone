import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
    }
    body, html{
        background: #333;
    }
`

export default GlobalStyle