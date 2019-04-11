import './index.css';

import { AppRegistry } from 'react-native';

import App from './share/App';

function run() {
  AppRegistry.registerComponent('musicapp', () => App);
  AppRegistry.runApplication('musicapp', {
    rootTag: document.getElementById('root'),
  });
}

run();
