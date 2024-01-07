// import {RiddleAnswer} from "@/utils/Types";

export interface EventEntityInterface {
    id: string;
    text: string;
    pictureId: string | null;
    date: string;
}

export class EventEntity implements EventEntityInterface {
    id: string = '';
    pictureId: string | null = null;
    text: string = '';
    date: string = '';
}

