import * as React from 'react';
import { Provider } from 'react-redux';
import createStore from './app/shared/reducers';
import * as SplashScreen from 'expo-splash-screen';
import NavContainer from './app/navigation/nav-container';

const store = createStore();

export default function App() {
  // Prevent the splashscreen from disappearing until the redux store is completely ready (hidden in nav-container.js)
  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    // Here you can add any logic you need to initialize your app before hiding the splash screen
    // For example, you can wait for your Redux store to be fully initialized
    const unsubscribe = store.subscribe(() => {
      // Example: When the store is initialized, hide the splash screen
      SplashScreen.hideAsync();
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  );
}
