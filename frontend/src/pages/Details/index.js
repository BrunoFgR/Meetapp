import React, { useState, useEffect } from 'react';
import { MdEdit, MdDeleteForever, MdEvent, MdPlace } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import api from '~/services/api';
import history from '~/services/history';

import { deleteMeetup } from '~/store/modules/event/actions';

import { Container, Content, Header, Footer, Banner } from './styles';

export default function Details({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get('organizing');

      const checkData = response.data.find(m => m.id === Number(id));

      const data = {
        ...checkData,
        url: checkData.image.url,
        dateFormatted: format(
          parseISO(checkData.date),
          "dd 'de' MMMM', às' H'h'",
          {
            locale: pt,
          }
        ),
      };

      setMeetup(data);
    }

    loadMeetup();
  }, [dispatch, id]);

  async function handleDelete(idMeetup) {
    dispatch(deleteMeetup(idMeetup));
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>{meetup.title}</h1>
          <div>
            <button
              type="button"
              disabled={meetup.past}
              onClick={() => history.push(`/edit/${meetup.id}`)}
            >
              <MdEdit size={20} color="#fff" />
              Editar
            </button>
            <button
              type="button"
              disabled={meetup.past}
              onClick={() => handleDelete(meetup.id)}
            >
              <MdDeleteForever size={20} color="#fff" />
              Cancelar
            </button>
          </div>
        </Header>

        <Banner>
          <img src={meetup.url} alt="" />
        </Banner>

        <p>{meetup.description}</p>

        <Footer>
          <div>
            <MdEvent size={20} color="rgba(255,255,255, .6)" />
            <span>{meetup.dateFormatted}</span>
          </div>
          <div>
            <MdPlace size={20} color="rgba(255,255,255, .6)" />
            <span>{meetup.location}</span>
          </div>
        </Footer>
      </Content>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
