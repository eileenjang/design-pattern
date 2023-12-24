import { Duck, ModelDuck } from "./Duck";
import { FlyRocketPowered } from "./Fly";

const model: Duck = new ModelDuck();

model.performFly(); // I can't fly
model.setFlyBehavior(new FlyRocketPowered());
model.performFly(); // I'm flying with a rocket!
