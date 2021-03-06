import React, { Component } from 'react'
import PictureUpload from './PictureUpload'
import axios from 'axios'

export default class UploadForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      url: '',
      description: '',
      street: '',
      cross_street: ''
    }
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  onFormChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleFileUpload = async (e) => {
    this.setState({ file: e.target.files })
    const formData = new FormData();
    let photo = e.target.files[0]
    formData.append('file', photo, photo.name)
    await axios.post(`https://streetstagram.herokuapp.com/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      this.setState({ url: response.data.Location })
    }).catch(error => {
      console.log(error)
    })
  }

  onFormSubmit = async (event) => {
    var form = event.target;
    event.preventDefault()
    form.reset();

    let data = {
      image: this.state.url,
      description: this.state.description,
      street: this.state.street,
      cross_street: this.state.cross_street
    }

    await fetch('https://streetstagram.herokuapp.com/post', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        response.json()
      })

    this.setState({
      file: null,
      url: '',
      description: '',
      street: '',
      cross_street: ''
    })

    window.location.pathname = '/'
  }

  render() {
    return (
      <form className='uploadform--uploadformcontain' onSubmit={this.onFormSubmit}>

        <div className='uploadform--uploadform--url'>
          <label htmlFor='url'>Select Photo</label>
          <br />
          <input
            id='photoSelect'
            label='upload file'
            type='file'
            name='url'
            value={this.state.value}
            onChange={this.handleFileUpload}
          />
        </div>

        <div className='uploadform--uploadform--description'>
          <label htmlFor='description'>Photo Description</label>
          <br />
          <input
            id='photoDescription'
            name='description'
            type='string'
            value={this.state.value}
            onChange={this.onFormChange}
          />
        </div>

        <div className='uploadform--uploadform--street'>
          <label htmlFor='street'>Street</label>
          <br />
          <input
            id='photoStreet'
            name='street'
            type='string'
            value={this.state.value}
            onChange={this.onFormChange}
          />
        </div>

        <div className='uploadform--uploadform--crossstreet'>
          <label htmlFor='cross_street'>Cross Street</label>
          <br />
          <input
            id='photoCross'
            name='cross_street'
            type='string'
            value={this.state.value}
            onChange={this.onFormChange}
          />
        </div>

        <div className='uploadform--uploadform--button'>
          <button
            id='photoSubmit'
            type='submit'
            value='submit'
            text='Submit Photo'>
            Submit Photo</button>
        </div>
      </form>
    )
  }
}

