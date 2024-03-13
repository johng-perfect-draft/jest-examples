import {render} from '@testing-library/react-native';
import React from 'react';
import {BeerList} from './BeerList';

describe('BeerList component', () => {
  const beers = [
    {id: 1, name: 'Beer 1', price: '5.99'},
    {id: 2, name: 'Beer 2', price: '6.99'},
  ];

  it('displays each beer name and price correctly', () => {
    const {getByText} = render(<BeerList beers={beers} />);
    beers.forEach(beer => {
      expect(getByText(beer.name)).toBeTruthy();
      expect(getByText(`Price: ${beer.price}`)).toBeTruthy();
    });
  });
});
