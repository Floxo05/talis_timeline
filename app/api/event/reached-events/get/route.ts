import {NextRequest, NextResponse} from "next/server";
import {DatasetEvent, EventDataService} from "@/utils/Data/EventDataService";
import {EventEntityInterface} from "@/utils/Data/Entity/EventEntity";

export type GetReachedEventsRequest = {
    points: number
}

export type GetReachedEventsResponse = {
    events: EventEntityInterface[]
}

const getReachedEvents = async (req: NextRequest) => {

    const data: GetReachedEventsRequest = await req.json();

    const reachedEvents: DatasetEvent[] = await EventDataService.getReachedEvents(data.points);

    let eventsFormated: EventEntityInterface[] = [];

    console.log(reachedEvents);

    reachedEvents.forEach((event) => {
        eventsFormated.push({
            id: event.id,
            date: event.date,
            picturePath: event.image_path,
            text: event.title
        })
    })

    return new NextResponse(JSON.stringify({events: eventsFormated}), {status: 200})
};

export {getReachedEvents as POST};