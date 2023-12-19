import React from 'react';
import styled, { css } from 'styled-components';
import { Holiday } from '../types/type';

// AllDay 컴포넌트의 스타일을 지정하는 Container 스타일드 컴포넌트를 정의
interface ContainerProps {
    sameMonth: boolean;
    sameDay: boolean;
    clickDay: boolean;
    isHoliday: boolean;
}

// AllDay 컴포넌트에 전달되는 Props를 정의
interface Props {
    day: Date;
    nowDate: Date;
    setNowDate: React.Dispatch<React.SetStateAction<Date>>;
    clickedDate: Date | undefined;
    setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    isHoliday: boolean;
    holiday: Holiday[];
}

// AllDay 컴포넌트 정의 (DateBox 컴포넌트에서 map함수에 의해 해당 달의 첫날부터 마지막 날까지 호출됨)
const AllDay = ({ day, nowDate, setNowDate, clickedDate, setClickedDate, isHoliday, holiday }: Props) => {
    // 현재 시간
    const nowTime = new Date();

    // 현재 날짜와 표시할 날짜가 같은 달에 속하는지 여부를 확인 (이전달과 다음달 일부분 날짜의 폰트 조절의 위해)
    const sameMonth = nowDate.getMonth() === day.getMonth();

    // 현재 날짜와 표시할 날짜가 동일한 날인지 여부를 확인 (오늘 날짜를 표시하기 위해)
    const sameDay = 
        nowTime.getFullYear() === day.getFullYear() &&
        nowTime.getMonth() === day.getMonth() &&
        nowTime.getDate() === day.getDate();

    // 클릭된 날짜인지 여부를 확인합니다.
    const clickDay: boolean = clickedDate
        ? clickedDate.getFullYear() === day.getFullYear() &&
        clickedDate.getMonth() === day.getMonth() &&
        clickedDate.getDate() === day.getDate()
        : false;

    // 클릭된 날짜를 업데이트하는 함수
    const clickDate = () => {
        setClickedDate(day);
    };

    // 휴일의 날짜를 문자열로 변환하여 저장합니다.
    const holidayLocDate = holiday.map((data: Holiday) => {
        return String(data?.locdate);
    })

    // 현재 날짜가 공휴일인지 확인
    const isCurrentDateHoliday = holidayLocDate.includes(
        `${day.getFullYear()}${('0' + (day.getMonth() + 1)).slice(-2)}${('0' + day.getDate()).slice(-2)}`
    );

    // 현재 날짜의 공휴일 이름 찾기
    const holidayInfo = holiday.find(
        (data: Holiday) => String(data?.locdate) === `${day.getFullYear()}${('0' + (day.getMonth() + 1)).slice(-2)}${('0' + day.getDate()).slice(-2)}`
    );

    return (
        <Container
            onClick={clickDate}
            sameMonth={sameMonth}
            sameDay={sameDay}
            clickDay={clickDay}
            isHoliday={isHoliday}
        >
            <p>{day.getDate()}</p>
            <p>일</p>
            <p>{isCurrentDateHoliday && ` ${holidayInfo?.dateName}`}</p>
        </Container>
    )
}

const Container = styled.div<ContainerProps>`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid gray;

    &:hover {
        background-color: gray;
    }

    p {
        padding: 5px;
        font-weight: ${({ sameMonth }) => (sameMonth ? "700" : "300")};
        
        &:first-child {
            ${({ sameDay }) =>
                sameDay
                    ? css`
                        color: white;
                        border-radius: 50%;
                        background-color: #ff2e16;
                    `
                    : css``}
        }

        ${({ clickDay }) =>
        clickDay
            ? css`
                    border: 1px solid skyblue;
                `
            : css``}
        
        ${({ isHoliday }) => {
        if (isHoliday) {
            return css`
                    color: red;
                `;
        }
    }}
    }
`;

export default AllDay