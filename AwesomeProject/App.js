import React from 'react';

import BottomNav from './components/bottom-nav';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NearList from './components/near-list';
const App = () => {
  return (

    <SafeAreaProvider>
    <NearList/>
      <BottomNav />
    </SafeAreaProvider>
  );
};

export default App;