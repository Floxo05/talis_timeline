import fs from 'fs';

export interface DataService<T> {
    getData: () => Promise<string>;
    setData: (data: T) => Promise<void>;
}

export class BaseDataService<T> implements DataService<T> {
    private readonly filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public async getData(): Promise<any> {
        try {
            const content = fs.readFileSync(this.filePath, 'utf8')
            return JSON.parse(content)
        } catch (e) {
            return {}
        }
    }

    public async setData(data: T): Promise<void> {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data));
        } catch (error) {
            console.error(`Error writing data to file (${this.filePath}):`, error);
        }
    }
}
