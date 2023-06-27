import React from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';

const DriversScreen = () => {
  return (
    <View>
      <Text>Drivers Screen</Text>
      <List.Item
    title="First Item"
    description="Item description"/>
    </View>
  );
};

export default DriversScreen;