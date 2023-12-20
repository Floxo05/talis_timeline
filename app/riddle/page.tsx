"use client"
// pages/Riddles.tsx
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

const Riddles: React.FC = () => {
    const router = useRouter();

    const [riddleData, setRiddleData] = useState({
        question: '',
        options: [],
        correctAnswer: '',
        points: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating an API request delay
        const delay = setTimeout(() => {
            // Fetch riddle data from your API endpoint
            fetch('/api/riddle/get') // Updated API endpoint
                .then((response) => response.json())
                .then((data) => {
                    setRiddleData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching riddle data:', error);
                    setLoading(false);
                });
        }, 0); // Simulating a 2-second delay

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(delay);
    }, []);

    const handleAnswerSubmit = async (selectedOption: string) => {
        // Check if the selected option is the correct answer
        const isCorrect = selectedOption === riddleData.correctAnswer;

        // If correct, add points to the main point count on the timeline page
        if (isCorrect) {
            await fetch('/api/points/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    points: riddleData.points
                })
            });
            router.push('/timeline');
        }

        // You can close the riddle flyout or redirect to the timeline page
        // (implementation depends on your design)
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Riddle Page</h1>

            {loading ? (
                // Display a loading spinner while fetching data
                <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
                </div>
            ) : (
                // Display riddle data when it's available
                <>
                    <p className="text-lg mb-4">{riddleData.question}</p>
                    <div>
                        {riddleData.options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswerSubmit(option)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Riddles;
