import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import {  Typography } from '@material-ui/core';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaLogo from './images/logo.png'
class App extends React.Component {

  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData ();

    this.setState({ data: fetchedData})
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData (country);
    this.setState({ data: fetchedData, country: country})
  }

  render(){
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaLogo} alt="covid-19" />
        <Typography color="primary" variant="h4" gutterBottom>{country? country : "Global"}</Typography>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <Typography color="secondaryText" gutterBottom>Data from https://covid19.mathdro.id/api </Typography>
      </div>
    )
  }
}

export default App;
