/* eslint-disable*/
import "./App.css";

import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "sunjin",
    content: "선진 공부중이다1.",
    emotion: 1,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "sunjin2",
    content: "선진 공부중이다2.",
    emotion: 4,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "sunjin3",
    content: "선진 공부중이다3.",
    emotion: 5,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
