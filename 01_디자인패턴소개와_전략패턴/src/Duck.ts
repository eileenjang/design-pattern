import { FlyBehavior, FlyWithWings, FlyNoWay } from "./Fly";
import { QuarkBehavior, Quark, MuteQuark } from "./Quark";

export abstract class Duck {
    constructor(
        private flyBehavior: FlyBehavior,
        private quackBehavior: QuarkBehavior

    ) {
        this.flyBehavior = flyBehavior;
        this.quackBehavior = quackBehavior;
    }

    display(): void {
        console.log("I'm a duck");
    }

    performFly(): void {
        this.flyBehavior.fly();
    }

    performQuark(): void {
        this.quackBehavior.quark();
    }

    setFlyBehavior(flyBehavior: FlyBehavior): void {
        this.flyBehavior = flyBehavior;
    }

    setQuarkBehavior(quarkBehavior: QuarkBehavior): void {
        this.quackBehavior = quarkBehavior;
    }
}

export class MallardDuck extends Duck {
    constructor() {
        super(new FlyWithWings(), new Quark());
    }

    display(): void {
        console.log("I'm a Mallard Duck");
    }
}

export class ModelDuck extends Duck {
    constructor() {
        super(new FlyNoWay(), new MuteQuark());
    }

    display(): void {
        console.log("I'm a Model Duck");
    }
}
