import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Driver from '../components/driver';
import Map from '../components/map';

const UserRoute = () => <Driver />;

const HistoryRoute = () => <></>;

const MapRoute = () => <Map />;

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'user', title: 'User', icon: 'queue-music' },
    { key: 'history', title: 'History', icon: 'history' },
    { key: 'maps', title: 'Map', icon: 'settings' },

  ]);

  const renderScene = BottomNavigation.SceneMap({
    user: UserRoute,
    history: HistoryRoute,
    maps: MapRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;