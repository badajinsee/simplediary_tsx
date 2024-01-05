/* eslint-disable*/
import styled from "styled-components";

import { Diary } from "./types";

interface DiaryProps extends Diary {}

const DiaryItem = (props: DiaryProps) => {
  return (
    <DiaryItem_Container>
      <DiaryItem_Info>
        작성자 : {props.author} | 감정점수 : {props.emotion}
      </DiaryItem_Info>
      <br />
      <DiaryItem_Date>
        {new Date(props.created_date).toLocaleString()}
      </DiaryItem_Date>
      <DiaryItem_Content>{props.content}</DiaryItem_Content>
    </DiaryItem_Container>
  );
};

export default DiaryItem;

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
