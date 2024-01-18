// import {RiddleAnswer} from "@/utils/Types";

export interface EventEntityInterface {
    id: number;
    text: string;
    picturePath: string | null;
    date: string;
}

export class EventEntity implements EventEntityInterface {
    id: number = -1;
    picturePath: string | null = null;
    text: string = '';
    date: string = '';
}

