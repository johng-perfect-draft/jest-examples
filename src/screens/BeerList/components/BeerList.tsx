import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Beer} from '../apis/BeerList.api';

export const BeerList = ({beers}: {beers: Beer[]}) => {
  return (
    <View testID="beer-list">
      <Text>Beer List</Text>
      <FlatList
        data={beers}
        renderItem={({item: beer}: {item: Beer}) => {
          return (
            <View key={beer.id}>
              <Text>{beer.name}</Text>
              <Text>Price: {beer.price}</Text>
              <View
                style={{
                  height: 58,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
