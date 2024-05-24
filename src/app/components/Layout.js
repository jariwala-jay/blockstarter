import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';


const Layout = (props) => {
  return (
    < >

      
      <div className="min-h-screen bg-[#eefdfe]">
        <Header />
        <Container className='pt-[10px] pb-[140px] '>
          {props.children}
        </Container>
        <div className="footer absolute bottom-0 w-full">
       
        </div>
      </div>
    </>
  );
};

export default Layout;
