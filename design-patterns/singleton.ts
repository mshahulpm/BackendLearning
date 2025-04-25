
class Sample {
    static instance: Sample
    private data: any[] = []

    private constructor() {

    }

    static getInstance() {
        if (this.instance) return this.instance
        this.instance = new Sample()
        return this.instance
    }

    addData(d: any) {
        this.data.push(d)
    }

    removeLast() {
        this.data.pop()
    }

    print() {
        console.log(this.data);
    }
}

// let s = new Sample()  // this will throw error because it is a singleton class
const s = Sample.getInstance()

s.addData(1)
s.print()
s.removeLast()
s.print()