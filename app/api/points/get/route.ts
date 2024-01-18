import {NextRequest, NextResponse} from "next/server";
import {RiddleDataService} from "@/utils/Data/RiddleDataService";

const getPoints = async (req: NextRequest) => {

    const rds = new RiddleDataService();
    const points = await rds.getPoints();


    return new NextResponse(JSON.stringify(points), {status: 200})
};

export {getPoints as GET};