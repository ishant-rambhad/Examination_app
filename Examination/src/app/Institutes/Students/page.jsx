// pages/Institutes/AddStudents.jsx
import React from 'react';
import AddStudent from '@/components/Institutes/AddStudent'; // Ensure the correct import
import FloatingSidebar from "@/components/Institutes/FloatingSidebar";

const AddStudentsPage = () => {
  return (
    <>
      <FloatingSidebar />
      <AddStudent />
    </>
  );
};

export default AddStudentsPage;
