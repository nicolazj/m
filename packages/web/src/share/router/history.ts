import { createBrowserHistory, createMemoryHistory } from 'history';
import { Platform } from 'react-native';

const history = Platform.OS === 'web' ? createBrowserHistory() : createMemoryHistory();

history.listen(location => {
  const { gtag } = window as any;
  gtag('config', 'UA-101477606-1', { page_path: location.pathname });
});
export default history;
