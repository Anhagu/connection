import React, { useState, useEffect } from 'react';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import styled from 'styled-components';
import axios from 'axios';
import { Holiday } from '../types/type';

// 특일 정보 API 요청
const requestData = {
    url: `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?`,
    serviceKey: process.env.REACT_APP_SERVICE_KEY,
};

const Main = () => {
    // 현재 날짜, 클릭한 날짜, 공휴일 데이터 배열을 State로 관리
    const [nowDate, setNowDate] = useState<Date>(new Date());
    const [clickedDate, setClickedDate] = useState<Date>();
    const [holiday, setHoliday] = useState<Holiday[]>([]);
    // 공휴일 뷰 체크박스 State
    const [checkHoliday, setCheckHoliday] = useState<boolean>(false);

    // API를 통해 공휴일 데이터를 가져오는 비동기 함수를 정의
    const getHoliday = async () => {
        // API 요청에 필요한 데이터를 설정
        const bodyData = {
            ...requestData,
            solYear: nowDate.getFullYear(),
            solMonth: (nowDate.getMonth() + 1).toString().padStart(2, '0'),
        };

        // axios를 사용하여 API에 요청
        const response = await axios.get(
            `${bodyData.url}ServiceKey=${bodyData.serviceKey}&solYear=${bodyData.solYear}&solMonth=${bodyData.solMonth}`
        );

        // API 응답에서 필요한 데이터를 추출하고 상태를 업데이트
        const saveData = [].concat(response.data.response.body.items.item);
        console.log(saveData)
        setHoliday(saveData);
    };

    // 컴포넌트가 마운트되거나 nowDate(현재 날짜) 상태가 변경될 때 getHoliday 함수를 실행
    useEffect(() => {
        getHoliday();
    }, [nowDate])

    return (
        <Container>
            {/* ControlDate(날짜 조절 컨트롤러) 컴포넌트 렌더링 */}
            <ControlDate nowDate={nowDate} setNowDate={setNowDate} checkHoliday={checkHoliday} setCheckHoliday={setCheckHoliday} />
            
            {/* DateBox(달력) 컴포넌트 렌더링 */}
            <DateBox
                nowDate={nowDate}
                setNowDate={setNowDate}
                clickedDate={clickedDate}
                setClickedDate={setClickedDate}
                holiday={holiday}
                checkHoliday={checkHoliday}
            />
        </Container>
    );
};

// 스타일 컴포넌트
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export default Main