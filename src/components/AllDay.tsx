import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Holiday } from '../types/type';
import Modal from './modal';

// AllDay 컴포넌트의 스타일을 지정하는 Container 스타일드 컴포넌트를 정의
interface ContainerProps {
    sameMonth: boolean;
    sameDay: boolean;
    clickDay: boolean;
    isHoliday: boolean;
    checkHoliday: boolean;
}

interface DateContainerProp {
    sameDay: boolean;
}

interface HolidayNameProp {
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
    checkHoliday: boolean;
}

// AllDay 컴포넌트 정의 (DateBox 컴포넌트에서 map함수에 의해 해당 달의 첫날부터 마지막 날까지 호출됨)
const AllDay = ({ day, nowDate, setNowDate, clickedDate, setClickedDate, isHoliday, holiday, checkHoliday }: Props) => {
    const [buttonPosition, setButtonPosition] = useState<DOMRect | null>(null);
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

    // 클릭한 칸의 날짜 및 클릭한 버튼 위치 업데이트
    const clickDate = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.detail === 2) { // 더블 클릭 이벤트 확인
            setClickedDate(day);
            setButtonPosition(e.currentTarget.getBoundingClientRect());
        }
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
            onClick={clickDate} sameMonth={sameMonth} sameDay={sameDay}
            clickDay={clickDay} isHoliday={isHoliday} checkHoliday={checkHoliday}
        >
            <DateHeader>
                <DateContainer sameDay={sameDay}>
                    <p>{day.getDate()}</p>
                    <p>일</p>
                </DateContainer>

                <HolidayName isHoliday={isHoliday}>
                    <p>{isCurrentDateHoliday && ` ${holidayInfo?.dateName}`}</p>
                </HolidayName>
            </DateHeader>
            {clickDay && (
                <Modal onClose={() => setClickedDate(undefined)} buttonPosition={buttonPosition} />
            )}
        </Container>
    )
}

const Container = styled.div<ContainerProps>`
    border: 1px solid gray;

    // 해당 달과 이전&다음달 폰트 사이즈
    p {
        font-weight: ${({ sameMonth }) => (sameMonth ? '700' : '300')};
    }

    // 마우스 올려놨을때 배경색상 변경
    &:hover {
        background-color: ${({ sameMonth }) => (sameMonth ? 'gray' : 'initial')};
    }

    // 공휴일 보여줄지 여부
    ${props => props.checkHoliday && `
        ${HolidayName} {
            display: none;
        }
    `}

    // 클릭한 날짜 표시 스타일
    ${props => props.clickDay && `
        // 전체 p태그 스타일 적용
        ${DateContainer} p:first-child,
        ${DateContainer} p:last-child {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 22px;
            padding: 2px;
        }
        // 날씨 p태그만 스타일 적용
        ${DateContainer} p:first-child {
            width: 22px;
            border-radius: 50%;
            color: white;
            background-color: blue;

            // 수정: 클릭한 날짜가 오늘 날짜와 같으면 빨간색 원으로 표시
            ${props.sameDay && `
                background-color: red;
            `}
        }
    `}
`;

const DateHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 30px;
    padding-left: 3px;
    padding-top: 2px;
`;

const DateContainer = styled.div<DateContainerProp>`
    display: flex;
    flex-direction: row;

    p{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 22px;
        padding-top: 2px;
        padding-bottom: 2px;

        // 공휴일일때
        &:first-child {
            ${(props) =>
        props.sameDay &&
        css`
                    width: 22px;
                    padding: 2px;
                    border-radius: 50%;
                    color: white;
                    background-color: #ff2e16;
                `}
        }
        &:last-child {
            ${(props) =>
        props.sameDay &&
        css`
                    padding: 2px;
                `}
        }
    }
    
`;

const HolidayName = styled.div<HolidayNameProp>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: 8px;

    ${({ isHoliday }) => isHoliday && 'color: #ff2e16;'}
`;

export default AllDay