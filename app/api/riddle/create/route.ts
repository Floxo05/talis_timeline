import {NextRequest, NextResponse} from "next/server";
import fs from "fs";
import {RiddleDataService} from "@/utils/Data/RiddleDataService";

const createRiddle = async (req: NextRequest) => {

    const content = await req.formData();

    const rds = new RiddleDataService();

    await rds.createRiddle(content);

    return new NextResponse(JSON.stringify(''), {status: 200})
};

export {createRiddle as POST};