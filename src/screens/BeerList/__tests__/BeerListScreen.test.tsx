import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {render, waitFor} from '@testing-library/react-native';
import nock from 'nock';
import React from 'react';
import {BeerListScreen} from '../BeerListScreen';
import testBeerData from '../mockData/testBeerData';

describe('BeerListScreen', () => {
  const renderScreen = () => {
    const queryClient = new QueryClient();
    queryClient.clear();
    queryClient.setDefaultOptions({
      queries: {cacheTime: 0, retry: false},
      mutations: {cacheTime: 0, retry: false},
    });
    return render(
      <QueryClientProvider client={queryClient}>
        <BeerListScreen />
      </QueryClientProvider>,
    );
  };

  // Waiting for loading spinner fails sometimes
  it('renders the list of beers', async () => {
    const scope = nock('https://api.sampleapis.com')
      .get('/beers/ale')
      .reply(200, testBeerData);
    const {getByText} = renderScreen();

    await waitFor(() => {
      expect(scope.isDone()).toBeTruthy();
      expect(getByText('Founders All Day IPA')).toBeTruthy();
    });
    expect(
      getByText('Blue Moon Belgian White Belgian-Style Wheat Ale'),
    ).toBeTruthy();
    expect(getByText('Guinness Extra Stout')).toBeTruthy();
  });
  it('renders no beer message when there is no beer from api', async () => {
    const scope = nock('https://api.sampleapis.com')
      .get('/beers/ale')
      .reply(200, []);
    const {getByText} = renderScreen();
    await waitFor(() => {
      expect(scope.isDone()).toBeTruthy();
      expect(getByText('No beers today')).toBeTruthy();
    });
  });
  it('renders an error message when fetch fails', async () => {
    const scope = nock('https://api.sampleapis.com')
      .get('/beers/ale')
      .reply(500);
    const {getByText} = renderScreen();
    await waitFor(() => {
      expect(scope.isDone()).toBeTruthy();
      expect(getByText('Error fetching beers')).toBeTruthy();
    });
  });
});
