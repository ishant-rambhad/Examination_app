
"use client"
import React from 'react';
import Dashboard from '@/components/Students/Dashboard';
import Sidebar from '@/components/Students/Sidebar';
const page = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '250px' }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}>
        <Dashboard />
      </div>
    </div>  );
};

     

export default page

