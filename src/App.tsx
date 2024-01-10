/* eslint-disable*/
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

import { Diary } from "./types";

interface ItType {
  email: string;
  body: string;
}

interface InitAction {
  type: "INIT";
  data: Diary[];
}

interface CreateAction {
  type: "CREATE";
  data: {
    author: string;
    content: string;
    emotion: number;
    id: number;
  };
}

interface RemoveAction {
  type: "REMOVE";
  targetId: number;
}

interface EditAction {
  type: "EDIT";
  targetId: number;
  newContent: string;
}

type Action = InitAction | CreateAction | RemoveAction | EditAction;

const reducer = (state: Diary[], action: Action): Diary[] => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data, // 70번째줄 데이터
        created_date,
      };
      return [newItem, ...state]; //원본 배열에 추가
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state; //값이 안바뀌게 설정
  }
};

function App() {
  // const [data, setData] = useState<Diary[]>([]);

  const [data, dispatch] = useReducer(reducer, []);

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
      dispatch({ type: "INIT", data: initData }); // type을 init으로 , 어떤 데이터 초기화 -> initdata
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback(
    (author: string, content: string, emotion: number) => {
      dispatch({
        type: "CREATE",
        data: { author, content, emotion, id: dataId.current++ },
      });
      // const created_date = new Date().getTime();
      // const newItem = {
      //   author,
      //   content,
      //   emotion,
      //   created_date,
      //   id: dataId.current,
      // };
      // dataId.current += 1;
      // setData((data) => [newItem, ...data]); //아이템을 추가한 데이터를 리턴
    },
    [] //빈 배열로 전송하면 new 아이템 추가하면 리스트에 하나만 남게됨 , 함수형 업데이트 사용
  );

  const onRemove = useCallback((targetId: number) => {
    dispatch({ type: "REMOVE", targetId });

    // const newDiaryList = data.filter((it) => it.id !== targetId);
    // setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback(
    (targetId: number, newContent: string) => {
      dispatch({ type: "EDIT", targetId, newContent });

      // setData((data) =>
      //   data.map((it) =>
      //     it.id === targetId ? { ...it, content: newContent } : it
      //   )
      // );
    },
    [dispatch]
  );

  // 감정 비율, usememo이용해서 리렌더링 줄이기
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); // 데이터 길이가 변화할때만 리렌더링

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
