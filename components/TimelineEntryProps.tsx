import React from 'react';

interface TimelineEntryProps {
    date: string;
    text: string;
    picture: string;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({ date, text, picture }) => {
    return (
        <div className="flex items-center mb-4">
            <div className="w-32 h-16 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <div className="text-white whitespace-nowrap ">{date}</div>
            </div>
            <div className={"text-center"}>
                <p className="font-bold">{date}</p>
                <p className={"w-64"}>{text}</p>
                <img src={picture} alt="Timeline" className="max-w-xs mt-2" />
            </div>
        </div>
    );
};

export default TimelineEntry;