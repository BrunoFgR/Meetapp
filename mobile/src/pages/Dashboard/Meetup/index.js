import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import { addSubscriptionRequest } from '~/store/modules/subscription/actions';

import {
  Container,
  Banner,
  Title,
  Info,
  InfoData,
  InfoText,
  ContainerButton,
} from './styles';

export default function Meetup({ data }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const info = useSelector(state => state.subscription.loading);

  function handleSubscription(id) {
    setLoading(true);
    dispatch(addSubscriptionRequest(id));
  }

  useEffect(() => {
    if (!info) {
      setLoading(false);
    }
  }, [info]);

  return (
    <Container>
      <Banner
        source={{
          uri: `${data.image.url}`,
        }}
      />

      <Title>{data.title}</Title>

      <Info>
        <InfoData>
          <Icon name="event" size={20} color="#999" />
          <InfoText>{data.date}</InfoText>
        </InfoData>
        <InfoData>
          <Icon name="place" size={20} color="#999" />
          <InfoText>{data.location}</InfoText>
        </InfoData>
        <InfoData>
          <Icon name="person" size={20} color="#999" />
          <InfoText>Organizador: {data.user.name}</InfoText>
        </InfoData>
      </Info>

      <ContainerButton>
        <Button loading={loading} onPress={() => handleSubscription(data.id)}>
          Realizar inscrição
        </Button>
      </ContainerButton>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
    location: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    subscription: PropTypes.bool,
  }).isRequired,
};
