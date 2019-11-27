import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 1050px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    align-items: flex-end;

    input {
      height: 50px;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      display: flex;
      justify-content: center;
      border-radius: 4px;
      padding: 0 20px;
      color: #fff;
      font-size: 16px;
      margin: 0 30px;
      align-self: stretch;

      & + input {
        margin-top: 10px;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 30px 30px 20px;
      align-self: stretch;
    }

    button {
      height: 42px;
      margin-top: 20px;
      width: 180px;
      margin-right: 30px;
      background: #f94d6a;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      color: #fff;
      font-size: 16px;

      svg {
        margin-right: 10px;
      }
    }
  }
`;
