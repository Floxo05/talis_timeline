import {NextRequest, NextResponse} from "next/server";
import {RiddleDataService} from "@/utils/Data/RiddleDataService";

export type RightAnwserRequest = {
    id: number
}
const rightAnswer = async (req: NextRequest) => {

    const data: RightAnwserRequest = await req.json();

    const rds = new RiddleDataService();
    await rds.loadRiddle(data.id)
    rds.riddle.answerStatus = 'right';

    await rds.saveRiddle();

    return new NextResponse('', {status: 200})
};

export {rightAnswer as POST};