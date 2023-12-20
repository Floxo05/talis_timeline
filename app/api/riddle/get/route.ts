import {NextRequest, NextResponse} from "next/server";


const getRiddle = async (req: NextRequest) => {
    const exRiddle = {
        "question": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "correctAnswer": "Paris",
        "points": 10
    }

    return new NextResponse(JSON.stringify(exRiddle), {status: 200})
};

export {getRiddle as GET};
