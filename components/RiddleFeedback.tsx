import React from "react";
import {useRouter} from "next/navigation";

type RiddleFeedbackProps = {
    newRiddle: () => void
    text: string
    isCompleted?: boolean
}

const RiddleFeedback: React.FC<RiddleFeedbackProps> = ({text, newRiddle, isCompleted = false}) => {

    const router = useRouter();
    const handleBackToTimeline = () => {
        router.push('/timeline');
    }

    return (
        <div className={"mt-4"}>
            <p className={"mb-4"}>{text}</p>
            {!isCompleted && (
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2" onClick={newRiddle}>
                    Neues Rätsel
                </button>
            )}

            <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2" onClick={handleBackToTimeline}>
                Zurück zur Timeline
            </button>
        </div>
    )
}

export default RiddleFeedback;