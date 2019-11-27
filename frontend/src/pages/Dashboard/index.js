import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Link } from 'react-router-dom';
import history from '~/services/history';
import api from '~/services/api';

import { addMeetupRequest, refreshMeetup } from '~/store/modules/event/actions';

import { Container, Header, Meetup, Content } from './styles';

export default function Dashboard() {
  const [meetup, setMeetup] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get('organizing');

      const data = response.data.map(m => ({
        ...m,
        dateFormatted: format(parseISO(m.date), "dd 'de' MMMM', às' H'h'", {
          locale: pt,
        }),
      }));

      setMeetup(data);
    }

    loadMeetup();
  }, []);

  function handleAddMeetup(meetupId) {
    dispatch(addMeetupRequest(meetupId));
  }

  function handleNewMeetup() {
    dispatch(refreshMeetup());
    history.push('/new');
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>Meus meetups</h1>
          <button type="button" onClick={() => handleNewMeetup()}>
            <MdAddCircleOutline size={20} color="fff" />
            Novo meetup
          </button>
        </Header>

        <ul>
          {meetup.map(item => (
            <Meetup key={item.id} past={item.past}>
              <strong>{item.title}</strong>
              <div>
                <span>{item.dateFormatted}</span>
                <button type="button" onClick={() => handleAddMeetup(item.id)}>
                  <Link to={`/details/${item.id}`}>
                    <MdChevronRight size={24} color="#fff" />
                  </Link>
                </button>
              </div>
            </Meetup>
          ))}
        </ul>
      </Content>
    </Container>
  );
}
