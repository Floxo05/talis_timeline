"use client"

import React, {useEffect, useState} from "react";
import AuthService from "@/utils/Auth/AuthService";
import {useRouter} from "next/navigation";
import TimelineEntry from "@/components/TimelineEntryProps";

const Timeline: React.FC = () => {

    const router = useRouter()

    // Check authentication status, redirect to home if not authenticated
    if ( !AuthService.isAuthenticated()) {
        router.push('/');
        return null;
    }

    // const [timelineData, setTimelineData] = useState([]);
    //
    // useEffect(() => {
    //     // Replace 'your_api_endpoint' with the actual API endpoint for timeline data
    //     fetch('your_api_endpoint')
    //         .then((response) => response.json())
    //         .then((data) => setTimelineData(data))
    //         .catch((error) => console.error('Error fetching timeline data:', error));
    // }, []);

    const [timelineData, setTimelineData] = useState([
        {
            date: '2023-01-01',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            picture: 'https://placekitten.com/300/200', // Placeholder image URL
        },
        {
            date: '2023-02-15',
            text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            picture: 'https://placekitten.com/300/201', // Placeholder image URL
        },
        {
            date: '2023-04-05',
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            picture: 'https://placekitten.com/301/200', // Placeholder image URL
        },
        {
            date: '2023-04-05',
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            picture: 'https://placekitten.com/301/200', // Placeholder image URL
        },
        {
            date: '2023-04-05',
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            picture: 'https://placekitten.com/301/200', // Placeholder image URL
        },
        {
            date: '2023-04-05',
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            picture: 'https://placekitten.com/301/200', // Placeholder image URL
        },
    ]);

    const [points, setPoints] = useState(0);

    useEffect(() => {
        fetch('/api/points/get')
            .then((res) => res.json())
            .then((data) => setPoints(data.points))
    }, [])
    const handleIncrementPoints = () => {
        router.push("riddle")
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Timeline</h1>
            <div className="flex items-center justify-center mb-4">
                <p className="text-lg font-bold mr-2">Points: {points}</p>
                <button onClick={handleIncrementPoints} className="bg-blue-500 text-white px-3 py-1 rounded-md">
                    Add Point
                </button>
            </div>
            <div className="overflow-y-auto max-h-[70vh]">
                {timelineData.map((entry, index) => (
                    <TimelineEntry key={index} date={entry.date} text={entry.text} picture={entry.picture}/>
                ))}
            </div>
        </div>
    );
};

export default Timeline;