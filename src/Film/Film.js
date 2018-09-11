import React from 'react';
import PropTypes from 'prop-types';

const Film = ({title, date}) => {
  return (
    <li>{title} - {date}</li>
  );
};

const { string } = PropTypes;

Film.propTypes = {
  title: string,
  date: string
};

export default Film;