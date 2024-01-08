"use client";
import React, {useState} from "react";
import CustomAlert from "@/components/CustomAlert";
import {useRouter} from "next/navigation";
import AuthService from "@/utils/Auth/AuthService";

const RiddleCreate: React.FC = () => {
    const router = useRouter()

    // Check authentication status, redirect to home if not authenticated
    if (!AuthService.isAdmin()) {
        router.push('/');
        return null;
    }

    const [text, setText] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [points, setPoints] = useState('0');
    const [image, setImage] = useState<File | null>(null);
    const [showMessage, setShowMessage] = useState<boolean>(false)

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Check if fields are not empty
        if (!text || answers.some(answer => answer === '') || !image) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }
        // Check if a radio button is selected
        if (!correctAnswer) {
            alert('Bitte wählen Sie eine Antwort aus.');
            return;
        }

        const formData = new FormData();
        formData.append('text', text);
        formData.append('correctAnswer', correctAnswer);
        formData.append('image', image);
        formData.append('points', points)
        // Add answers to form data
        answers.forEach((answer, index) => {
            formData.append(`answer${index + 1}`, answer);
        });
        // Send data to API
        const response = await fetch('/api/riddle/create', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            setShowMessage(true);
            resetForm()
        }

    }

    const resetForm = () => {
        setText('');
        setCorrectAnswer('')
        setAnswers(['', '', '', '']);
        setImage(null);
        setPoints('0');
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files;
        if (!files) {
            return
        }

        const file: File = files[0];
        setImage(file);
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Create Riddle</h1>
            <CustomAlert show={showMessage} message={'Riddle erstellt'} onCloseMethod={() => {
                setShowMessage(false)
            }}/>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Text:
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                           className="w-full px-3 py-2 border rounded-md text-black"/>
                </label>
                <label className="block mb-2">
                    Punkte:
                    <input type="number" value={points} onChange={(e) => setPoints(e.target.value)}
                           className="w-full px-3 py-2 border rounded-md text-black"/>
                </label>
                <label className="block mb-2">
                    Bild:
                    <input type="file" onChange={handleImageChange} className="w-full px-3 py-2 border rounded-md"/>
                </label>
                {answers.map((answer, index) => (
                    <div key={index} className="mb-4">
                        <label className="block mb-2">
                            Antwort {index + 1}:
                            <input type="text" value={answer} onChange={(e) => {
                                const newAnswers = [...answers];
                                newAnswers[index] = e.target.value;
                                setAnswers(newAnswers);
                            }} className="w-full px-3 py-2 border rounded-md text-black"/>
                        </label>
                        <label className="block mb-2">
                            Ist dies die richtige Antwort?
                            <input type="radio" name="correctAnswer" value={index}
                                   checked={correctAnswer === index.toString()}
                                   onChange={(e) => setCorrectAnswer(e.target.value)} className="ml-2 h-4 w-4"/>
                        </label>
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md">Absenden</button>
            </form>
        </div>
    )
}

export default RiddleCreate