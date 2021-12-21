import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import axios from 'axios';

import './App.css';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

import Users from './components/users/Users';
import Search from './components/users/Search';

class App extends Component {
  state = {
    users: [],
    suggestions: [],
    loading: false,
    alert: null
  };

  getSuggestion = async () => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json`
    );
    this.setState({ suggestions: res.data.suggestions, loading: false });
  };


  // Search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json`
    );
    this.setState({ users: {...res.data, query: text}, loading: false });
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Alert to clear
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  async componentDidMount(){
    await this.getSuggestion();
  }

  render() {
    const { users, user, repos, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      // Getting
                      searchUsers={this.searchUsers}
                      setAlert={this.setAlert}
                      clearUsers={this.clearUsers}
                      // Passing
                      showClear={users.length > 0 ? true : false}
                      suggestions={this.state.suggestions}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
