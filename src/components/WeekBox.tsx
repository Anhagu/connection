import React from 'react';
import styled from 'styled-components';

interface Props {
    weekName: string;
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid black;
    background-color: gray;
`;

const WeekBox = ({ weekName }: Props) => {
    return (
        <Container>
            <p>{weekName}</p>
        </Container>
    );
};

export default WeekBox