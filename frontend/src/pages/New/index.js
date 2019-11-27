import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content } from './styles';
import Banner from './Banner';

import { updateMeetupRequest, newMeetup } from '~/store/modules/event/actions';

export default function NewEdit() {
  const schema = Yup.object().shape({
    file_id: Yup.number().required(),
    title: Yup.string().required('Adicione um Título'),
    description: Yup.string()
      .max(255, 'Ultrapassado o limite de caracteres. (Max: 255)')
      .required('A descrição é obrigatória'),
    date: Yup.date()
      .min(new Date(), 'A data fornecida já passou, forneça uma data válida')
      .typeError('A data é obrigatoria'),
    location: Yup.string().required('Adicione uma localização'),
  });

  const meetup = useSelector(state => state.event.meetup);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    if (meetup) {
      dispatch(updateMeetupRequest(data, meetup.id));
    } else {
      dispatch(newMeetup(data));
    }
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
          <Banner name="file_id" />

          <Input type="text" name="title" placeholder="Título do Meetup" />
          <Input
            type="text"
            name="description"
            placeholder="Descrição completa"
            multiline
          />
          <Input type="datetime-local" name="date" />
          <Input type="text" name="location" placeholder="Localização" />
          <button type="submit">
            <MdAddCircleOutline size={20} color="#fff" />
            <strong>Salvar meetup</strong>
          </button>
        </Form>
      </Content>
    </Container>
  );
}
