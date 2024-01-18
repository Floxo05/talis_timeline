import {PictureEntity} from "@/utils/Picture/Entity/PictureEntity";
import * as crypto from "crypto";
import fs from "fs";

export class PictureService {

    private picture: PictureEntity = new PictureEntity();
    private readonly filePath: string;


    constructor(filePath: string) {
        this.filePath = filePath;
    }

    async savePicture(image: FormDataEntryValue | null, ) {
        if (!(image instanceof File)) {
            return '-1';
        }

        this.picture.id = crypto.randomUUID();
        this.picture.path = this.filePath + this.picture.id + this.getFileType(image);

        await this.savePictureToFs(image)

        //remove public to make loading easier
        return this.picture.path.replace('public', '');
    }

    private getFileType(image: File) {
        const filename = image.name;
        return filename.substring(filename.lastIndexOf("."));
    }

    private async savePictureToFs(image: File) {
        const imageBuffer = await image.arrayBuffer();
        fs.writeFile(this.picture.path, Buffer.from(imageBuffer), (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
}