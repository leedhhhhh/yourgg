import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`  
    ${normalize}  
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
    html { 
       box-sizing: border-box;    
       font-size: 20px;    
       min-width: 320px;  
    }
    html, body {
       height: 100%
    }

    body {
       font-family: 'Source Sans Pro', sans-serif;
    }
    
    a { 
        cursor: pointer; 
        text-decoration: none; 
    }

`;
