// import fs from 'fs';
// export interface DataService<T> {
//     getData: () => Promise<T>;
//     setData: (data: T) => Promise<void>;
// }
//
// export class BaseDataService<T> implements DataService<T> {
//     private readonly filePath: string;
//
//     constructor(filePath: string) {
//         this.filePath = filePath;
//     }
//
//     // public async getData(): Promise<T> {
//     //     try {
//     //         const content = await import(this.filePath)
//     //         return JSON.parse(content);
//     //     } catch (error) {
//     //         // Return an empty object if the file does not exist or there is an error
//     //         return {} as T;
//     //     }
//     // }
//     //
//     // public async setData(data: T): Promise<void> {
//     //     try {
//     //         fs.writeFileSync(this.filePath, JSON.stringify(data));
//     //     } catch (error) {
//     //         console.error(`Error writing data to file (${this.filePath}):`, error);
//     //     }
//     // }
// }
