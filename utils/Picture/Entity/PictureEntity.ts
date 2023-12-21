export class PictureEntity {
    private _id: string = '';
    private _path: string = '';

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }
}