/* eslint-disable*/
import styled from "styled-components";

import DiaryItem from "./DiaryItem";
import { useContext } from "react";
import { DiaryStateContext } from "./App";

const Diarylist = () => {
  // React의 Context API를 사용하여 일기 목록 상태(diaryList)를 가져오는 역할
  const diaryList = useContext(DiaryStateContext);

  //diaryList가 undefined나 null 등 falsy한 값일 때 렌더링을 중단하고 null을 반환하는 코드
  if (!diaryList) {
    return null;
  }

  return (
    <DiaryList_Container>
      <DiaryList_Title>일기 리스트</DiaryList_Title>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </DiaryList_Container>
  );
};

Diarylist.defaultProps = {
  diaryList: [],
};

export default Diarylist;

const DiaryList_Container = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin-top: 20px;
`;

const DiaryList_Title = styled.h2`
  text-align: center;
`;
