import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 64px;
  background: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Info = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const InfoText = styled.Text`
  color: rgba(255, 255, 255, 0.2);
  font-size: 20px;
  margin-top: 10px;
`;
