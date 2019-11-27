import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconII from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import api from '~/services/api';

import { Container, Date, List, Header, Info, InfoText } from './styles';

import Background from '~/components/Background';
import Meetup from './Meetup';

export default function Dashboard() {
  const [date, setDate] = useState(new window.Date());
  const [meetups, setMeetup] = useState([]);
  const subscription = useSelector(state => state.subscription.meetup);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  const getDate = useMemo(() => format(date, 'yyyy-MM-dd', { locale: pt }), [
    date,
  ]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', { params: { date: getDate } });

      const data = response.data.map(d => ({
        ...d,
        date: format(parseISO(d.date), "dd 'de' MMMM', às' HH'h'", {
          locale: pt,
        }),
        subscription: subscription.findIndex(s => s.id === d.id) !== -1,
      }));

      if (subscription.length) {
        const updateData = data.filter(d => d.subscription === false);

        setMeetup(updateData);
      } else {
        setMeetup(data);
      }
    }
    loadMeetups();
  }, [date, getDate, subscription]);

  return (
    <Background>
      <Container>
        <Header>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Date>{dateFormatted}</Date>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </TouchableOpacity>
        </Header>

        {!meetups.length ? (
          <Info>
            <IconII
              name="alert-circle"
              size={60}
              color="rgba(255, 255, 255, 0.2)"
            />
            <InfoText>Nenhum evento foi encontrado!</InfoText>
          </Info>
        ) : (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Meetup data={item} />}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
