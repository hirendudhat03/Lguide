import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Welcome from './src/screens/Welcome/Welcome';
import Navigation from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import store from './src/Redux/Store/index';
import {useDispatch, useSelector} from 'react-redux';
import Startup from './src/screens/Startup';

const App = () => {
  console.disableYellowBox = true
    return (
      <Provider store={store}>
        <Startup />
      </Provider>
    );  
}

export default App;
