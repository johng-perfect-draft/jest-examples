import {useQuery} from '@tanstack/react-query';
import {renderHook} from '@testing-library/react-hooks';
import {getBeerList} from '../apis/BeerList.api';
import {useBeerList} from './useBeerList';

jest.mock('@tanstack/react-query');

describe('useBeerList hook', () => {
  it('should fetch beer list data successfully', async () => {
    const mockData = [
      {id: 1, name: 'Beer 1', price: 5.99},
      {id: 2, name: 'Beer 2', price: 6.99},
    ];
    const mockUseQuery = jest
      .fn()
      .mockReturnValue({data: mockData, isLoading: false, error: null});
    (useQuery as jest.Mock).mockImplementation(mockUseQuery);

    const {result} = renderHook(() => useBeerList());

    expect(result.current.beers).toEqual(mockData);
    expect(result.current.dataLoading).toBeFalsy();
    expect(result.current.fetchBeersError).toBeNull();
    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ['beerListCacheKey'],
      queryFn: getBeerList,
    });
  });

  it('should handle loading state correctly', async () => {
    const mockUseQuery = jest
      .fn()
      .mockReturnValue({data: null, isLoading: true, error: null});
    (useQuery as jest.Mock).mockImplementation(mockUseQuery);

    const {result} = renderHook(() => useBeerList());

    expect(result.current.beers).toBeNull();
    expect(result.current.dataLoading).toBeTruthy();
    expect(result.current.fetchBeersError).toBeNull();
  });

  it('should handle error state correctly', async () => {
    const mockError = new Error('Failed to fetch beer list');
    const mockUseQuery = jest
      .fn()
      .mockReturnValue({data: null, isLoading: false, error: mockError});
    (useQuery as jest.Mock).mockImplementation(mockUseQuery);

    const {result} = renderHook(() => useBeerList());

    expect(result.current.beers).toBeNull();
    expect(result.current.dataLoading).toBeFalsy();
    expect(result.current.fetchBeersError).toEqual(mockError);
  });
});
