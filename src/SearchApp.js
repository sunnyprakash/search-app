import React, { Component } from "react";
import "./SearchApp.css";

class SearchApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      data: [],
      filteredData: [],
    };
  }

  handleInputChange = (event) => {
    const query = event.target.value;

    this.setState((prevState) => {
      const filteredData = [];
      prevState.data.forEach((element) => {
        if (element.name.toLowerCase().includes(query.toLowerCase()))
          filteredData.push(element.name);
        if (element.capital.toLowerCase().includes(query.toLowerCase()))
          filteredData.push(element.capital);
        return element;
      });

      return {
        query,
        filteredData,
      };
    });
  };

  getData = () => {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data,
        });
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="searchForm">
        <form>
          <input
            className="searchBox"
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>

        {this.state.query.length > 0 && this.state.filteredData.length > 0 && (
          <div className="searchResult">
            {this.state.filteredData.map((item, index) => (
              <p key={`${item}-${index}`}>{item}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchApp;
