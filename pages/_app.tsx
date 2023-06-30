import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Container } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Head>
        <title>Apex Leaderboard</title>
      </Head>
      <Container>
        <Component {...pageProps} />
      </Container>
    </div>
  );
}
