import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { Container, Content } from './styles';

import { updateProfileRequest } from '~/store/modules/user/actions';

export default function NewEdit() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Content>
        <Form initialData={profile} onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Nome Completo" />

          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <hr />

          <Input type="text" name="oldPassword" placeholder="Sua senha atual" />
          <Input type="text" name="password" placeholder="Nova senha" />
          <Input
            type="text"
            name="confirmPassword"
            placeholder="Confirmação de senha"
          />
          <button type="submit">
            <MdAddCircleOutline size={20} color="#fff" />
            <strong>Salvar perfil</strong>
          </button>
        </Form>
      </Content>
    </Container>
  );
}
