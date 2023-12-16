import React, { useState, useEffect } from 'react';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import styled from 'styled-components';
import axios from 'axios';
import { Holiday } from '../types/type';

const requestData = {
    url: `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?`,
    serviceKey: process.env.REACT_APP_SERVICE_KEY,
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    height: 500px;
`;

const Main = () => {
    const [nowDate, setNowDate] = useState<Date>(new Date());
    const [clickedDate, setClickedDate] = useState<Date>();
    const [holiday, setHoliday] = useState<Holiday[]>([]);

    const getHoliday = async () => {
        const bodyData = {
            ...requestData,
            solYear: nowDate.getFullYear(),
            solMonth: nowDate.getMonth() + 1,
        };

        const response = await axios.get(
            `${bodyData.url}ServiceKey=${bodyData.serviceKey}&solYear=${bodyData.solYear}&solMonth=${bodyData.solMonth}`
        );

        const saveData = [].concat(response.data.response.body.items.item);
        console.log(saveData)
        setHoliday(saveData);
    }

    useEffect(() => {
        getHoliday();
    }, [nowDate])

    return (
        <Container>
            <ControlDate nowDate={nowDate} setNowDate={setNowDate} />
            <DateBox
                nowDate={nowDate}
                setNowDate={setNowDate}
                clickedDate={clickedDate}
                setClickedDate={setClickedDate}
                holiday={holiday}
            />
        </Container>
    );
};

export default Main