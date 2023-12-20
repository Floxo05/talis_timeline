import {NextRequest, NextResponse} from "next/server";
import {PointDataService} from "@/utils/Data/PointDataService";

const addPoints = async (req: NextRequest) => {

    const pds = new PointDataService();
    const content = await req.json();
    await pds.incrementPoints(content.points)

    const points = await pds.getData()

    return new NextResponse(JSON.stringify(points), {status: 200})
};

export {addPoints as POST};