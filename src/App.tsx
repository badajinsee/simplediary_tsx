/* eslint-disable*/
import { useEffect, useRef, useState } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

import { Diary } from "./types";

// const dummyList = [
//   {
//     id: 1,
//     author: "sunjin",
//     content: "선진 공부중이다1.",
//     emotion: 1,
//     created_date: new Date().getTime(),
//   }
// ];

interface ItType {
  email: string;
  body: string;
}

function App() {
  const [data, setData] = useState<Diary[]>([]);

  const dataId = useRef(0);

  const getData = async () => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      ).then((res) => res.json());

      const initData = res.slice(0, 20).map((it: ItType) => {
        return {
          author: it.email,
          content: it.body,
          emotion: Math.floor(Math.random() * 5) + 1,
          id: dataId.current++,
        };
      });
      setData(initData);
    } catch (error) {
      console.log(error);
    }
  };

  //   const initData = res.slice(0, 20).map((it: ItType) => {
  //     return {
  //       author: it.email,
  //       content: it.body,
  //       emotion: Math.floor(Math.random() * 5) + 1,
  //       id: dataId.current++,
  //     };
  //   });
  //   setData(initData);
  // };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author: string, content: string, emotion: number) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId: number): void => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId: number, newContent: string): void => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
