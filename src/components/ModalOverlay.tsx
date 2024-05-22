import React from 'react';
import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

const StyledOverlay = styled.div<{ closing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 검은색 배경
  backdrop-filter: blur(2px);
  z-index: 1000;
  animation: ${props => (props.closing ? fadeOut : fadeIn)} 0.3s ease-out forwards;
`;
export const modalRoot =
  document.getElementById('modal-root') ||
  (function () {
    const div = document.createElement('div');
    div.id = 'modal-root';
    document.body.appendChild(div);
    return div;
  })();

interface OverlayProps {
  closing: boolean;
  children: React.ReactNode;
}

export const CreateContainer = styled.div<{ closing: boolean }>`
  position: fixed;
  display: flex;
  background-color: ${props => props.theme.backgroundColor};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 400px;
  padding: 30px;
  animation: ${props => (props.closing ? fadeOut : fadeIn)} 0.3s ease-out forwards;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Container = styled.div<{ closing: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.backgroundColor};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 50vw;
  z-index: 10001;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 0.5px solid;
  width: 500px;
  height: 400px;
  padding: 30px;
  border-radius: 5px;
  animation: ${props => (props.closing ? fadeOut : fadeIn)} 0.3s ease-out forwards;
`;
export const Overlay = styled.div<{ closing: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 검은색 배경
  z-index: 100;
`;
