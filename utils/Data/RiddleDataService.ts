import {PictureService} from "@/utils/Picture/PictureService";
import {RiddleEntity, RiddleEntityInterface} from "@/utils/Data/Entity/RiddleEntity";
import prisma from "@/utils/Database/prisma";

export type DatasetRiddle = {
    id: number,
    title: string,
    score: number,
    question1: string,
    question2: string,
    question3: string,
    question4: string,
    correctAnswer: number,
    image_path: string | null,
    answer_status: string
}

export class RiddleDataService {

    private pictureService: PictureService;
    private _riddle: RiddleEntity = new RiddleEntity();

    constructor() {
        this.pictureService = new PictureService('public/pictures/riddle/');
    }

    async createRiddle(formData: FormData) {
        this._riddle.picturePath = await this.pictureService.savePicture(formData.get('image'));

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
        const data = {
            title: this._riddle.text,
            score: this._riddle.points,
            question1: this._riddle.answers[0],
            question2: this._riddle.answers[1],
            question3: this._riddle.answers[2],
            question4: this._riddle.answers[3],
            correctAnswer: this._riddle.correctAnswerId,
            image_path: this._riddle.picturePath,
            answer_status: this._riddle.answerStatus
        }

        let riddle: DatasetRiddle | null = null;

        if (this._riddle.id === -1) {
            riddle = await prisma.riddle.create({
                data: data
            })
            this._riddle.id = riddle.id;
            return;
        }

        await prisma.riddle.update({
            data: data,
            where: {
                id: this._riddle.id
            }
        })
    }

    async loadRiddle(id: number) {
        const riddle: DatasetRiddle | null = await prisma.riddle.findUnique({
            where: {
                id: id
            }
        })

        if (!riddle) {
            return;
        }

        this.convertDatasetToLokal(riddle);
    }

    get riddle(): RiddleEntityInterface {
        return this._riddle;
    }

    /**
     * @throws Error
     */
    async loadRandomRiddle() {
        const riddles: DatasetRiddle[] | null = await prisma.riddle.findMany({
            where: {
                answer_status: {
                    not: 'right'
                }
            }
        });

        if (!riddles || riddles.length === 0) {
            throw new Error('No riddle available');
        }

        const randomIndex = Math.floor(Math.random() * riddles.length);

        this.convertDatasetToLokal(riddles[randomIndex]);
    }

    private convertDatasetToLokal(dataset: DatasetRiddle) {
        this._riddle.id = dataset.id;
        this._riddle.text = dataset.title;
        this._riddle.points = dataset.score;
        this._riddle.answers = [
            dataset.question1,
            dataset.question2,
            dataset.question3,
            dataset.question4
        ];
        this._riddle.correctAnswerId = dataset.correctAnswer;
        this._riddle.picturePath = dataset.image_path;
        // @ts-ignore
        this._riddle.answerStatus = dataset.answer_status;
    }

    async getPoints() {
        const points = await prisma.riddle.aggregate({
            _sum: {
                score: true
            },
            where: {
                answer_status: 'right'
            }
        });

        return points._sum.score ?? 0;
    }
}
