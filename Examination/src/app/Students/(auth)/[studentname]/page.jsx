
// 'use client'
// import React, { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { Container, Typography, Paper, Box } from '@mui/material'

// export default function StudentPage() {
//   const params = useParams()
//   const [studentName, setStudentName] = useState('')

//   useEffect(() => {
//     if (params.Studentname) {
//       setStudentName(decodeURIComponent(params.Studentname))
//     }
//   }, [params.Studentname])

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Welcome, {studentName}
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             This is your examination dashboard. Your upcoming exams and results will appear here.
//           </Typography>
//         </Box>
        
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h6" gutterBottom>
//             Upcoming Examinations
//           </Typography>
//           <Typography variant="body1">
//             No examinations scheduled at the moment.
//           </Typography>
//         </Box>

//         <Box>
//           <Typography variant="h6" gutterBottom>
//             Recent Results
//           </Typography>
//           <Typography variant="body1">
//             No recent examination results available.
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   )
// }


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

