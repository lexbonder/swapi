import React from 'react';
import PropTypes from 'prop-types';
import './Character.css';

const Character = ({ name, click }) => {
  return (
    <div className="Character">
      <button onClick={click} id={name}>{name}</button>
    </div>
  );
};

const {string, func} = PropTypes;

Character.propTypes = {
  name: string,
  click: func
};

export default Character;
