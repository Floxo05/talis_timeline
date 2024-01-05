import React from 'react';

interface FancyAlertProps {
    show: boolean,
    message: string,
    onCloseMethod: () => void,
}

const CustomAlert: React.FC<FancyAlertProps> = ({show, message, onCloseMethod}) => {
    return (
        <>
            {show && (
                <div
                    className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 p-4 rounded shadow-md text-center text-white w-64">
                    <p className="m-0 text-g">{message}</p>
                    <button
                        onClick={onCloseMethod}
                        className="bg-blue-500 text-white border-none px-4 py-2 mt-4 rounded cursor-pointer hover:bg-blue-600"
                    >
                        Schließen
                    </button>
                </div>
            )}
        </>
    );
};

export default CustomAlert;