import nock from 'nock';
import testBeerData from '../mockData/testBeerData';
import {getBeerList} from './BeerList.api';

describe('BeerList API', () => {
  it('returns the data from network call when there is no error', async () => {
    const scope = nock('https://api.sampleapis.com')
      .get('/beers/ale')
      .reply(200, testBeerData);
    const result = await getBeerList();
    expect(testBeerData).toEqual(result);
    expect(scope.isDone()).toBeTruthy();
  });

  it('throws an error if a network request fails', async () => {
    const scope = nock('https://api.sampleapis.com')
      .get('/beers/ale')
      .reply(500);

    await expect(async () => await getBeerList()).rejects.toThrow();
    expect(scope.isDone()).toBeTruthy();
  });
});
