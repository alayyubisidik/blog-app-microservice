import { usePathname } from 'next/navigation';
import buildClient from '../api/build-client';
import Header from '../components/header';
import '../styles/globals.css';
import Footer from '../components/footer';

const disabledNavbar = ['/auth/signin', '/auth/signup'];
const disabledFooter = ['/auth/signin', '/auth/signup'];

export default function App({ Component, pageProps, currentUser }) {
  const pathname = usePathname();

  const shouldShowFooter = !disabledFooter.includes(pathname) && !pathname.startsWith('/dashboard');
  
  return (
    <>
      {disabledNavbar.includes(pathname) ? null : <Header currentUser={currentUser} />}
      <Component currentUser={currentUser} {...pageProps} />
      {shouldShowFooter ? <Footer /> : null}
    </>
  );
}

App.getInitialProps = async (appContext) => {
  const { data } = await buildClient(appContext.ctx.req).get('/api/users/currentuser');

  return {
    currentUser: data.currentUser
  };
}
