// pages/Institutes/AddStudents.jsx
import React from 'react';
import AddEmployee from '@/components/Institutes/AddEmployee'; // Ensure the correct import
import FloatingSidebar from "@/components/Institutes/FloatingSidebar";

const page = () => {
  return (
    <>
      <FloatingSidebar />
      <AddEmployee/>
    </>
  );
};

export default page;
