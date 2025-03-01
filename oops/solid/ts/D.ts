/*
5. Dependency Inversion Principle (DIP):
Definition: High-level modules should not depend on low-level modules. Both should depend on abstractions. Additionally, abstractions should not depend on details. Details should depend on abstractions.

Explanation: This principle promotes loose coupling by ensuring that high-level modules (e.g., business logic) are not tightly coupled to low-level modules (e.g., database access). Instead, both depend on abstractions (e.g., interfaces).
*/

// following is the violation of this Dependency Inversion Principle 

class NotificationService {

    // the problem with this way we can not change the way of sending notification very easily such changing email to sms or using both
    sendEmail(message: string, from: string, to: string) {

    }
}

// The correct approach
interface NotificationSender {
    send(message: string, to: string): void
}

class NotificationService2 {
    constructor(private sender: NotificationSender) { }

    // example notification
    sendUserPassword(info: any) {
        this.sender.send("Your password is 6456353", info.to)
    }
}

// different senders

// Email
class EmailSender implements NotificationSender {

    constructor() {
        // configure some node mailer configuration
    }

    send(message: string, to: string): void {
        // sending email
    }
}

// SMS
class SmsSender implements NotificationSender {

    constructor() {
        // configure the sms sdk here
    }

    send(message: string, to: string): void {
        // send sms to user
    }
}

// usage 
const notificationServiceSms = new NotificationService2(new SmsSender())
const notificationServiceEmail = new NotificationService2(new EmailSender())
