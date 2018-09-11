/* eslint-disable */
import React from 'react';
import Film from './Film';
import { shallow } from 'enzyme';

describe('Film', () => {
  let wrapper;
  let mockTitle = 'Empire Strikes Back';
  let mockDate = "Saturday, May 17th 1980";

  beforeEach(() => {
    wrapper = shallow(<Film 
      title={mockTitle}
      date={mockDate}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})