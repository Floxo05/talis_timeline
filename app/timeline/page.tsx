"use client"

import React, {useEffect, useState} from "react";
import AuthService from "@/utils/AuthService";
import {useRouter} from "next/navigation";
import TimelineEntry from "@/components/TimelineEntryProps";
import TimelineEntryProps from "@/components/TimelineEntryProps";

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
    ]);

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Welcome to the Timeline</h1>
            {timelineData.map((entry, index) => (
                <TimelineEntry
                    key={index}
                    date={entry.date}
                    text={entry.text}
                    picture={entry.picture}
                />
            ))}
        </div>
    );
};

export default Timeline;