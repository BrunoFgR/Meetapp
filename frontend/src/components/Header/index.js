import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="MeetApp" />
        </div>

        <Profile>
          <div>
            <strong>{profile.name}</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <button type="button" onClick={handleSignOut}>
            Sair
          </button>
        </Profile>
      </Content>
    </Container>
  );
}
