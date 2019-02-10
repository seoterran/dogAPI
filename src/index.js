import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Image from './Image';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

ReactDOM.render(
      <Router basename="/">
          <Switch>
              <Route exact path= "/" component={App}/>
              <Route path= "/image/:breed/:subBreed" component={Image}/>
              <Route path= "/image/:breed" component={Image}/>
          </Switch>
      </Router>
          , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
