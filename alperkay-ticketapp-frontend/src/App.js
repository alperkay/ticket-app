import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import EventsList from './components/EventsList'
import TicketsList from './components/TicketsList'
import TicketDetails from './components/TicketDetails'
import LoginPage from './components/auth/LoginPage'
import SignupPage from './components/auth/SignupPage'
import LogoutPage from './components/auth/LogoutPage'
import TopBar from './components/TopBar'
// import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <nav>
            <TopBar  />
          </nav>
          <main style={{marginTop:75}}>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/events" component = {EventsList} />
          <Route exact path="/events/:id" component= {TicketsList} />
          <Route exact path="/tickets/:id" component= {TicketDetails} />
          <Route exact path="/" render={ () => <Redirect to="/events" /> } />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
