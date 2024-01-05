/* eslint-disable*/
import { useRef, useState } from "react";
import styled from "styled-components";

const DiaryEditor = () => {
  const authorInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const hadleSubmit = () => {
    if (state.author.length < 1 && authorInput.current !== null) {
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5 && contentInput.current !== null) {
      contentInput.current.focus();
      return;
    }
    alert("일기 저장 완료");
  };

  return (
    <DiaryEditor_whole>
      <h2>오늘의 일기</h2>
      <div>
        <DiaryEditor_input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <DiaryEditor_textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <DiaryEditor_select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </DiaryEditor_select>
      </div>
      <div>
        <DiaryEditor_button onClick={hadleSubmit}>
          일기 저장하기
        </DiaryEditor_button>
      </div>
    </DiaryEditor_whole>
  );
};

export default DiaryEditor;

const DiaryEditor_whole = styled.div`
  border: 1px solid gray;
  text-align: center;
  padding: 20px;
`;

const DiaryEditor_input = styled.input`
  margin-bottom: 20px;
  width: 500px;
  padding: 10px;
`;

const DiaryEditor_textarea = styled.textarea`
  margin-bottom: 20px;
  width: 500px;
  padding: 10px;
  height: 150px;
`;

const DiaryEditor_select = styled.select`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
`;

const DiaryEditor_button = styled.button`
  width: 500px;
  padding: 10px;
  cursor: pointer;
`;
