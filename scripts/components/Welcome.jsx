import React from 'react'
import { Link } from 'react-router'

const Welcome = () => (
  <div className='welcome'>
    <h1>Welcome</h1>
    <Link to='locales'><button className='waves-effect waves-light btn'>Enter</button></Link>
  </div>
)

export default Welcome
