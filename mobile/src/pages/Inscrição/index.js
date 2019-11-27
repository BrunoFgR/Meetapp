import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconII from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '~/assets/M.png';

import Background from '~/components/Background';
import Meetup from './Meetup';

import { Container, Header, List, Info, InfoText } from './styles';

export default function Inscricao() {
  const subscription = useSelector(state => state.subscription.meetup);

  return (
    <Background>
      <Container>
        <Header>
          <Image source={Logo} size={20} />
        </Header>

        {!subscription.length ? (
          <Info>
            <IconII
              name="alert-circle"
              size={60}
              color="rgba(255, 255, 255, 0.2)"
            />
            <InfoText>Você não possui nenhuma inscrição!</InfoText>
          </Info>
        ) : (
          <List
            data={subscription}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Meetup data={item} />}
          />
        )}
      </Container>
    </Background>
  );
}

Inscricao.navigationOptions = {
  tabBarLabel: 'Incrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
