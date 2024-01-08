import {RiddleAnswer} from "@/utils/Types";

export interface RiddleEntityInterface {
    id: string;
    text: string;
    pictureId: string | null;
    answers: string[];
    correctAnswerId: number;
    answerStatus: RiddleAnswer;
    points: number
}

export class RiddleEntity implements RiddleEntityInterface {
    answerStatus: RiddleAnswer = 'pending';
    answers: string[] = ['', '', '', ''];
    correctAnswerId: number = -1;
    id: string = '';
    pictureId: string | null = null;
    text: string = '';
    points: number = 0;
}

