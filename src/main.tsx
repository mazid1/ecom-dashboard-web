import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import {
  ConfirmationContextProvider,
  ConfirmationModal,
} from "./components/common/confirmation";
import { store } from "./redux/store.ts";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme["config"].initialColorMode} />
        <BrowserRouter>
          <ConfirmationContextProvider>
            <App />
            <ConfirmationModal />
          </ConfirmationContextProvider>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
