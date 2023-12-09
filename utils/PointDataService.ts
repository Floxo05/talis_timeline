// // utils/PointsService.ts
//
// import {BaseDataService} from "@/utils/BaseDataService";
//
// export type PointsData = Record<string, number>;
//
// export class PointDataService extends BaseDataService<PointsData> {
//     constructor() {
//         super('points.json');
//     }
//
//     public async incrementPoints(key: string, amount: number): Promise<void> {
//         const currentPoints = await this.getData();
//         currentPoints[key] = (currentPoints[key] || 0) + amount;
//         await this.setData(currentPoints);
//     }
// }
