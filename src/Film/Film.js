import React from 'react';

const Film = ({title, date}) => {
  return (
    <li>{title} - {date}</li>
  );
};

export default Film;