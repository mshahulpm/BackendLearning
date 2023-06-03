
class MyArray {
    constructor() {
        this.length = 0
        this.data = {}
    }

    get(index) {
        return this.data[index]
    }

    push(item) {
        this.data[this.length] = item
        this.length++
        return this.length
    }

    pop() {
        let last_item = this.data[this.length - 1]
        delete this.data[this.length - 1]
        this.length--
        return last_item
    }

    remove(index) {
        const item_toRemove = this.data[index]
        if (!item_toRemove) return
        this.shift(index)

        return item_toRemove
    }

    shift(index) {
        for (var i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1]
        }
        delete this.data[this.length - 1]
        this.length--
    }
}


const arr = new MyArray()
arr.push(19)
arr.push(56)
arr.push('shahul 1')
arr.push('shahul 2')

console.log(arr)

arr.remove(1)

console.log(arr)

const string = 'shahul';

console.log(
    string.repeat(2),
    string
)
