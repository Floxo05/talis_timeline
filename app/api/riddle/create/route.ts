import {NextRequest, NextResponse} from "next/server";

const createRiddle = async (req: NextRequest) => {

    // const {text, correctAnswer, image} = req.body;


    const content = await req.formData();


    return new NextResponse(JSON.stringify(''), {status: 200})
};

export {createRiddle as POST};