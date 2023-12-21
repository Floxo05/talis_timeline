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
            throw new Error('Image is not a file')
        }

        this.picture.id = crypto.randomUUID();
        this.picture.path = this.filePath + this.picture.id + this.getFileType(image);

        await this.savePictureToFs(image)

        return this.picture.id;
    }

    private getFileType(image: File) {
        const filename = image.name;
        return filename.substring(filename.lastIndexOf("."));
    }

    private async savePictureToFs(image: File) {
        const imageBuffer = await image.arrayBuffer();
        await fs.writeFile(this.picture.path, Buffer.from(imageBuffer), (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
}