import React from 'react'
import Loader from './Loader'
import axios from 'axios'

const Locales = React.createClass({
  getInitialState () {
    return {
      modulOn: false,
      submitted: false,
      data: [],
      fetching: true,
      name: '',
      property: '',
      form: {},
      addedProperties: [],
      countryData: {}
    }
  },
  handleNameChange (event) {
    this.setState({ name: this.refs.name.value })
  },
  handleChange (event) {
    this.setState({ property: this.refs.property.value })
  },
  handleFormSubmit (e) {
    e.preventDefault()
    this.setState({ form: {name: this.state.name} })
    this.setState({ submitted: true })
  },
  resetForm () {
    this.setState({ form: {}, submitted: false, name: '', addedProperties: [] })
  },
  addProperty (property) {
    this.setState({ addedProperties: [...this.state.addedProperties, property], property: '' })
  },
  deleteProperty (property) {
    this.setState({ addedProperties: this.state.addedProperties.filter(items => items !== property) })
  },
  triggerModul () {
    if (this.state.modulOn === true) {
      return this.setState({ modulOn: false })
    }
    return this.setState({ modulOn: true })
  },
  checkForCountry (country) {
    this.state.data.map(data => {
      if (data.name === country) {
        return this.getCountryData(country)
      } else {
        return 'No data from that country'
      }
    })
  },
  dataReducer (collection, target) {
    for (let key in collection) {
      if (key === target) {
        if (typeof collection[key] !== 'string') {
          return JSON.stringify(collection[key])
        }
        return collection[key]
      } else if (key !== target && typeof collection[key] === 'object') {
        let nestedCollection = collection[key]
        for (let keyTwo in nestedCollection) {
          if (keyTwo === target) {
            return JSON.stringify(nestedCollection[keyTwo])
          }
        }
        return this.dataReducer(collection[key], target)
      }
      return 'not found'
    }
  },
  b64DecodeUnicode (str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  },
  getCountryData (country) {
    axios.get(`https://api.github.com/repos/unicode-cldr/cldr-misc-full/contents/main/${country}/delimiters.json`)
      .then(respone => {
        this.setState({ countryData: JSON.parse(this.b64DecodeUnicode(respone.data.content)) })
      })
      .catch(error => {
        console.log(error)
      })
  },
  componentDidMount () {
    axios.get('https://api.github.com/repos/unicode-cldr/cldr-misc-full/contents/main')
      .then(respone => {
        this.setState({ data: respone.data, fetching: false })
      })
      .catch(error => {
        console.log('axios error', error)
      })
  },
  render () {
    console.log(this.state)
    return (
      this.state.fetching ? <Loader />
        : <div className='container' style={{marginTop: '6em'}}>
          <div className='row'>
            <form className='col s12' onSubmit={this.handleFormSubmit}>
              <div className='row'>
              {!this.state.submitted
                 ? <div className='input-field col s12'>
                   <input className='property-input' type='text' ref='name' value={this.state.name} onChange={this.handleNameChange} />
                   <label>Country</label>
                    {this.state.name.length !== 0 ? <span style={{color: 'red'}}>Countries are case sensitive</span> : null}
                 </div>
                : <div className='input-field col s12'>
                  <input className='property-input' type='text' ref='property' value={this.state.property} onChange={this.handleChange} />
                  <label>Property</label>
                </div>}
              </div>
              <div>
                {!this.state.submitted ? <button type='submit' className='waves-effect waves-light btn' onClick={this.checkForCountry.bind(null, this.state.name)}>Enter</button>
                : <div>
                  <button type='submit' className='btn-floating btn-large waves-effect waves-light indigo accent-4' onClick={this.addProperty.bind(null, this.state.property)}><i className='material-icons'>add</i></button>
                  <button type='button' className='waves-effect waves-light btn' onClick={this.resetForm}>New Search</button>
                </div>}
              </div>
            </form>
          </div>
          <div>
            {this.state.addedProperties.map(item => (
              <ul className='collection with-header z-depth-1' key={item}>
                <span className='secondary-content' onClick={this.deleteProperty.bind(null, item)}><i className='material-icons clear-icon'>clear</i></span>
                <li className='collection-item'><h5>{item} : </h5><pre><code>{this.dataReducer(this.state.countryData, item)}</code></pre></li>
              </ul>
            ))}
          </div>
          <div className='fixed-action-btn horizontal' style={{top: '45px', right: '24px'}}>
            <a className='btn-floating btn-large indigo accent-4 waves-effect waves-light' onClick={this.triggerModul}>
              <i className='large material-icons'>help</i>
            </a>
          </div>
          {this.state.modulOn
            ? <div className='my-modul z-depth-4'>
              <span className='modul-clear' onClick={this.triggerModul}><i className='material-icons clear-icon'>clear</i></span>
              <h5>List of Countries</h5>
              <ul>
                  {this.state.data.map(item => {
                    return <li key={item.name}>{item.name}</li>
                  })}
              </ul>
            </div> : null}
        </div>
    )
  }
})

export default Locales
