import {RiddleAnswer} from "@/utils/Types";

export class RiddleEntity {
    private _id: string = '';
    private _text: string = '';
    private _pictureId: string|null = null;
    private _answers: string[] = [];
    private _correctAnswerId: number = -1;
    private _answerStatus: RiddleAnswer = 'pending'

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get pictureId(): string | null {
        return this._pictureId;
    }

    set pictureId(value: string | null) {
        this._pictureId = value;
    }

    get answers(): string[] {
        return this._answers;
    }

    set answers(value: string[]) {
        this._answers = value;
    }

    get correctAnswerId(): number {
        return this._correctAnswerId;
    }

    set correctAnswerId(value: number) {
        this._correctAnswerId = value;
    }

    get answerStatus(): RiddleAnswer {
        return this._answerStatus;
    }

    set answerStatus(value: RiddleAnswer) {
        this._answerStatus = value;
    }
}

