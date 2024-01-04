import {NextRequest, NextResponse} from "next/server";
import {RiddleDataService} from "@/utils/Data/RiddleDataService";

const wrongAnswer = async (req: NextRequest) => {

    const rds = new RiddleDataService();
    await rds.loadRiddle('84da0edc-fc12-4dca-9935-09e2cc521a36')

    return new NextResponse(JSON.stringify(''), {status: 200})
};

export {wrongAnswer as GET};