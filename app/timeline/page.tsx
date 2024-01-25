"use client"

import React, {useEffect, useState} from "react";
import AuthService from "@/utils/Auth/AuthService";
import {useRouter} from "next/navigation";
import TimelineEntry from "@/components/TimelineEntry";
import {GetReachedEventsRequest, GetReachedEventsResponse} from "@/app/api/event/reached-events/get/route";
import {EventEntityInterface} from "@/utils/Data/Entity/EventEntity";
import LoadingCircle from "@/components/LoadingCircle";

const Timeline: React.FC = () => {

    const router = useRouter()

    // Check authentication status, redirect to home if not authenticated
    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            router.push('/');
        }
    }, [router]);

    const [timelineData, setTimelineData] = useState<EventEntityInterface[] | null>(null);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        fetch('/api/points/get', {
            cache: 'no-store'
        })
            .then((res) => res.json())
            .then((data) => {
                setPoints(data.points)
            })
            .catch((error) => console.log(error));
    }, []);


    useEffect(() => {
        // Replace 'your_api_endpoint' with the actual API endpoint for timeline data
        const dataRequest: GetReachedEventsRequest = {
            points: points
        }

        fetch('/api/event/reached-events/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataRequest),
            cache: 'no-store'
        })
            .then((response) => response.json())
            .then((data: GetReachedEventsResponse) => {
                setTimelineData(data.events);
            })
            .catch((error) => console.error('Error fetching timeline data:', error));
    }, [points]);


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

            {timelineData ? (
                <div className="overflow-y-auto max-h-[70vh]">
                    {timelineData.map((entry, index) => (
                        <TimelineEntry key={index} date={entry.date} text={entry.text}
                                       picturePath={entry.picturePath ?? ''}/>
                    ))}
                </div>
            ) : (
                <LoadingCircle/>
            )}


        </div>
    );
};

export default Timeline;