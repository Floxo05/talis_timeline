import {BaseDataService} from "@/utils/Data/BaseDataService";
import {PictureService} from "@/utils/Picture/PictureService";
import * as crypto from "crypto";
import {EventEntity, EventEntityInterface} from "@/utils/Data/Entity/EventEntity";

export type EventData = Record<string, object>;

const pointsPerEvent = 5;

export class EventDataService extends BaseDataService<EventData> {

    private pictureService: PictureService;
    private _event: EventEntity = new EventEntity();
    constructor() {
        super('public/database/event.json');
        this.pictureService = new PictureService('public/pictures/event/');
    }

    async createEvent(formData: FormData) {
        this._event.id = crypto.randomUUID();
        this._event.pictureId = await this.pictureService.savePicture(formData.get('image'));

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
        const events = await this.getData();
        events[this._event.id] = this._event;

        await this.setData(events);
    }

    async loadRiddle(id: string) {
        const events = await this.getData();
        const e: EventEntityInterface = events[id]
        this._event = e;

    }

    get riddle(): EventEntityInterface {
        return this._event;
    }

    static async getReachedEvents(points: number) {
        const eds = new EventDataService();

        const jsonObject: object = await eds.getData();

        const events: EventEntityInterface[] = Object.values(jsonObject);
        events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        let eventCount = Math.floor(points / pointsPerEvent);

        if (eventCount > events.length) {
            eventCount = events.length;
        }

        return events.slice(0, eventCount);
    }
}
