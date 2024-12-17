import React from 'react';
import Login from "../../components/Institutes/Login";
import Background from '../../components/background';
const StudentLogin = () => {
    return (
        <>
            <div className="relative min-h-screen">
                <Background />
                <Login />
            </div>
        </>
    );
};
export default StudentLogin;