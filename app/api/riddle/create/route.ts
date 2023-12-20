import {NextRequest, NextResponse} from "next/server";

const createRiddle = async (req: NextRequest) => {

    // const {text, correctAnswer, image} = req.body;

    console.log(req.body)

    return new NextResponse(JSON.stringify(''), {status: 200})
};

export {createRiddle as POST};