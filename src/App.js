import styles from './App.module.css'
import Login from './components/login/login'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './components/main/main'
import WritePage from './components/writePage/writePage'
import Subjects from './components/subjects/subjects'
import Writing from './components/writing/writing'
import MyWriting from './components/myWriting/myWriting'
import Search from './components/search/search'
import WritingPage from './components/writingPage/writingPage'
import Auth from './hoc/auth'

function App({authService, writingRepository}) {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService}></Login>
          </Route>
          <Route exact path="/main" component={Auth(Main, authService, writingRepository)}></Route>
          <Route exact path="/writing" component={Auth(Writing, authService, writingRepository )}></Route>
          <Route exact path="/writepage/:subject" component={Auth(WritePage, authService, writingRepository )}></Route>
          <Route exact path="/subjects" component={Auth(Subjects, authService, writingRepository )}></Route>
          <Route exact path="/mywriting" component={Auth(MyWriting, authService, writingRepository )}></Route>
          <Route exact path="/search/:subject" component={Auth(Search, authService, writingRepository)}></Route>
          <Route exact path="/writingPage" component={Auth(WritingPage, authService, writingRepository)}></Route>  
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
