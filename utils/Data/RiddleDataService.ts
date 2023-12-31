import {BaseDataService} from "@/utils/Data/BaseDataService";
import {PictureService} from "@/utils/Picture/PictureService";
import {RiddleEntity, RiddleEntityInterface} from "@/utils/Data/Entity/RiddleEntity";
import * as crypto from "crypto";

export type RiddleData = Record<string, object>;

export class RiddleDataService extends BaseDataService<RiddleData> {

    private pictureService: PictureService;
    private _riddle: RiddleEntity = new RiddleEntity();
    constructor() {
        super('public/database/riddle.json');
        this.pictureService = new PictureService('public/pictures/riddle/');
    }

    async createRiddle(formData: FormData) {
        this._riddle.id = crypto.randomUUID();
        this._riddle.pictureId = await this.pictureService.savePicture(formData.get('image'));

        this._riddle.text = this.getStringFromFormdata(formData, 'text');
        this._riddle.points = this.getNumberFromFormdata(formData, 'points')

        this._riddle.answers = [
            this.getStringFromFormdata(formData, 'answer1'),
            this.getStringFromFormdata(formData, 'answer2'),
            this.getStringFromFormdata(formData, 'answer3'),
            this.getStringFromFormdata(formData, 'answer4'),
        ];

        this._riddle.correctAnswerId = parseInt(this.getStringFromFormdata(formData, 'correctAnswer'))

        await this.saveRiddle();
    }

    private getStringFromFormdata(data: FormData, key: string) {
        const value = data.get(key);
        if (typeof value === "string") {
            return value;
        }

        return '';
    }

    private getNumberFromFormdata(data: FormData, key: string): number {
        const value = data.get(key);
        if (typeof value === "string") {
            return parseInt(value) ?? 0;
        }

        return 0;
    }


    async saveRiddle() {
        const riddles = await this.getData();
        riddles[this._riddle.id] = this._riddle;

        await this.setData(riddles);
    }

    async loadRiddle(id: string) {
        const riddles = await this.getData();
        const r: RiddleEntityInterface = riddles[id]
        this._riddle = r;

    }

    get riddle(): RiddleEntityInterface {
        return this._riddle;
    }

    async loadRandomRiddle() {
        const riddles = await this.getData();

        let pendingRiddles: RiddleEntity[] = [];

        Object.keys(riddles).some((key) => {
            if (riddles[key].answerStatus !== 'right') {
                pendingRiddles.push(riddles[key])
            }
        })

        const randomIndex = Math.floor(Math.random() * pendingRiddles.length);

        this._riddle = pendingRiddles[randomIndex];
    }
}
