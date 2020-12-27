import styles from './App.module.css'
import Login from './components/login/login'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './components/main/main'
import WritePage from './components/writePage/writePage'
import Subjects from './components/subjects/subjects'
import Writing from './components/writing/writing'
import MyWriting from './components/myWriting/myWriting'


function App({authService, writingRepository}) {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService}></Login>
          </Route>
          <Route exact path="/main">
            <Main authService={authService}></Main>
          </Route>
          <Route exact path="/writepage">
            <WritePage authService={authService} writingRepository={writingRepository}></WritePage>
          </Route>
          <Route exact path="/subjects">
            <Subjects authService={authService} writingRepository={writingRepository}></Subjects>
          </Route>
          <Route exact path ="/writing">
            <Writing authService={authService} writingRepository={writingRepository}></Writing>
          </Route>
          <Route exact path ="/mywriting">
          <MyWriting authService={authService} writingRepository={writingRepository}></MyWriting>
          </Route>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
