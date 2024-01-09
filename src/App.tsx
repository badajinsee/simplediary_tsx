/* eslint-disable*/
import { useEffect, useMemo, useRef, useState } from "react";

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

  // 감정 비율, usememo이용해서 리랜더링 줄이기
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); // 데이터 길이가 변화할때만 리랜더링

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기 : {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율 {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
