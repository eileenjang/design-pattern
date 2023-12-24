/**
 * 상위 형식의 선언 (e.g. abstract class, interface)
 */
abstract class Animal {
    abstract makeSound(): void;
}

class Dog extends Animal {
    makeSound(): void {
        this.bark();
    }
    bark(): void {
        console.log('bowwow');
    }
}

class Cat extends Animal {
    makeSound(): void {
        this.meow();
    }
    meow(): void {
        console.log('meow');
    }
}

const dog = new Dog();
dog.makeSound(); // bowwow

const cat = new Cat();
cat.makeSound(); // meow
