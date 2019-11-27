import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 1050px;
  margin: 0 0 100px;
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

  button {
    background: #f94d6a;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    border: 0;
  }
`;

export const Meetup = styled.li`
  height: 62px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 30px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  opacity: ${props => (props.past ? 0.6 : 1)};

  & + li {
    margin-top: 10px;
  }

  strong {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin-left: 30px;
  }

  div {
    display: flex;
    align-items: center;

    span {
      color: rgba(255, 255, 255, 0.6);
      margin-right: 30px;
    }

    button {
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
      border: 0;
    }
  }
`;
