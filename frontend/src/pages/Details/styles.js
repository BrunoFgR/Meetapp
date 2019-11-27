import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 1050px;
  display: flex;
  flex-direction: column;

  p {
    font-size: 18px;
    margin: 25px 30px 30px;
    color: #fff;
    line-height: 32px;
    white-space: pre-line;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 50px 30px;

  h1 {
    color: #fff;
    font-size: 32px;
    font-weight: bold;
  }

  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;

    button {
      background: #4dbaf9;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      border: 0;
      margin: 0 15px 15px;

      & + button {
        background: #f94d6a;
      }

      svg {
        margin-right: 10px;
      }

      &[disabled] {
        display: none;
      }
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 200px;

  div {
    margin: 0 30px;
    display: flex;
    align-items: center;

    & + div {
      margin: 0;
    }

    svg {
      margin-right: 10px;
    }

    span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
    }
  }
`;

export const Banner = styled.div`
  margin: 0 30px;
  display: flex;
  height: 300px;

  img {
    border-radius: 4px;
    height: 100%;
    width: 100%;
  }
`;
