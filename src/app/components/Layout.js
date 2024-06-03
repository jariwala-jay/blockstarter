import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';


const Layout = (props) => {
  return (
    < >

      
      <div className="max-w-[1440x]">
        <Header />
        <div>
          {props.children}
        </div>
        <div className="footer absolute bottom-0 w-full">
       
        </div>
      </div>
    </>
  );
};

export default Layout;
