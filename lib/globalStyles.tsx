import { createGlobalStyle } from "styled-components";
import theme from "./utils/theme";

const GlobalStyle = createGlobalStyle`

*, *::after, *::before {
    box-sizing: border-box;
}

html { 
font-family: 'Inter', sans-serif;
max-height: 100vh;
max-width: 100vw;
overflow: hidden;
background: ${theme.D80};
color: ${theme.D10};

 }
 body {
	 padding: 0;
	 margin: 0;
 }
@supports (font-variation-settings: normal) {
  html { font-family: 'Inter var', sans-serif; }
}
pre {
	font-family: input-mono, monospace;
}
	*,
	*:before,
	*:after {
    -webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	}
	code pre span {
		-webkit-font-smoothing: subpixel-antialiased;
	-moz-osx-font-smoothing: subpixel-antialiased;
	font-family: input-mono, monospace;
	}
	button {
		&:active {
			color: ${theme.D10}
		}
	}
a {
		text-decoration: none;
		color: ${theme.B10};
	}

	

`;

export default GlobalStyle;
