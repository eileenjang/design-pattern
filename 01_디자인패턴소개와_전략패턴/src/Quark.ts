export interface QuarkBehavior {
    quark(): void;
}

export class Quark implements QuarkBehavior {
    quark(): void {
        console.log("Quark");
    }
}

export class MuteQuark implements QuarkBehavior {
    quark(): void {
        console.log("...");
    }
}
