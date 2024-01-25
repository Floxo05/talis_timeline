import {NextResponse} from "next/server";
import {RiddleDataService} from "@/utils/Data/RiddleDataService";

const getPoints = async () => {

    const rds = new RiddleDataService();
    const points = await rds.getPoints();

    return new NextResponse(JSON.stringify({points: points}), {status: 200})
};

export {getPoints as GET};