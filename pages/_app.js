import '../styles/globals.css'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import DefaultLayout from "../src/components/DefaultLayout";
import Head from "next/head";
import {UserProvider} from "@/src/store/UserContext";
import {SnackbarProvider} from "notistack";
import {Box, CssBaseline} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/store/theme";
import Loader from "../src/components/Loaader";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const Router = useRouter();
  let Layout = DefaultLayout;
  if (Component.layout === null) Layout = React.Fragment;
  else if (Component.layout) Layout = Component.layout;

  const isInLoginPage = Router.pathname === "/login"

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
      //rest of the code
      if (Router.pathname === "/login") Router.push("/").then((e) => console.log(e));
      // setLoading(false);
    }
    else{
      if (Router.pathname !== "/login") Router.push("/login").then((e) => console.log(e));
      // setLoading(false);
    }

    //dev
    setTimeout( () => {
      setLoading(false)
    }, 2000);

  }, [Router])


  return (
      <>
        <UserProvider value={[user, setUser]}>
          <SnackbarProvider>
            <Head>
              <title>
                {Component.title ? `${Component.title} | VerbiNative` : "VerbiNative"}
              </title>
              <meta
                  content="initial-scale=1, width=device-width"
                  name="viewport"
              />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {
                loading ? (<Loader />) : (
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                )
              }
            </ThemeProvider>

          </SnackbarProvider>
        </UserProvider>
      </>

  )
}
