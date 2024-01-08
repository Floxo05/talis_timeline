import React from "react";

const LoadingCircle = () => {
    return (
        <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
    );
}

export default LoadingCircle;