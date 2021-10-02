import './App.css';
import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {MaterialUIDrawer} from './Components'
import {Home,Transcripts,LiveTranscript,Visualizations} from './Screens'

function App() {
  return (
      <React.Fragment>
        <MaterialUIDrawer/>
        <Switch>
          <Route exact component={Home} path="/home"/>
          <Route exact component={Transcripts} path="/transcripts"/>
          <Route exact component={Visualizations} path="/visualizations"/>
          <Route exact component={LiveTranscript} path="/livetranscript"/>
          <Redirect from="/" to="/home"/>
        </Switch>
      </React.Fragment>
  );
}

export default App;
