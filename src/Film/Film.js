import React from 'react';
import PropTypes from 'prop-types';
import './Film.css';

const Film = ({title, date}) => {
  return (
    <div className='Film'>
      <h3>{title}</h3>
      <h3>{date}</h3>
    </div>
  );
};

const { string } = PropTypes;

Film.propTypes = {
  title: string,
  date: string
};

export default Film;