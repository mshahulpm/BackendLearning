
const USER_EVENTS = {
    USER_CREATED: 'user.created',
    USER_UPDATED: 'user.updated',
}

interface QuePublisher {
    publish(topic: string, data: any): void
}


class UserEventManager {

    constructor(
        private readonly quePublisher: QuePublisher
    ) { }

    userCreated(data: any) {
        // do required operation
        // ...
        this.quePublisher.publish(USER_EVENTS.USER_CREATED, data)
    }

    userUpdated(data: any) {
        this.quePublisher.publish(USER_EVENTS.USER_UPDATED, data)
    }

}