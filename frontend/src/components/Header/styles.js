import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  height: 92px;
  background: rgba(0, 0, 0, 0.3);
  justify-content: center;
  padding: 0 30px;
`;

export const Content = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.aside`
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;

    strong {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      margin: 0 0 5px;
    }

    a {
      color: #999;
      font-size: 14px;
    }
  }

  button {
    background: #d44059;
    padding: 12px 20px;
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    font-size: 14px;

    &:hover {
      background: ${darken(0.03, '#d44059')};
    }
  }
`;
