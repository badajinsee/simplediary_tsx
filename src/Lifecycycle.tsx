/**
 * mount = 화면에 나타나는 것
 * update = 업데이트(리렌더)
 * unmount = 화면에서 사라짐
 */

import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("mount");

    return () => {
      // unmount 시점에 실행되게 됨
      console.log("unmount!");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const LifeCycle = () => {
  const [isVisiavle, setIsVisiable] = useState(false);
  const toggle = () => setIsVisiable(!isVisiavle);
  // const [count, setCount] = useState(0);
  // const [text, setText] = useState("");

  // useEffect(() => {
  //   console.log("mount!");
  // }, []);

  // // 업데이트가 된 순간에 하고싶은일이 있을때 dependency array 사용 x
  // useEffect(() => {
  //   console.log("update");
  // });

  // useEffect(() => {
  //   console.log(`count is update: ${count}`);
  //   if (count > 5) {
  //     alert("count가 5를 넘었습니다 따라서 1로 초기화 합니다");
  //     setCount(1);
  //   }
  // }, [count]);

  // useEffect(() => {
  //   console.log(`text is update: ${text}`);
  // }, [text]);

  return (
    <div style={{ padding: 20 }}>
      {/* <div>
        {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div> */}

      <button onClick={toggle}>on/off</button>
      {isVisiavle && <UnmountTest />}
    </div>
  );
};

export default LifeCycle;
