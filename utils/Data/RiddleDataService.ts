import {PictureService} from "@/utils/Picture/PictureService";
import {RiddleEntity, RiddleEntityInterface} from "@/utils/Data/Entity/RiddleEntity";
import {PrismaClient} from "@prisma/client";

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
        this.pictureService = new PictureService('picture/riddle/');
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
        const prisma = new PrismaClient();

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
        } else {
            await prisma.riddle.update({
                data: data,
                where: {
                    id: this._riddle.id
                }
            })
        }

        prisma.$disconnect();
    }

    async loadRiddle(id: number, where: object = {}) {
        const prisma = new PrismaClient();

        const riddle: DatasetRiddle | null = await prisma.riddle.findUnique({
            where: {
                id: id,
                ...where
            }
        })

        if (!riddle) {
            return;
        }

        this.convertDatasetToLokal(riddle);

        prisma.$disconnect();
    }

    get riddle(): RiddleEntityInterface {
        return this._riddle;
    }

    async loadRandomRiddle() {
        const prisma = new PrismaClient();

        const riddles: DatasetRiddle[] | null = await prisma.riddle.findMany({
            where: {
                answer_status: {
                    not: 'right'
                }
            }
        });

        if (!riddles) {
            return;
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
}
