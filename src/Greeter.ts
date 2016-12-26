export class Human {
    public Hi() {}
}

export class Greeter extends Human {
    public Hello(name:string):void {
        console.log("Hello " + name);
    }
}