import { AppRegistry } from 'react-native';

import App from './share/App';
import add from '@m/shared/dist/cat';
import './index.css';
console.log(add('1', '2'));
function run() {
  AppRegistry.registerComponent('musicapp', () => App);
  AppRegistry.runApplication('musicapp', {
    rootTag: document.getElementById('root'),
  });
}

run();
