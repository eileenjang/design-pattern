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
