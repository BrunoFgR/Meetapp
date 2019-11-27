import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  height: 64px;
  background: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30, paddingTop: 0 },
})`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  background: #d44059;
  margin-top: 15px;
`;
