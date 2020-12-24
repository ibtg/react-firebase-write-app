import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import AuthService from './service/auth_service';
import WritingRepository from './service/writing_repository'


const authService = new AuthService();
const writingRepository = new WritingRepository()

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} writingRepository={writingRepository}/>
  </React.StrictMode>,
  document.getElementById('root')
);
