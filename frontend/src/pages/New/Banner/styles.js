import styled from 'styled-components';

export const Container = styled.div`
  height: 300px;
  background: rgba(0, 0, 0, 0.4);
  margin: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  align-self: stretch;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;

    img {
      height: 100%;
      width: 100%;
    }

    input {
      display: none;
    }

    strong {
      color: rgba(255, 255, 255, 0.3);
      font-size: 16px;
    }
  }
`;
