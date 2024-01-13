## Factory pattern
객체의 인스턴스를 만드는 작업이 항상 `공개되어야 하는 것은 아니며`, 공개 시 결합 문제가 생길 수 있다는 사실을 배울 예정이다.
팩토리 패턴으로 `불필요한 의존성을 없애서` 결합문제를 해결해보자.

```ts
const duck: Duck = new MallardDuck();
```

```ts
let duck: Duck;
if (picnic) {
  duck = new MallardDuck();
} else if (hunting) {
  duck = new DecoyDuck();
} else if (inBathTub) {
  duck = new RubberDuck();
}
```

위와 같은 구상 클래스가 있다면, 어쩔 수 없이 인스턴스의 형식은 실행 시에 주어진 조건에 따라 결정된다.
따라서 코드 변경, 확장 시 관리와 갱신이 어려워 오류가 생길 가능성이 커진다.

### new에 어떤 문제가 있는 걸까?

변화하는 무언가 때문에 'new'를 조심해서 사용하는 것!

```ts
const orderPizza = (type: string) => {
  let pizza: Pizza;
  if (type === "cheese") {
    pizza = new CheesePizza();
  } else if (type === "pepperoni") {
    pizza = new PepperoniPizza();
  } else if (type === "clam") {
    pizza = new ClamPizza();
  } else if (type === "veggie") {
    pizza = new VeggiePizza();
  }
  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();
  return pizza;
};
```
위 코드의 문제점은 `코드 변경에 닫혀있지 않다`는 점.
인스턴스를 만드는 구상 클래스를 선택하는 부분을 `캡슐화`해야 함.

### 객체 생성 팩토리 만들기

```ts
class SimplePizzaFactory {
  createPizza (type: string): Pizza {
    let pizza: Pizza;

    if (type === "cheese") {
      pizza = new CheesePizza();
    } else if (type === "pepperoni") {
      pizza = new PepperoniPizza();
    } else if (type === "clam") {
      pizza = new ClamPizza();
    } else if (type === "veggie") {
      pizza = new VeggiePizza();
    }
    return pizza;
  }
}
```

```ts
class PizzaStore {
  private factory: SimplePizzaFactory;
  constructor(factory: SimplePizzaFactory) {
    this.factory = factory;
  }
  orderPizza(type: string) {
    let pizza: Pizza;
    const pizza = this.factory.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }
}
```

- 캡슐화의 장점?

orderPizza() 메소드 뿐만 아니라 피자 객체를 받아서 피자를 설명하거나 가격을 알려주는 클래스에서도 사용 가능함.
팩토리 클래스로 캡슐화해 놓으면 팩토리 클래스 하나만 고치면 된다.

- 간단한 팩토리의 조건?
1 Pizza 인터페이스를 구현해야 함
2 구상 클래스여야 함

### 간단한 팩토리의 정의

Simple Factory는 디자인 패턴이라기 보다, 프로그래밍에서 자주 쓰이는 관용구에 가깝다.

### 피자 가게 프레임워크 만들기

각 지점마다 그 지역의 특성과 입맛을 반영한 다양한 스타일의 피자를 만들어야 한다.
뉴욕 스타일, 시카고 스타일, 캘리포니아 스타일, etc.
결국 PizzaStore와 피자 제작 코드 전체를 하나로 묶어주는 프레임워크를 만들어야 한다.

```ts
const nyFactory = new NYPizzaFactory();
nyStore = new PizzaStore(nyFactory);
nyStore.orderPizza("cheese");

const chicagoFactory = new ChicagoPizzaFactory();
chicagoStore = new PizzaStore(chicagoFactory);
chicagoStore.orderPizza("cheese");
```
공통 팩토리 : orderPizza(type: string) method -> 내부에서 createPizza(type) method 사용
각 지점별 팩토리 : abstract createPizza(type: string) 추상 method

```ts
abstract class PizzaStore {
  abstract createPizza(type: string); // 팩토리 객체 대신 이 메서드 사용
  public orderPizza(type: string) {
    let pizza: Pizza;
    pizza = this.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }
}
```

orderPizza() method는 서브클래스에서 무슨 일이 일어나는지 `알지 못하며` 그저 완성된 피자를 받아서 주문을 처리함
-> orderPizza()가 보기에 피자 종류를 `서브클래스에서 결정`해서 전달해 주는 것 같다

![image](https://github.com/eileenjang/design-pattern/assets/82510378/7aef9435-554a-43f0-862b-1d04c3780cc2)

### 서브클래스 만들기

```ts
class NYPizzaStore extends PizzaStore {
  createPizza(item: string): Pizza { // 추상메서드는 구상클래스에서 반드시 구현해야 함
    if (type === "cheese") {
      return new NYStyleCheesePizza();
    } else if (type === "veggie") {
      return new NYStyleVeggiePizza();
    } else if (type === "clam") {
      return new NYStyleClamPizza();
    } else if (type === "pepperoni") {
      return new NYStylePepperoniPizza();
    } else return null;
  }
}
```
### Pizza 클래스 만들기



