import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  
  static defaultProps = {
    suggestions: []
  };
  
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    suggestions: PropTypes.instanceOf(Array)
  };

  state = {
    // The active selection's index
    activeSuggestion: 0,
    // The suggestions that match the user's input
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    text: ""
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'ligth');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  };

  onChange = e => {
    const { suggestions } = this.props;
    const text = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(text.toLowerCase()) > -1
    ).slice(0, 6);

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      text: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      text: e.currentTarget.innerText
    });
    if(e.currentTarget.innerText){
      this.props.searchUsers(this.state.text);
    }
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        text: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  clearUsers = event => {
    this.setState({ 
    text: '',      
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false
   });
  }

  render() {
    // Destructing clearUsers from props because its inside render ( sending him up to App Compoment)
    // onClick={this.props.clearUsers} without destructing
    // const { clearUsers } = this.props;
    const {
      onChange,
      onClick,
      onKeyDown,
      clearUsers,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        text
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && text && text.length>2) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="search-container">
        <form onSubmit={this.onSubmit} className="form" autoComplete="off">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="text_input"
          />
          {this.state.text && this.state.text.length>=1 && <button className="close-icon" onClick={clearUsers} type="reset"></button>}
          <input
            type="submit"
            value="Search"
            className="btn"
          />
        </form>
        </div>
        {/* {showClear && (
          <button className="btn" onClick={clearUsers}>
            Clear
          </button>
        )} */}
        {suggestionsListComponent}
      </div>
    );
  }
}
