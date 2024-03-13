import {render} from '@testing-library/react-native';
import React from 'react';
import {BeerListScreen} from './BeerListScreen';
import {useBeerList} from './hooks/useBeerList';

jest.mock('./hooks/useBeerList');
const mockedUseBeerList = useBeerList as jest.MockedFunction<
  typeof useBeerList
>;

describe('BeerList Screen', () => {
  it('renders the loading spinner when hook is loading', () => {
    mockedUseBeerList.mockReturnValue({
      beers: [],
      dataLoading: true,
      fetchBeersError: null,
    });

    const {findByTestId} = render(<BeerListScreen />);
    expect(findByTestId('loading-beer')).toBeTruthy();
  });

  it('renders an error message when theres error', () => {
    mockedUseBeerList.mockReturnValue({
      beers: [],
      dataLoading: false,
      fetchBeersError: new Error('bad beer'),
    });

    const {findByText} = render(<BeerListScreen />);
    expect(findByText('Error fetching beers')).toBeTruthy();
  });

  it('renders no beers today when the list is empty', () => {
    mockedUseBeerList.mockReturnValue({
      beers: [],
      dataLoading: false,
      fetchBeersError: null,
    });

    const {findByText} = render(<BeerListScreen />);
    expect(findByText('No beers today')).toBeTruthy();
  });

  it('renders the beer list when hook returns beers', () => {
    mockedUseBeerList.mockReturnValue({
      beers: [],
      dataLoading: true,
      fetchBeersError: null,
    });

    const {findByTestId} = render(<BeerListScreen />);
    expect(findByTestId('beer-list')).toBeTruthy();
  });
});
