import {useQuery} from '@tanstack/react-query';
import {Beer, getBeerList} from '../apis/BeerList.api';

export const useBeerList = () => {
  const {data, isLoading, error} = useQuery<Beer[], Error>({
    queryKey: ['beerListCacheKey'],
    queryFn: getBeerList,
  });
  return {beers: data, dataLoading: isLoading, fetchBeersError: error};
};
