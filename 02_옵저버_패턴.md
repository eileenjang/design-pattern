# 객체들에게 연락돌리기 - 옵저버 패턴

- 뭔가 중요한 일이 일어났을 때 객체에게 `새 소식`을 알려줄 수 있는 패턴.
- 2장에서는 `일대다 관계`나 `느슨한 결합`과 관련된 내용을 배울 것이다.

## 가상 모니터링 애플리케이션 알아보기

- 시스템은 기상 스테이션 (실제 기상 정보 수집) + WeatherData 객체 (기상 스테이션으로부터 오는 정보를 추적하는 객체) + 사용자에게 현재 기상조건을 보여주는 디스플레이 장비로 구성됨

## WeatherData 클래스 살펴보기

- WeatherData 클래스에 존재하는 메서드
  - getTemperature()
  - getHumidity()
  - getPressure()
  - measurementsChanged() <- WeatherData에서 갱신된 값을 가져올 때마다 호출됨 (우리가 수정해야 하는 메서드)

## 구현 목표

- WeatherData 클래스에는 온도, 습도, 기압 게터 메서드가 있음
- 새로운 기상 측정 데이터가 들어올 때마다 measurementsChanged()가 호출됨
- 현재 조건 디스플레이, 기상 통계 디스플레이, 기상 예보 디스플레이를 갱신해야 함
- 이를 measurementsChanged()에 추가해야 함
- 추가적인 목표
  - 확장성

## 기상 스테이션용 코드 추가하기

```ts
class WeatherData {
  // ...

  measurementsChanged() {
    const temp = this.getTemperature();
    const humidity = this.getHumidity();
    const pressure = this.getPressure();

    // 아래는 바뀔 수 있는 부분 -> 캡슐화 필요
    this.conditionDisplay.update(temp, humidity, pressure);
    this.statisticsDisplay.update(temp, humidity, pressure); 
    this.forecastDisplay.update(temp, humidity, pressure); 
  }
}
```

## 옵저버 패턴의 정의

- 신문사는 주제(subject), 구독자는 옵저버(observer)
- 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체에게 연락이 가고 자동으로 내용이 갱신되는 방식으로 일대다 의존성을 정의한다.
- 옵저버 패턴은 보통 주제 인터페이스와 옵저버 인터페이스가 들어있는 클래스로 구현함

## 옵저버 패턴의 구조

- 
