import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormGroup, Input, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  state = {
    current: '',
    location: '',
    searchtext: '',
    emptysearch: true,
  }

  fetchSearch() {
    // Where we're fetching data from
    let url = 'http://api.weatherstack.com/current?access_key=7c993391f5248d9e441596e4808136f0';
    fetch(`${url}&query=${this.state.searchtext}`,{method:'GET'})
      .then(res => res.json())
      .then(data => 
          this.setState({ 
            current: data.current,
            location: data.location,
            emptysearch: false,
            // request: data.request
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => {
        console.error(error);
      });
  }

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
    if ( e.target.value.length === 0 ){
      this.setState({
        emptysearch: true
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.fetchSearch();
  }

  render() {
    const { current, location, searchtext, emptysearch } = this.state;
    // console.log(current);
    return (
      <Container className="App">
        <h4>Weather Search</h4>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input 
                type="text" 
                name="searchtext" 
                id="searchtext" 
                placeholder="Search" 
                value={searchtext} 
                onChange={this.onChange} 
            />
            <Button 
                className="search"
                disabled={!(this.state.searchtext)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </FormGroup>
        </Form>
        <div className="search-content">
        {!emptysearch && typeof location !== 'undefined' ? (
          <React.Fragment>
          <ul>
            <li>Name:  {location.name} </li>
            <li>Country : {location.country} </li>
            <li>Region : {location.region} </li>
            <li>temperature : {current.temperature} </li>
            <li>Weather Icons : <img src={current.weather_icons} alt="weather" /> </li>
            <li>Weather Description : {current.weather_descriptions} </li>
            <li>Wind Speed : {current.wind_speed} </li>
            <li>wind_degree : {current.wind_degree} </li>
            <li>Wind Dir : {current.wind_dir} </li>
            <li>Pressure : {current.pressure} </li>
            <li>Precip : {current.precip} </li>
            <li>Humidity : {current.humidity} </li>
            <li>Cloudcover : {current.cloudcover} </li>
            <li>Feelslike : {current.feelslike} </li>
            <li>UV Index : {current.uv_index} </li>
            <li>Visibility : {current.visibility} </li>
            <li>is_day : {current.is_day} </li>
          </ul>
          </React.Fragment>
          ) : (
            <p>There is no Data..</p>
          )}
        </div>
      </Container>
    );
  }
}

export default App;
