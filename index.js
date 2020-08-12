/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './Src/Store';
import {name as appName} from './app.json';

//AppRegistry.registerComponent(appName, () => App);

const store = configureStore();

const RNRedux = () => (
    <Provider store = { store }>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
