import {BaseDataService} from "@/utils/Data/BaseDataService";

export type RiddleData = Record<string, object>;

export class RiddleDataService extends BaseDataService<RiddleData> {
    constructor() {
        super('database/riddle.json');
        this._loadRiddles()
    }

    createRiddle(formData: FormData) {
        const pictureId = this.savePicture(formData.get('image'));
    }

    private _loadRiddles() {

    }


    private savePicture(image: FormDataEntryValue | null) {

    }
}
