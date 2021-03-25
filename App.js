import React, { Component, Fragment } from "react";
import SearchComponent from "./Components/SearchComponent";
import DisplayGitUsers from "./Components/DisplayGitUsers";
import axios from "axios";
class App extends Component {
  state = {
    term: "",
    reposData: "",
    loading: false,
  };
  onTermSubmit = async term => {
    let client_id = " Iv1.ea824bc7cd6391b3";
    let client_secret = "a2c33757549ca13bc6ac50d74a40047a874278f4";
    let response = await axios.get(
      `https:api.github.com/users/${term}?client_Id${client_id}&client_Secret${client_secret}`
    );
    let repos = await axios.get(
      `https://api.github.com/users/${term}/repos?client_Id${client_id}&client_Secret${client_secret}`
    );
    this.setState({ term: response.data, reposData: repos, loading: true });
  };
  render() {
    return (
      <Fragment>
        <SearchComponent onTermSubmit={this.onTermSubmit} />
        <section className="container my-2">
          <hr className="hr" />
          <DisplayGitUsers
            users={this.state.term}
            repos={this.state.reposData}
            loading={this.state.loading}
          />
        </section>
      </Fragment>
    );
  }
}

export default App;
