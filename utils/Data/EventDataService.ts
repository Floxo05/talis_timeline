import {PictureService} from "@/utils/Picture/PictureService";
import {EventEntity, EventEntityInterface} from "@/utils/Data/Entity/EventEntity";
import prisma from "@/utils/Database/prisma";

const pointsPerEvent = 5;

export type DatasetEvent = {
    id: number,
    title: string,
    image_path: string | null,
    date: string
}

export class EventDataService {

    private pictureService: PictureService;
    private _event: EventEntity = new EventEntity();

    constructor() {
        this.pictureService = new PictureService('public/pictures/event/');
    }

    async createEvent(formData: FormData) {
        this._event.picturePath = await this.pictureService.savePicture(formData.get('image'));

        this._event.text = this.getStringFromFormdata(formData, 'text');

        this._event.date = new Date(this.getStringFromFormdata(formData, 'date')).toISOString();

        await this.saveEvent();
    }

    private getStringFromFormdata(data: FormData, key: string) {
        const value = data.get(key);
        if (typeof value === "string") {
            return value;
        }

        return '';
    }


    async saveEvent() {
        const data = {
            title: this._event.text,
            image_path: this._event.picturePath,
            date: this._event.date
        }

        if (this._event.id === -1) {
            const event = await prisma.event.create({
                data: data
            })

            this._event.id = event.id;
            return
        }

        await prisma.event.update({
            data: data,
            where: {
                id: this._event.id
            }
        })
    }

    get riddle(): EventEntityInterface {
        return this._event;
    }

    static async getReachedEvents(points: number) {

        const events: DatasetEvent[] = await prisma.event.findMany({
            orderBy: {
                date: 'asc'
            }
        });

        let eventCount = Math.floor(points / pointsPerEvent);

        if (eventCount > events.length) {
            eventCount = events.length;
        }

        return events.slice(0, eventCount);
    }
}
