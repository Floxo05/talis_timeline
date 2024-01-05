import {NextResponse} from "next/server";
import {RiddleDataService} from "@/utils/Data/RiddleDataService";


const getRiddle = async () => {

    const rds = new RiddleDataService();
    await rds.loadRandomRiddle()

    return new NextResponse(JSON.stringify(rds.riddle), {status: 200})
};

export {getRiddle as GET};
