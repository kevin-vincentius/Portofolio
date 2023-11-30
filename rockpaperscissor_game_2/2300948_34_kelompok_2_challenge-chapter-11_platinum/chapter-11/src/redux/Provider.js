import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
import store from './store'

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
