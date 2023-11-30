import Layout from '@/components/Layout'
import '@/styles/globals.css'
import '@/styles/costume.css'
import '@/components/game/gamelist/GameList.css';
import "@/components/login/login.css";
import "@/components/register/register.css";
import "@/components/userlist/UserList.css";
import '@/components/redirectpopup/redirectpopup.css';
import '@/components/profile/profile.css'
import '@/components/VideoPlayer/VideoPlayer.css';
import '@/components/Player/Player.css';
import ReduxProvider from '@/redux/Provider';
import PropTypes from 'prop-types';
import React from 'react';

export default function App({ Component }) {
  return (
  <ReduxProvider>
    <Layout>
      <Component  />
    </Layout>
  </ReduxProvider>
  )
}


App.propTypes = {
  Component: PropTypes.node.isRequired,
};

