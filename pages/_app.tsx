import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyle } from "../styles/global-style";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  return (
    <RecoilRoot>
      <GlobalStyle />
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
