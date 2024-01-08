import {NextRequest, NextResponse} from "next/server";
import {EventDataService} from "@/utils/Data/EventDataService";
import {EventEntityInterface} from "@/utils/Data/Entity/EventEntity";

export type GetReachedEventsRequest = {
    points: number
}

export type GetReachedEventsResponse = {
    events: EventEntityInterface[]
}

const getReachedEvents = async (req: NextRequest) => {

    const data: GetReachedEventsRequest = await req.json();

    const reachedEvents: EventEntityInterface[] = await EventDataService.getReachedEvents(data.points);

    return new NextResponse(JSON.stringify({events: reachedEvents}), {status: 200})
};

export {getReachedEvents as POST};