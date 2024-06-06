import { Readable } from 'stream'

export class PrismaStream extends Readable {

    constructor(model, batchSize = 10000) {
        super({ objectMode: true });
        this.model = model;
        this.batchSize = batchSize;
        this.skip = 0;
        this.ended = false;
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

            data.forEach(item => this.push(item));
        } catch (err) {
            this.emit('error', err);
        }
    }
}
