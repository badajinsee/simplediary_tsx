/* eslint-disable*/
import styled from "styled-components";

import { Diary } from "./types";
import { DiaryDispatchContext } from "./App";
import React, { useContext, useEffect, useRef, useState } from "react";

const DiaryItem = (props: Diary) => {
  //일기의 수정 및 삭제 기능을 제어하는 함수들(onRemove, onEdit)을 DiaryDispatchContext에서 가져오는 역할
  const dispatch = useContext(DiaryDispatchContext);

  //dispatch가 undefined나 null 등 falsy한 값이면 에러를 발생시키는 코드
  if (!dispatch) {
    throw new Error("Cannot find DiaryDispatchContext");
  }

  //dispatch 객체에서 onRemove, onEdit 함수를 추출하는 구조 분해 할당
  const { onRemove, onEdit } = dispatch;

  useEffect(() => {
    console.log(`${props.id}번 째 아이템 렌더`);
  });
  // 기본값을 false로
  const [isEdit, setIsEdit] = useState(false);

  // false => true로 바꿔줌
  const toggleIsEdit = () => setIsEdit(!isEdit);

  // 수정폼에 저장 되는 부분
  const [localContent, setLocalContent] = useState(props.content);

  // 입력 안되었을때 포커싱
  const localContentInput = useRef<HTMLTextAreaElement>(null);

  // 수정하기 폼에서 수정취소하기 누르면 원래의 일기로 돌아가게 하기
  const handleQuitEdit = () => {
    setIsEdit(false); //수정하기 모드를 종료
    setLocalContent(props.content); //원상태로
  };

  // 수정 완료하기 버튼 눌렀을때 처리하는 부분
  const handleEdit = () => {
    if (localContent.length < 5 && localContentInput.current !== null) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${props.id}번 째 일기를 수정하시겠습니까?`))
      onEdit(props.id, localContent);
    toggleIsEdit();
  };

  const handleRemove = () => {
    if (
      props.id !== undefined &&
      window.confirm(`${props.id}번째 일기를 정말 삭제하시겠습니까?`)
    ) {
      onRemove(props.id);
    }
  };
  return (
    <DiaryItem_Container>
      <DiaryItem_Info>
        작성자 : {props.author} | 감정점수 : {props.emotion}
      </DiaryItem_Info>
      <br />
      <DiaryItem_Date>
        {new Date(props.created_date).toLocaleString()}
      </DiaryItem_Date>
      <DiaryItem_Content>
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setLocalContent(e.target.value)
              }
            />
          </>
        ) : (
          <>{props.content}</>
        )}
      </DiaryItem_Content>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </DiaryItem_Container>
  );
};

export default React.memo(DiaryItem);

const DiaryItem_Container = styled.div`
  background-color: rgb(240, 240, 240);
  margin-bottom: 10px;
  padding: 20px;
`;

const DiaryItem_Info = styled.span`
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const DiaryItem_Date = styled.span`
  color: gray;
`;

const DiaryItem_Content = styled.div`
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 30px;
`;
