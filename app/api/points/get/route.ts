import {NextRequest, NextResponse} from "next/server";
import {PointDataService} from "@/utils/Data/PointDataService";

const getPoints = async (req: NextRequest) => {

    const pds = new PointDataService();

    const points = await pds.getData()

    return new NextResponse(JSON.stringify(points), {status: 200})
};

export {getPoints as GET};