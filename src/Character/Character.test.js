/* eslint-disable */
import React from 'react';
import Character from './Character';
import { shallow } from 'enzyme';

describe('Character', () => {
  let wrapper;
  let mockName = 'Luke Skywalker';
  let mockClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<Character
      name={mockName}
      click={mockClick}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should call click when clicked', () => {
    wrapper.find('button').simulate('click');
    expect(mockClick).toHaveBeenCalled();
  })
})