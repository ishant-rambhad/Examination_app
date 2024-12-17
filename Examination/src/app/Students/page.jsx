import React from 'react';
import Login from "../../components/login"
import Background from '../../components/background';
const Page = () => {
  return (

    <>

      <div className="relative min-h-screen">
        <Background />

        <Login />
      </div>
    </>
  );
};

export default Page;
