import {NextRequest, NextResponse} from "next/server";
import {RiddleDataService} from "@/utils/Data/RiddleDataService";


const getRiddle = async (req: NextRequest) => {

    const rds = new RiddleDataService();
    await rds.loadRandomRiddle()

    console.log(rds.riddle)

    return new NextResponse(JSON.stringify(rds.riddle), {status: 200})
};

export {getRiddle as GET};
