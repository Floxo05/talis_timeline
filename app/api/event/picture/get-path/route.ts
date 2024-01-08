import {PictureService} from "@/utils/Picture/PictureService";
import {NextRequest, NextResponse} from "next/server";

export type GetPicturePathRequest = {
    id: string
}

export type GetPicturePathResponse = {
    path: string
}

const getPicturePath = async (req: NextRequest) => {

    const data: GetPicturePathRequest = await req.json();

    const ps = new PictureService('public/pictures/event/');
    const path = ps.getPath(data.id);

    return new NextResponse(JSON.stringify({path: path}), {status: 200})
}

export {getPicturePath as POST};