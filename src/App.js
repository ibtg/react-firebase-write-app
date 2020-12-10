import styles from './App.module.css'
import Login from './components/login/login'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './components/main/main'

function App({authService}) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService}></Login>
          </Route>
          <Route path="/main">
            <Main authService={authService}></Main>
          </Route>

        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
