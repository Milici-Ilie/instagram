import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"; //🚦🚥[SIGN IN]🚦🚥 also we need to import this 'SessionProvider' to make this work for our LOG IN/////
import { RecoilRoot } from "recoil";

//🚦🚥[SIGN IN]🚦🚥 NOTE❗❗ here we have all our App, if we wrap this with 'SessionProvider'/imported above 👆 than the app will be accessed only after the user passed that step, meaning he must LOG IN first to acces the app
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // 🚦🚥[SIGN IN]🚦🚥 we use 'pageProps' that is given by NextJS for every single page, this include also the 'session' if is need it, and also the 'pageProps' it self. NOTE❗❗ that this 'pageProps' can contain more info's, check on google === ❗❗❗ { Component, pageProps: { session, ...pageProps } }: Acesta este un mod de a destrucțura obiectul de proprietăți primite de MyApp.  ---Component reprezintă componenta React asociată paginii curente. Aceasta este în mod implicit furnizată de Next.js. --- pageProps este obiectul de proprietăți specifice paginii curente.---{ session, ...pageProps } destrucțurează pageProps și extrage session, iar restul proprietăților sunt păstrate în pageProps. ==== also check the 'Header.js'
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
