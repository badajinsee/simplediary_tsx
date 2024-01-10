/* eslint-disable*/
// 실습용 테스트

import React, { useEffect, useState } from "react";

// interface TC {
//   text: string;
//   count: number;
// }

// const Textview = React.memo(({ text }: Pick<TC, "text">) => {
//   useEffect(() => {
//     console.log(`update::text : ${text}`);
//   });
//   return <div>{text}</div>;
// });

// const CountView = React.memo(({ count }: Pick<TC, "count">) => {
//   useEffect(() => {
//     console.log(`update::count : ${count}`);
//   });
//   return <div>{count}</div>;
// });

interface CO {
  count: number;
  obj: { count: number };
}

const CounterA = React.memo(({ count }: Pick<CO, "count">) => {
  useEffect(() => {
    console.log(`counterA update - count: ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = React.memo(({ obj }: Pick<CO, "obj">) => {
  useEffect(() => {
    console.log(`counterB update - count: ${obj}`);
  });
  return <div>{obj.count}</div>;
});

const areEqual = (prevProps: Pick<CO, "obj">, nextProps: Pick<CO, "obj">) => {
  // return true  // 이전 프롭스 현재 프롭스가 같다 -> 리랜더링을 일으키지 않게된다
  // return false // 이전 과 현재가 다르다 -> 리렌더링을 일으키라

  // if (prevProps.obj.count === nextProps.obj.count) {
  //   return true;
  // }
  // return false;

  return prevProps.obj.count === nextProps.obj.count;
};

// counterB 가 equal 함수의 판단에 따라 리렌더링 할지 말지 결정하게 되는 컴포넌트
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  // const [text, setText] = useState("");
  const [obj, setObj] = useState({
    count: 1,
  }); // 객체 얕은비교
  return (
    <div style={{ padding: 50 }}>
      {/* <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}

      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
