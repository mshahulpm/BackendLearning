// Double Linked List 

class DoubleLinkedList {

    constructor(value) {
        this.head = {
            value,
            next: null,
            previous: null
        }
        this.tail = this.head
        this.length = 1
    }

    append(value) {

        let newNode = {
            value,
            previous: this.tail,
            next: null
        }

        this.tail.next = newNode

        this.tail = newNode
        this.length++
    }

    prepend(value) {
        let newHead = {
            value,
            previous: null,
            next: this.head
        }

        this.head = newHead
        this.length++
    }

    printList() {
        let node = this.head
        let values = []
        while (node) {
            values.push(node.value)
            node = node.next
        }
        console.log(values);
    }

    insert(index, value) {

        if (index === 0) {
            this.prepend(value)
        }
        else if (index === this.length) {
            this.append(value)
        }
        else if (index > 0 && index < this.length) {
            let node = this.head
            let i = 0
            while (i < index) {
                if (i === index - 1) {
                    let nextNode = node.next
                    let newNode = {
                        value,
                        previous: node,
                        next: node.next
                    }
                    node.next = newNode
                    nextNode.previous = node
                    this.length++
                }
                node = node.next
                i++
            }
        }
    }

    remove(index) {

        if (index === 0) {
            this.head = this.head.next
            this.head.previous = null
        }

        else if (index > 0 && index < this.length) {
            let node = this.head
            let i = 0
            while (i <= index) {
                if (i === index) {
                    let nextNode = node.next
                    let prevNode = node.previous
                    if (nextNode) nextNode.previous = prevNode
                    prevNode.next = nextNode

                    // handling tail 
                    if (index === this.length - 1) {
                        this.tail = prevNode
                    }
                    break;
                }
                node = node.next
                i++
            }
        }

        else {
            return false
        }

        this.length--

    }

    reverse() {
        let first = this.head
        let second = this.head.next
        this.tail = this.head

        while (second) {
            let temp = second.next
            second.next = first
            first = second
            second = temp
        }

        this.head.next = null
        this.head = first
    }

}


let ll = new DoubleLinkedList(10)
console.log(ll);
ll.append(12)
console.log(ll);
ll.append(56)
ll.prepend(46)
ll.insert(4, 33)
// ll.remove(3)
ll.printList()
ll.reverse()
ll.printList()
console.log(ll.tail.value);
