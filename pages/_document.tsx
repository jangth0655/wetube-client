import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript>
          if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer;
        </NextScript>
      </body>
    </Html>
  );
}
