import useCachedResources from './hooks/useCachedResources';
import Root from './Root';
import { AppProvider } from './utils/App.provider';
import { StartLoadingScreen } from './screens/StartLoading.screen';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <StartLoadingScreen />;
  } else {
    return (
      <AppProvider>
        <Root />
      </AppProvider>
    );
  }
}
