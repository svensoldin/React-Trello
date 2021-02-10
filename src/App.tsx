import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'jotai';

import { useSession, useAuthDispatch } from '@context/index';
// Components
import Toast from '@components/custom-toast/Toast.component';
import ErrorBoundary from '@components/error-boundary/ErrorBoundary.component';
import Header from '@components/header/Header.component';
import ProtectedRoute from '@components/protected-route/ProtectedRoute.component';
import RedirectWrapper from '@components/redirect-wrapper/RedirectWrapper.component';

// Pages
import UserRoute from '@components/UserRoute/UserRoute.component';
import BoardPage from '@pages/board/Board.page';
import ProfilePage from '@pages/profile/Profile.page';

import './App.css';

const App = () => {
  const dispatch = useAuthDispatch();
  const { isLoading } = useSession(dispatch);
  return !isLoading ? (
    <Provider>
      <div className='App'>
        <Header />
        <ErrorBoundary>
          <Switch>
            <Route path={'/'} exact component={UserRoute} />
            <ProtectedRoute
              component={BoardPage}
              path={'/boards/:boardId'}
              exact
            />
            <ProtectedRoute path={'/profile'} exact component={ProfilePage} />
            <Route component={RedirectWrapper} />
          </Switch>
        </ErrorBoundary>
        <Toast />
      </div>
    </Provider>
  ) : null;
};

export default App;
