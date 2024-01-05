"use client"
// pages/Riddles.tsx
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {RiddleAnswer} from "@/utils/Types";
import {RiddleEntityInterface} from "@/utils/Data/Entity/RiddleEntity";
import Image from "next/image";
import {GetPicturePathRequest, GetPicturePathResponse} from "@/app/api/riddle/picture/get-path/route";
import RiddleFeedback from "@/components/RiddleFeedback";
import {RightAnwserRequest} from "@/app/api/riddle/answer/right/route";
import {WrongAnswerRequest} from "@/app/api/riddle/answer/wrong/route";

const Riddles: React.FC = () => {
    const router = useRouter();

    const [riddleData, setRiddleData] = useState<RiddleEntityInterface | null>(null);
    const [loading, setLoading] = useState(true);

    const [riddleAnswer, setRiddleAnswer] = useState<RiddleAnswer>('pending');
    const [picturePath, setPicturePath] = useState('')

    useEffect(() => {
        getNewRiddle();
    }, []);

    useEffect(() => {

        if (!riddleData || !riddleData.pictureId) {
            return;
        }

        const data: GetPicturePathRequest = {
            id: riddleData.pictureId
        }

        fetch('/api/riddle/picture/get-path/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data: GetPicturePathResponse) => setPicturePath(data.path))
    }, [riddleData]);

    const getNewRiddle = () => {
        setLoading(true);
        setRiddleAnswer('pending');
        setPicturePath('');

        fetch('/api/riddle/get') // Updated API endpoint
            .then((response) => response.json())
            .then((data: RiddleEntityInterface) => {
                setRiddleData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching riddle data:', error);
                setRiddleData(null)
                setLoading(false);
            });
    }

    const handleAnswerSubmit = async (selectedOption: number) => {
        if (!riddleData) {
            return
        }

        const isCorrect = selectedOption === riddleData.correctAnswerId;
        setRiddleAnswer(isCorrect ? 'right' : 'wrong')

        // If correct, add points to the main point count on the timeline page
        if (isCorrect) {
            await handleRightAnswer();
        } else {
            await handleWrongAnswer();
        }
    };

    const handleRightAnswer = async () => {
        if (!riddleData) {
            return
        }

        await fetch('/api/points/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                points: riddleData.correctAnswerId
            })
        });

        const data: RightAnwserRequest = {
            id: riddleData.id
        }

        await fetch('/api/riddle/answer/right', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    const handleWrongAnswer = async () => {
        if (!riddleData) {
            return
        }

        const data: WrongAnswerRequest = {
            id: riddleData.id
        }

        await fetch('/api/riddle/answer/wrong', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    const handleNewRiddle = () => {
        getNewRiddle()
    }


    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Riddle Page</h1>

            {loading ? (
                <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {riddleAnswer === 'wrong' ? (
                        <RiddleFeedback newRiddle={handleNewRiddle} text={'Leider falsch! 😢'}/>
                    ) : riddleAnswer === 'right' ? (
                        <RiddleFeedback newRiddle={handleNewRiddle} text={'Das ist korrekt! 👍'}/>
                    ) : (
                        <>
                            {riddleData ? (
                                <>
                                    <p className="text-lg mb-4">{riddleData.text}</p>
                                    <Image src={picturePath} alt={'Riddle picture'} width={300} height={100}
                                           className={'p-4'}/>
                                    <div>
                                        {riddleData.answers.map((option, index) => (
                                            <button key={index} onClick={() => handleAnswerSubmit(index)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <RiddleFeedback newRiddle={() => {}} text={'Glückwunsch 🥳, du hast alle Rätsel gelöst'} isCompleted={true} />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Riddles;
