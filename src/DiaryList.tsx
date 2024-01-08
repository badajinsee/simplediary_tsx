/* eslint-disable*/
import styled from "styled-components";

import DiaryItem from "./DiaryItem";
import { Diary } from "./types";

interface DiaryListProps {
  diaryList: Diary[];
  onRemove: (targetId: number) => void;
  onEdit: (targetId: number, newContent: string) => void;
}

const Diarylist = ({ diaryList, onRemove, onEdit }: DiaryListProps) => {
  return (
    <DiaryList_Container>
      <DiaryList_Title>일기 리스트</DiaryList_Title>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit} />
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
