import { registerRootComponent } from 'expo';
import App from './app';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or a native build,
// the environment is set up properly.
registerRootComponent(App);
