import { Readable } from 'stream'

export class PrismaStream extends Readable {

    private model: any
    private batchSize: number;
    private skip = 0;
    private ended = false;

    constructor(model: any, batchSize = 10000) {

        super({ objectMode: true });
        this.model = model;
        this.batchSize = batchSize;
    }

    async _read() {

        if (this.ended) return this.push(null);

        try {
            const data = await this.model.findMany({
                orderBy: { id: 'asc' },
                take: this.batchSize,
                skip: this.skip
            });

            if (data.length === 0) {
                this.ended = true;
                return this.push(null);
            }

            this.skip += this.batchSize

            data.forEach((item: any) => this.push(item));
        } catch (err) {
            this.emit('error', err);
        }
    }
}
