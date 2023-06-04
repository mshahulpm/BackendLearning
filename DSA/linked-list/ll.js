/*
   a linked list of following 
   12 --> 15 --> 20 
*/

const my_linked_list = {
    head: {
        value: 12,
        next: {
            value: 15,
            next: {
                value: 20,
                next: null
            }
        }
    }
}


//  Linked list constructor 

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor(value) {
        this.head = {
            value: value,
            next: null
        }
        this.tail = this.head
        this.length = 1
    }

    append(value) {

        const newNode = new Node(value)

        this.tail.next = newNode
        this.tail = this.tail.next
        this.length++
    }

    prepend(value) {
        const newNode = new Node(value)
        newNode.next = this.head
        this.head = newNode
        this.length++
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
            let i = 1
            while (i < index) {

                if (i === index - 1) {
                    node.next = {
                        value,
                        next: node.next
                    }
                    this.length++
                }

                i++
                node = node.next

            }

        }

        else {
            return false
        }

    }

    get(index) {

        if (index >= this.length) return

        let i = 0
        let node = this.head
        while (i <= index) {
            if (i === index) {
                return node.value
            }
            i++
            node = node.next
        }

    }

    remove(index) {

        if (index === 0) {
            this.head = this.head.next
            this.length--
        }

        else if (index > 0 && index < this.length) {

            let node = this.head
            let i = 0
            while (i < index) {

                if (i === index - 1) {
                    node.next = node.next.next

                    // handling tail
                    if (index === this.length - 1) {
                        this.tail = node
                    }

                    this.length--

                }

                i++
                node = node.next

            }

        }

        else {
            return false
        }

        return true

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

    printList() {
        let node = this.head
        let values = []
        while (node) {
            values.push(node.value)
            node = node.next
        }
        console.log(values);
    }

}

const ll = new LinkedList(10)
ll.printList()

ll.append(2)
ll.printList()

ll.prepend(45)
ll.printList()

ll.insert(2, 16)
ll.insert(2, 16)
ll.printList()
console.log(
    ll.get(9)
);

ll.remove(4)
ll.remove(3)
ll.printList()
console.dir(ll.tail, { depth: true })
ll.reverse()
ll.printList()
console.dir(ll.tail, { depth: true })
