"use client"
import React, {useState} from "react";
import CustomAlert from "@/components/CustomAlert";

const EventCreate: React.FC = () => {

    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState<File|null>(null)
    const [showMessage, setShowMessage] = useState<boolean>(false)

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        console.log(date)
        if (text === '' || date === '' || !image) {
            alert('Bitte alle Felder ausfüllen');
            return;
        }

        const formData = new FormData();
        formData.append('text', text);
        formData.append('date', date);
        formData.append('image', image);

        const response = await fetch('/api/event/create', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            setShowMessage(true);
            clearForm();
        }
    }

    function clearForm() {
        setText('');
        setImage(null);
        setDate('');
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
            <h1 className="text-4xl font-bold mb-2">Create Event</h1>
            <CustomAlert show={showMessage} message={'Event erstellt'} onCloseMethod={() => {
                setShowMessage(false)
            }}/>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Text:
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                           className="w-full px-3 py-2 border rounded-md text-black"/>
                </label>
                <label className="block mb-2">
                    Datum:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                           className="w-full px-3 py-2 border rounded-md text-black"/>
                </label>
                <label className="block mb-2">
                    Bild:
                    <input type="file" onChange={handleImageChange} className="w-full px-3 py-2 border rounded-md"/>
                </label>

                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md">Speichern</button>
            </form>
        </div>
    )

}

export default EventCreate;