import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {BeerList} from './components/BeerList';
import {useBeerList} from './hooks/useBeerList';

export const BeerListScreen = () => {
  const {beers, dataLoading, fetchBeersError} = useBeerList();

  if (dataLoading) {
    return <ActivityIndicator size="large" testID="loading-beer" />;
  }

  if (fetchBeersError) {
    return <Text>Error fetching beers</Text>;
  }

  return (
    <>
      {beers && beers.length > 0 ? (
        <BeerList beers={beers} />
      ) : (
        <Text>No beers today</Text>
      )}
    </>
  );
};
