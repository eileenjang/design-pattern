## Command pattern
- 커맨드 패턴은 `호출 캡슐화`에 중점을 둔 패턴이다.
- 예를 들어, 리모컨 API 설계에 대해 생각해보면, 리모컨에는 ON/OFF 버튼뿐만 아니라 여러 클래스/메서드가 있으며 메서드가 추가될 수 있다. 
- 리모컨 버튼을 눌렀을 때 해야할 일을 처리하되, 어떤일을 수행하는지 자세한 내용을 모르도록 캡슐화한다.

## Command 객체
- 커맨드 객체는 특정 객체의 특정 작업 요청을 캡슐화한다.
- 각 버튼에 커맨드 객체를 저장하고, 클라이언트가 버튼을 눌렀을 때 커맨드 객체를 통해 작업을 처리하게 만든다.

### Command 인터페이스
- 커맨드 객체는 모두 같은 인터페이스를 사용하며 일반적으로 `excute()` 메서드를 사용한다.
```ts
interface Command {
  excute(): void;
}
```
### Command 클래스
- 클래스에는 `on()`과 `off()` 메서드가 있다.
```ts
// Command 객체이므로, 인터페이스를 구현
public class LightonCommand implements Command {
    // instance에 리시버 저장
    light: Light;
    // 생성자에 전등 정보 저장
    constructor(light: Light) {
      this.light = light;
    }
    // excute 메서드 실행시 light 객체(리시버)의 on 메서드 호출
    execute() {
        this.light.on();
    }
}
```
### Command 객체
```ts
public class RemoteControl {
  slot: Command;
  // 리모컨 명령을 바꾸고 싶을 때, 커맨드 객체를 바꿀 수 있다
  public setCommand(command: Command) {
    slot = command;
  }
  // 버튼이 눌려졌을 때, 커맨드 객체의 execute() 메서드가 호출된다.
  public buttomWasPressed() {
    slot.execute();
  }
}
```

### Test class
```ts
public class RemoteControlTest {
  public static main(args: string[]) {
    // remote 변수는 invoker역할
    // 필요한 작업을 요청할 때 사용할 커맨드 객체를 인자로 받을 예정
    const remote = new RemoteControl();
    // 요청을 받아 처리할 receiver인 Light 객체를 만든다
    const light = new Light();
    const lightOn = new LightonCommand(light);
    // 커맨드 객체를 invoker에 전달
    remote.setCommand(lightOn);
    // remote의 buttonWasPressed 메서드가 실행되면,
    // 커맨드 객체와 연결된 lightOn 객체의 execute() 메서드 실행
    remote.buttonWasPressed();
}
```
![image](https://github.com/eileenjang/design-pattern/assets/82510378/28bbaf77-7aeb-4f77-bd9e-ec658b2293a1)

- `Client`는 ConCreteCommand를 생성하고, Receiver를 설정한다.
- `Invoker`에는 명령이 들어있고, `execute()` 메서드를 호출하며 커맨드 객체에게 특정한 작업을 수행하라고 한다.
- `Command`는 모든 command 객체에서 구현해야하는 인터페이스이다.
- `ConcreteCommand`는 특정행동과 리시버를 연결해준다.
- `execute()` 메서드에는 리시버에 있는 메서드를 호출해 요청된 작업을 수행한다.
- `Receiver`는 요구 사항을 수행하기 위해 어떤 일을 해야하는지 알고 있는 객체이다.
