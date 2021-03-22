import React, { useReducer, useContext, useCallback } from 'react';

import id from 'uuid/v4';
import initialState from './initialState';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

export const GrudgeContext = React.createContext();

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GRUDGE_ADD:
      return [
        payload,
        ...state
      ];

    case GRUDGE_FORGIVE:
      return state.map(grudge => {
        if (grudge.id === payload) return { ...grudge, forgiven: !grudge.forgiven }
        return grudge;
      });
    default:
      return state;
  }
}

export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(({ person, reason }) => {
    dispatch({
      type: GRUDGE_ADD,
      payload: {
        person,
        reason,
        forgiven: false,
        id: id()
      }
    });
  }, [dispatch]);

  const toggleForgiveness = useCallback(id => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: id
    })
  }, [dispatch]);

  const value = { grudges, addGrudge, toggleForgiveness };

  return (
    <GrudgeContext.Provider value={value}>
      { children }
    </GrudgeContext.Provider>
  );
};

export default GrudgeProvider;



