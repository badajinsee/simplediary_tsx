# simpleDiary Ts로 리액트 해보기

기간 : 24년 1월 4일 ~ 24년 1월 11일

1. 다음부터 절때 tsx로 먼저 안만들거다.
2. jSX 로 전부 만든 후에 tsx로 바꾸자 ^ ^ ..

---

## useMemo , React.memo, useCallback 차이

- React는 컴포넌트를 렌더링 한 뒤, 이전 렌더된 결과와 비교하여 Dom 업데이트를 결정한다.
  상황에 따라 이 과정의 속도를 높이기 위해 React.memo를 사용 한다.

- useMemo는 메모이즈된 값을 return하는 hook이다.
  useMemo는 이전 값을 기억해두었다가 조건에 따라 재활용하여 성능을 최적화 하는 용도로 사용된다.

- useMemo 는 랜더링 과정 중에, useEffect 는 랜더링이 끝나고 나서 발동된다고 한다.

- useCallback은 리액트의 렌더링 성능을 위해서 제공되는 Hook이다.
  컴포넌트가 렌더링 될 때마다 내부적으로 사용된 함수가 새롭게 생성되는 경우,
  자식 컴포넌트에 Prop으로 새로 생성된 함수가 넘겨지게 되면 불필요한 리렌더링이 일어날 수 있다.

- 공통점 : 불필요한 렌더링 또는 연산 제어 용도로 성능 최적화 한다.

- 차이점 : Reac.memo 는 HOC(HOC란 컴포넌트를 인자로 받아서 새로운 컴포넌트를 return해주는 구조의 함수) 나머지는 hook이다.
- useMemo는 함수의 연산량이 많을때 이전 결과값을 재 사용하는 목적, useCallback은 함수가 재생성 되는걸 방지

[참고블로그\_1](https://develogger.kro.kr/blog/LKHcoding/112)
<Br/>
[참고블로그\_2](https://sunho-doing.tistory.com/entry/Reactjs-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94-useMemo-Reactmemo)
