import { useState, useMemo } from "react";
import { useRoutes } from "react-router-dom";

import { SnackbarProvider } from "notistack";
// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";

import { UserContext } from "./UserContext";

// ----------------------------------------------------------------------

export default function App() {
  const [user, setUser] = useState({});

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const routing = useRoutes(Router(localStorage.getItem("user")));

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <SnackbarProvider>
        <UserContext.Provider value={value}>
          {routing}
          </UserContext.Provider>
      </SnackbarProvider>
    </ThemeConfig>
  );
}
