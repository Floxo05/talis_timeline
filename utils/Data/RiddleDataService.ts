import {BaseDataService} from "@/utils/Data/BaseDataService";
import {PictureService} from "@/utils/Picture/PictureService";
import {RiddleEntity} from "@/utils/Data/Entity/RiddleEntity";
import * as crypto from "crypto";
import {number} from "prop-types";

export type RiddleData = Record<string, object>;

export class RiddleDataService extends BaseDataService<RiddleData> {

    private pictureService: PictureService;
    private riddle: RiddleEntity = new RiddleEntity();
    constructor() {
        super('database/riddle.json');
        this.pictureService = new PictureService('pictures/riddle/');
    }

    async createRiddle(formData: FormData) {
        this.riddle.id = crypto.randomUUID();
        this.riddle.pictureId = await this.pictureService.savePicture(formData.get('image'));

        this.riddle.text = this.getStringFromFormdata(formData, 'text')

        this.riddle.answers = [
            this.getStringFromFormdata(formData, 'answer1'),
            this.getStringFromFormdata(formData, 'answer2'),
            this.getStringFromFormdata(formData, 'answer3'),
            this.getStringFromFormdata(formData, 'answer4'),
        ];

        this.riddle.correctAnswerId = parseInt(this.getStringFromFormdata(formData, 'correctAnswer'))

        await this.saveRiddle();
    }

    private getStringFromFormdata(data: FormData, key: string) {
        const value = data.get(key);
        if (typeof value === "string") {
            return value;
        }

        return '';
    }


    async saveRiddle() {
        const riddles = await this.getData();

        riddles[this.riddle.id] = this.riddle;

        await this.setData(riddles);
    }

}
