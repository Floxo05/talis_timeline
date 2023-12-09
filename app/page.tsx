'use client'
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import AuthService from "@/utils/AuthService";

const Home: React.FC = () => {
    const [password, setPassword] = useState('');
    const router = useRouter()
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;

        // Assuming 'your_password' is the correct password
        if (newPassword === 'tali') {
            // Navigate to the next page
            AuthService.setAuthenticated()
            router.push('/timeline')
        }

        // Update the password state
        setPassword(newPassword);
    };

    return (
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
                <p className="text-lg mb-4">Enter your password to access the app.</p>
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="bg-gray-800 text-white p-2 rounded-md focus:outline-none"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
    );
};

export default Home;