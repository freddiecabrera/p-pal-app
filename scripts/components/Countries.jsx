import React from 'react'
const Table = React.createClass({
  deleteProperty (property) {
    console.log(property);
    this.props.properties.filter(items => items !== property)
    console.log(this.props)
  },
  render () {
    console.log('table', this.props)
    return (
      <div>
        <ul className='collection with-header'>
          <li className='collection-header'><h4>{this.props.property}</h4></li>
          <li className='collection-item'><div>key : value<a className='secondary-content'><i className='material-icons'>delete</i></a></div></li>
        </ul>
        { this.props.properties.map(item => (
          <ul className='collection with-header' key={item}>
            <li className='collection-header'><h4>{item}</h4></li>
            <li className='collection-item'><div>key : value<a className='secondary-content' onClick={this.deleteProperty.bind(null, item)}><i className='material-icons'>delete</i></a></div></li>
          </ul>
        ))}
      </div>
    )
  }
})

export default Table


// https://api.github.com/repos/unicode-cldr/cldr-misc-full/contents/main/de/delimiters.json
