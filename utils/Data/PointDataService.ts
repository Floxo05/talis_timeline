import {BaseDataService} from "@/utils/Data/BaseDataService";

export type PointsData = Record<string, number>;

export class PointDataService extends BaseDataService<PointsData> {
    private readonly _key: string;
    constructor() {
        super('public/database/points.json');
        this._key = 'points'
    }

    public async incrementPoints(amount: number): Promise<void> {
        const currentPoints = await this.getData();
        currentPoints[this._key] = (currentPoints[this._key] || 0) + (amount || 0);
        await this.setData(currentPoints);
    }
}
