import {NextRequest, NextResponse} from "next/server";
import {RiddleDataService} from "@/utils/Data/RiddleDataService";

export type WrongAnswerRequest = {
    id: number
}
const wrongAnswer = async (req: NextRequest) => {

    const data: WrongAnswerRequest = await req.json();

    const rds = new RiddleDataService();
    await rds.loadRiddle(data.id)
    rds.riddle.answerStatus = 'wrong';

    await rds.saveRiddle();

    return new NextResponse(JSON.stringify(''), {status: 200})
};

export {wrongAnswer as POST};