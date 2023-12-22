import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Modal 컴포넌트의 속성 정의
interface ModalProps {
    onClose: () => void;            // 모달 닫기 콜백 함수
    buttonPosition: DOMRect | null; // 버튼 위치 정보
}

// Modal 컴포넌트 정의
const Modal: React.FC<ModalProps> = ({ onClose, buttonPosition }) => {
    const [opacity, setOpacity] = useState(0); // 모달의 투명도 상태
    const [scale, setScale] = useState(0.5); // 모달의 크기 상태
    const [top, setTop] = useState(buttonPosition ? buttonPosition.top : 0); // 모달의 상단 위치 상태
    const [left, setLeft] = useState(buttonPosition ? buttonPosition.left : 0); // 모달의 왼쪽 위치 상태

    useEffect(() => {
        // 모달이 나타날 때의 애니메이션 설정
        setTimeout(() => {
            setTop(window.innerHeight / 2);  // 화면 중앙 세로 위치
            setLeft(window.innerWidth / 2); // 화면 중앙 가로 위치
            setOpacity(1);  // 투명도 1로 설정하여 나타나도록 함
            setScale(1);    // 크기 1로 설정하여 확대됨
        }, 100);

        // 컴포넌트가 언마운트되거나 버튼 위치가 업데이트될 때의 정리 작업 설정
        return () => {
            // 모달을 초기 상태로 리셋하기 위한 딜레이
            setTop(buttonPosition ? buttonPosition.top : 0);   // 초기 세로 위치
            setLeft(buttonPosition ? buttonPosition.left : 0); // 초기 가로 위치
            setOpacity(0);  // 투명도 0으로 설정하여 사라지도록 함
            setScale(0.5);  // 크기 0.5로 설정하여 축소됨
        };
    }, [buttonPosition]);

    // 모달 클릭 이벤트가 부모로 전파되지 않도록 막는 함수
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    // 취소 버튼 클릭 시 실행되는 함수
    const handleCancelClick = () => {
        // 애니메이션을 초기 상태로 돌리기 위한 딜레이
        setTop(buttonPosition ? buttonPosition.top : 0);   // 초기 세로 위치
        setLeft(buttonPosition ? buttonPosition.left : 0); // 초기 가로 위치
        setOpacity(0);  // 투명도 0으로 설정하여 사라지도록 함
        setScale(0.5);  // 크기 0.5로 설정하여 축소됨

        // 모달 닫기 함수 호출을 딜레이 후 실행
        setTimeout(() => {
            onClose();
        }, 700); // 트랜지션 기간에 맞게 딜레이 조절
    };

    return (
        <ModalContainer opacity={opacity} scale={scale} top={top} left={left} onClick={onClose}>
            <ModalContent onClick={handleModalClick}>
                <p>모달 내용입니다</p>
                <StyledInput />
                <CloseButton onClick={handleCancelClick}>취소</CloseButton>
            </ModalContent>
        </ModalContainer>
    );
};

// 모달 스타일 정의
const ModalContainer = styled.div<{ opacity: number; scale: number; top: number; left: number }>`
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transform: translate(-50%, -50%) scale(${(props) => props.scale});
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: opacity 0.5s, transform 0.7s, top 0.7s, left 0.7s;
  opacity: ${(props) => props.opacity};
  z-index: 999;
`;

// 모달 콘텐츠 스타일 정의
const ModalContent = styled.div`
  text-align: center;
`;

// 스타일링된 input 요소 정의
const StyledInput = styled.input``;

// 모달 닫기 버튼 스타일 정의
const CloseButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
`;

export default Modal;
