import {NextRequest, NextResponse} from "next/server";
import {EventDataService} from "@/utils/Data/EventDataService";

const createRiddle = async (req: NextRequest) => {

    const content = await req.formData();

    const eds = new EventDataService();

    await eds.createEvent(content);

    return new NextResponse(JSON.stringify(''), {status: 200})
};

export {createRiddle as POST};