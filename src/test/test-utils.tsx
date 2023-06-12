import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import {
  ConfirmationContextProvider,
  ConfirmationModal,
} from "../components/common/confirmation";
import { AppStore, RootState, setupStore } from "../redux/store";
import { theme } from "../theme";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ColorModeScript
            initialColorMode={theme["config"].initialColorMode}
          />
          <ConfirmationContextProvider>
            {children}
            <ConfirmationModal />
          </ConfirmationContextProvider>
        </ChakraProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { renderWithProviders as render };
