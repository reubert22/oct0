import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {GlobalStateProvider} from './src/contexts/GlobalContext';
import {MainNavigation} from './src/navigation/Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <GlobalStateProvider>
        <MainNavigation />
      </GlobalStateProvider>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
