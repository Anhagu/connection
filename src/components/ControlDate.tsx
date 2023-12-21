import React, { useState } from 'react';
import styled from 'styled-components';

// Props 타입 지정
interface Props {
    // 현재 날짜
    nowDate: Date;
    setNowDate: React.Dispatch<React.SetStateAction<Date>>;
    checkHoliday: boolean
    setCheckHoliday: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlDate = ({ nowDate, setNowDate, checkHoliday, setCheckHoliday }: Props) => {
    // 공휴일 뷰 체크박스 함수
    
    const viewHollyday = () => {
        setCheckHoliday(!checkHoliday);
    }

    // 연도를 변경하는 함수 정의
    const changeYear = (change: number) => {
        const date = new Date(nowDate.getTime());
        date.setFullYear(date.getFullYear() + change);
        setNowDate(date);
    };

    // 월을 변경하는 함수 정의
    const changeMonth = (change: number) => {
        const date = new Date(nowDate.getTime());
        date.setMonth(date.getMonth() + change);
        setNowDate(date);
    };


    return (
        <Container>
            {/* 현재 연도와 월을 표시하는 제목 */}
            <YearAndMonth><h1>{`${nowDate.getFullYear()}.${nowDate.getMonth() + 1}`}</h1></YearAndMonth>

            {/* 공휴일 view 버튼 */}
            <HolidayBtn>
                <input onClick={viewHollyday} type='checkbox'></input>
            </HolidayBtn>

            {/* 이전 연도, 이전 월 버튼 */}
            <BtnBox>
                <button onClick={() => changeYear(-1)}>{`<<`}</button>
                <button onClick={() => changeMonth(-1)}>{`<`}</button>
                <button onClick={() => changeMonth(1)}>{`>`}</button>
                <button onClick={() => changeYear(1)}>{`>>`}</button>
            </BtnBox >

            {/* 다음 월, 다음 연도 버튼 */}
            {/* <BtnBox>
                <button onClick={() => changeMonth(1)}>{`>`}</button>
                <button onClick={() => changeYear(1)}>{`>>`}</button>
            </BtnBox > */}
        </Container >
    );
};

// 스타일 컴포넌트
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 15%;
`;

const YearAndMonth = styled.div`
`;

const HolidayBtn = styled.div`
    
`;

const BtnBox = styled.div`
button {
    width: 30px;
    margin: 1px;
    border: 0;
    background-color: white;

    &:active {
        background-color: gray;
    }
}
`;

export default ControlDate