export class RiddleEntity {
    private _id: string = '';
    private _text: string = '';
    private _pictureId: string|null = null;
    private _answers: string[] = [];
    private _correctAnswerId: number = -1;

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
}

