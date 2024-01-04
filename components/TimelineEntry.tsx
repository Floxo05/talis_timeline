import React, {useState} from 'react';

interface TimelineEntry {
    date: string;
    text: string;
    picture: string;
}

const TimelineEntry: React.FC<TimelineEntry> = ({ date, text, picture }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <div className="flex items-center mb-4 py-3 bg-gray-900 pl-2">
            <div className="w-32 h-16 bg-gray-500 rounded-full flex items-center justify-center mr-4">
                <div className="text-white whitespace-nowrap">{date}</div>
            </div>
            <div className="text-center">
                <p className="w-64">{text}</p>
                <img
                    src={picture}
                    alt="Timeline"
                    className="mt-2 max-w-xs mx-auto block cursor-pointer"
                    width="150px"
                    onClick={openModal}
                />
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                    onClick={handleOverlayClick}
                >
                    <div className="bg-white p-4 rounded-md">
                        <img src={picture} alt="Timeline" className="max-w-full max-h-full"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimelineEntry;