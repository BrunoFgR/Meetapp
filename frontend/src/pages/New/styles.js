import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 1050px;
  margin: 0 0 50px;

  form {
    display: flex;
    flex-direction: column;
    margin: 50px 0;
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
      margin: 10px 30px 0;
      align-self: stretch;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 10px 30px 0;
      font-weight: bold;
    }

    input[type='datetime-local'] {
      height: 50px;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      display: flex;
      justify-content: center;
      border-radius: 4px;
      padding: 0 20px;
      color: #fff;
      font-size: 16px;
      margin: 10px 30px 0;
      align-self: stretch;

      &::-webkit-inner-spin-button {
        display: none;
      }

      &::-webkit-calendar-picker-indicator {
        &:hover {
          background: rgba(0, 0, 0, 0.2);
        }
      }
    }

    textarea {
      height: 200px;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      display: flex;
      justify-content: center;
      border-radius: 4px;
      padding: 10px 20px;
      color: #fff;
      font-size: 16px;
      margin: 10px 30px 0;
      align-self: stretch;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
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
