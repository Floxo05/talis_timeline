"use client";
import React, {useState} from "react";

const RiddleCreate: React.FC = () => {
    const [text, setText] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [image, setImage] = useState(null);


    const handleSubmit = async (e) => {
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
        // Add answers to form data
        answers.forEach((answer, index) => {
            formData.append(`answer${index + 1}`, answer);
        });
        // Send data to API
        const response = await fetch('/api/riddle/create', {
            method: 'POST',
            body: formData
        });

    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Create Riddle</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Text:
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)}
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