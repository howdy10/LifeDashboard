import Head from "next/head";
import { useState } from "react";
import AppContext from "../context/AppContext";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const [user, setUser] = useState(null);
  const [familyIdBaseUrl, setFamilyIdBaseUrl] = useState(null);
  return (
    <CacheProvider value={emotionCache}>
      <AppContext.Provider
        value={{
          state: {
            user: user,
            familyIdBaseUrl: familyIdBaseUrl,
          },
          setUser: setUser,
          setFamilyIdBaseUrl: setFamilyIdBaseUrl,
        }}
      >
        <Head>
          <title>Material Kit Pro</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </AppContext.Provider>
    </CacheProvider>
  );
};

export default App;
