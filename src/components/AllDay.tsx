import React from 'react';
import styled, { css } from 'styled-components';
import { Holiday } from '../types/type';

interface ContainerProps {
    sameMonth: boolean;
    sameDay: boolean;
    clickDay: boolean;
    isHoliday: boolean;
}

const Container = styled.div<ContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;

    &:hover {
        background-color: gray;
    }

    p {
        padding: 5px;
        font-weight: ${({ sameMonth }) => (sameMonth ? "700" : "300")};
        
        ${({ sameDay }) =>
        sameDay
            ? css`
                color: white;
                background-color: blue;
            `
            : css``}

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

interface Props {
    day: Date;
    nowDate: Date;
    setNowDate: React.Dispatch<React.SetStateAction<Date>>;
    clickedDate: Date | undefined;
    setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    isHoliday: boolean;
    holiday: Holiday[];
}

const AllDay = ({
    day,
    nowDate,
    setNowDate,
    clickedDate,
    setClickedDate,
    isHoliday,
    holiday,
}: Props) => {
    const nowTime = new Date();

    const sameMonth = nowDate.getMonth() === day.getMonth();
    const sameDay =
        nowTime.getFullYear() === day.getFullYear() &&
        nowTime.getMonth() === day.getMonth() &&
        nowTime.getDate() === day.getDate();

    const clickDay: boolean = clickedDate
        ? clickedDate.getFullYear() === day.getFullYear() &&
        clickedDate.getMonth() === day.getMonth() &&
        clickedDate.getDate() === day.getDate()
        : false;

    const clickDate = () => {
        setClickedDate(day);
    };

    const holidayLocDate = holiday.map((data:Holiday) => {
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
            <p>{day.getDate()}{isCurrentDateHoliday && ` ${holidayInfo?.dateName}`}</p>
        </Container>
    )
}

export default AllDay