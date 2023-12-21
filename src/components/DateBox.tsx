import React from 'react';
import styled from 'styled-components';
import WeekBox from './WeekBox';
import AllDay from './AllDay';
import { Holiday } from '../types/type';

// 현재 월의 날짜 목록(달력)을 생성하는 함수입니다.
const monthList = (nowDate: Date) => {
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();

    // 이번 달의 첫번째 날과 마지막 날의 요일 (일:0 ~ 토:6)
    const dayOneWeek = new Date(nowYear, nowMonth, 1).getDay();
    const dayLastWeek = new Date(nowYear, nowMonth + 1, 0).getDay();

    // 이전 달 마지막 날짜와 이번달 마지막 날짜
    const prevMonthEnd = new Date(nowYear, nowMonth, 0).getDate();
    const nowMonthEnd = new Date(nowYear, nowMonth + 1, 0).getDate();

    // 이번달 달력에 보여줄 전체 날짜 배열(저반달, 이번달 일부 포함)
    const result: Date[] = [];

    for (let i = dayOneWeek - 1; i >= 0; i--) {
        result.push(new Date(nowYear, nowMonth - 1, prevMonthEnd - i));
    } // 첫번째 주에 포함될 저번주 날짜 계산해 배열에 추가 (포함될 저번달 첫째 날 부터 result에 추가)

    for (let i = 1; i <= nowMonthEnd; i++) {
        result.push(new Date(nowYear, nowMonth, i));
    } // 이번달 전체 날짜 배열에 추가

    // for (let i = 1; i < 7 - dayLastWeek; i++) {
    //     result.push(new Date(nowYear, nowMonth + 1, i));
    // } // 마지막 주에 포함될 다음달 날짜 계산해 배열에 추가

    // 다음달 구해야 하는 날짜 수 계산 객체 ( 6주(42일)이 되도록 )
    const remainingDays = 42 - result.length;

    for (let i = 1; i <= remainingDays; i++) {
        result.push(new Date(nowYear, nowMonth + 1, i));
    } // 구해야 하는 다음달 날짜 개수만큼 배열에 날짜 추가
    
    return result;
}

// DateBox 컴포넌트에 전달되는 Props의 타입을 정의
interface Props {
    nowDate: Date;
    setNowDate: React.Dispatch<React.SetStateAction<Date>>;
    clickedDate: Date | undefined;
    setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    holiday: Holiday[];
}

// 현재 날짜를 yyyymmdd 형식의 문자열로 변환하는 함수입니다. (padStart는 두자리수로 값을 채워줌)
const dateToyyyymmdd = (date:Date):string => {
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
}

const DateBox = ({ nowDate, setNowDate, clickedDate, setClickedDate, holiday }: Props) => {
    // 현재 월의 전체 날짜 목록을 가져옴
    const allDay: Date[] = monthList(nowDate);
    
    // 요일 이름 배열입니다.
    const weeks = ["일", "월", "화", "수", "목", "금", "토"];

    // 휴일의 날짜를 문자열로 변환하여 저장
    const holidayLocDate = holiday.map((data:Holiday) => {
        return String(data?.locdate);
    })

    return (
        <Container>
            {/* 요일을 나타내는 WeekBox 컴포넌트를 렌더링 */}
            {weeks.map((week: string, idx: number) => {
                return <WeekBox key={idx} weekName={week} />;
            })}

            {/* 각 날짜를 나타내는 AllDay 컴포넌트를 렌더링 */}
            {allDay.map((day: Date) => {
                const yyyymmdd = dateToyyyymmdd(day); // 날짜를 "yyyymmdd" 형식의 문자열로 변환
                const todayIsHoliday = holidayLocDate.indexOf(yyyymmdd); // 휴일 배열에서 현재 날짜의 인덱스를 찾음
                const isHoliday = todayIsHoliday === -1 ? false : true; // 현재 날짜가 휴일이면 true, 아니면 false를 할당
                // 나머지 AllDay 컴포넌트의 속성들과 함께 렌더링합니다.
                return (
                    <AllDay
                        key={yyyymmdd}
                        day={day}
                        nowDate={nowDate}
                        setNowDate={setNowDate}
                        clickedDate={clickedDate}
                        setClickedDate={setClickedDate}
                        isHoliday={isHoliday}
                        holiday={holiday}
                    />
                );
            })}
        </Container>
    );
};

// 스타일 컴포넌트
const Container = styled.div`
    display: grid;
    flex: 1;
    width: 100%;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 50px repeat(6, minmax(100px, auto));
`;

export default DateBox