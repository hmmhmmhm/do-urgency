import type { AppProps } from "next/app";
import tailwindStyle from "./_app.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>
        {tailwindStyle}
      </style>

      <Component {...pageProps} />
    </>
  );
};

export default App;
