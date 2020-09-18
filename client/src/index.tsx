import React from 'react';
import ReactDOM from 'react-dom';
import "./tailwind.output.css"
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { theme, ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core"; 

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || "/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ColorModeProvider>
      <CSSReset />
      <ApolloProvider client={client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
    </ColorModeProvider>
  </ThemeProvider>,
  document.getElementById("root")
);  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
