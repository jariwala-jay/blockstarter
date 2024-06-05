import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import Footer from './Footer';


const Layout = (props) => {
  return (
    < >

      
      <div className="max-w-[1440x]">
        <Header />
        <div>
          {props.children}
        </div>
        <div className="relative bottom-0 w-full">
        <Footer/>
        </div>
      </div>
    </>
  );
};

export default Layout;
