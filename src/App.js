import styles from './App.module.css'
import Login from './components/login/login'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import WritePage from './components/writePage/writePage'
import Subjects from './components/subjects/subjects'
import Writing from './components/writing/writing'
import MyWriting from './components/myWriting/myWriting'
import Search from './components/search/search'
import WritingPage from './components/writingPage/writingPage'
import Favorite from './components/favorite/favorite'
import FavoritePage from './components/favoritePage/favoritePage'
import MyWritingPage from './components/myWritingPage/myWritingPage'
import PageNotFound from './components/pageNotFound/pageNotFound'
import Auth from './hoc/auth'

function App({authService, writingRepository}) {

  return (
    <div className={styles.app}>
      <BrowserRouter basename="/react-firebase-write-app" >
        <Switch>
          <Route exact path="/">
            <Login authService={authService}></Login>
          </Route>
          <Route exact path="/writing" component={Auth(Writing, authService, writingRepository )}></Route>
          <Route exact path="/writepage/:subject" component={Auth(WritePage, authService, writingRepository )}></Route>
          <Route exact path="/subjects" component={Auth(Subjects, authService, writingRepository )}></Route>
          <Route exact path="/mywriting" component={Auth(MyWriting, authService, writingRepository )}></Route>
          <Route exact path="/mywritingpage" component={Auth(MyWritingPage,authService, writingRepository )}></Route>
          <Route exact path="/search/:subject" component={Auth(Search, authService, writingRepository)}></Route>
          <Route exact path="/writingPage" component={Auth(WritingPage, authService, writingRepository)}></Route>  
          <Route exact path="/favorite" component={Auth(Favorite, authService, writingRepository )}></Route>
          <Route exact path="/favoritePage/:subject" component={Auth(FavoritePage, authService, writingRepository )}></Route>
          <Route path="/">
            <PageNotFound></PageNotFound>
          </Route>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
