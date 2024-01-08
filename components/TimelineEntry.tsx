"use client"

import React, {useEffect, useState} from 'react';
import {GetPicturePathRequest, GetPicturePathResponse} from "@/app/api/event/picture/get-path/route";
import Image from "next/image";
import LoadingCircle from "@/components/LoadingCircle";

interface TimelineEntry {
    date: string,
    text: string,
    pictureId: string,
}

const TimelineEntry: React.FC<TimelineEntry> = ({ date, text, pictureId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [picturePath, setPicturePath] = useState('')

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Close the modal if the click occurs outside the image
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    const dateObject = new Date(date);
    const dateReadable = `${dateObject.getDate()}.${dateObject.getMonth() + 1}.${dateObject.getFullYear()}`

    useEffect(() => {

        if (pictureId === '') {
            console.error('Bildid missing');
            return;
        }

        const data: GetPicturePathRequest = {
            id: pictureId
        }

        fetch('/api/event/picture/get-path/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data: GetPicturePathResponse) => setPicturePath(data.path))
    }, []);

    return (
        <>
            {picturePath === '' ? (
                <LoadingCircle />
            ) : (
                <div className="flex items-center mb-4 py-3 bg-gray-900 pl-2">
                    <div className="w-32 h-16 bg-gray-500 rounded-full flex items-center justify-center mr-4">
                        <div className="text-white whitespace-nowrap">{dateReadable}</div>
                    </div>
                    <div className="text-center">
                        <p className="w-64">{text}</p>
                        <Image src={picturePath} alt={'Timeline'} className={'mt-2 max-w-xs mx-auto block cursor-pointer'} width={150} height={150} onClick={openModal} />
                    </div>

                    {isModalOpen && (
                        <div
                            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                            onClick={handleOverlayClick}
                        >
                            <div className="bg-white p-4 rounded-md">
                                <img src={picturePath} alt="Timeline" className="max-w-full max-h-full"/>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </>


    );
};

export default TimelineEntry;