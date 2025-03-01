
// 
// method over loading in TS is working little bit differently
class JavaMethodOverLoading {

    display(): void
    display(name: string): void

    display(name?: string) {
        if (name) console.log("Hi " + name);
        else console.log("Hi")
    }

}

class JavaMethodOverLoadingWithoutTyping {

    display(name?: string): void {
        if (name) {
            console.log(`Hi ${name}`);
        } else {
            console.log("display");
        }
    }
}