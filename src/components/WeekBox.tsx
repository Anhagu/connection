import React from 'react';
import styled from 'styled-components';

interface Props {
    weekName: string;
}

const WeekBox = ({ weekName }: Props) => {
    return (
        <Container>
            <p>{weekName}</p>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid black;
    background-color: gray;
`;

export default WeekBox