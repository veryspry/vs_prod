import React from 'react'
import { connect } from 'react-redux'
import DaysSelector from './DaysSelector'
// import { addDay, fetchTimeline, addCoffee, addMusic, addResource } from '../../redux/actions'
import { addDay, fetchTimeline, addCoffee, addMusic, addResource } from '../../store'

import { months } from './helperData'


class Add extends React.Component {
  constructor() {
    super()
    this.state = {
        month: '',
        day: '',
        year: '',
        focus: '',
        coffeeName: '',
        coffeeRoaster: '',
        coffeeDayId: '',
        albumTitle: '', // MUST BE NULL TO PROPERLY INTERFACE WITH API ROUTES/DB
        songTitle: '', // MUST BE NULL TO PROPERLY INTERFACE WITH API ROUTES/DB
        albumArtist: '',
        musicDayId: '',
        resourceName: '',
        resourceUrl: '',
        resourceDayId: '',
    }
    // this.clearForm = this.clearForm.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchTimeline()
    console.log(this.props.timeline);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleDayIdChange = event => {
  //   this.set
  // }

  // ADD A DAY TO THE DB
  daySubmit = async event => {
    event.preventDefault()
    console.log(this.state.month, this.state.day, this.state.year, this.state.focus)
    try {
      await this.props.addDay(this.state.month, this.state.day, this.state.year, this.state.focus)
      this.clearDay()
    }
    catch (err) {
      console.log(err)
    }
  }

  clearDay = () => {
    this.setState({
      month: '',
      day: '',
      year: '',
      focus: '',
    })
  }

  coffeeSubmit = async event => {
    event.preventDefault()
    try {
      await this.props.addCoffee(this.state.coffeeName, this.state.coffeeRoaster, this.state.coffeeDayId)
      this.clearCoffee()
    }
    catch (err) {
      console.log(err)
    }
  }

  clearCoffee = () => {
    this.setState({
      coffeeName: '',
      coffeeRoaster: '',
      // coffeeDayId: '',
    })
  }

  musicSubmit = async event => {
    event.preventDefault()
    try {
      await this.props.addMusic(this.state.albumTitle, this.state.songTitle, this.state.albumArtist, this.state.musicDayId)
      this.clearMusic()
    }
    catch (err) {
      console.log(err)
    }
  }

  clearMusic = () => {
    this.setState({
      albumTitle: '',
      songTitle: '',
      albumArtist: '',
      // musicDayId: '',
    })
  }

  resourceSubmit = async event => {
    event.preventDefault()
    try {
      await this.props.addResource(this.state.resourceName, this.state.resourceUrl, this.state.resourceDayId)
      this.clearResource()
    }
    catch (err) {
      console.log(err)
    }
  }

  clearResource = () => {
    this.setState({
      resourceName: '',
      resourceUrl: '',
      // resourceDayId: '',
    })
  }

  render () {
    return (
      <div className="all-forms-wrapper">

        <div className="submit-form-wrapper day-form">
          <h1 className="add-form-title">Add some stuff</h1>

          {/* submit day */}
          <form onSubmit={this.daySubmit} >

            <div className="input-wrapper">
              <label htmlFor='month' >Month:</label>

              <select name='month' onChange={this.handleChange}>
                <option value="title">--Select month--</option>
                {months.map(month => {
                  return (
                    <option value={month} key={month}>{month}</option>
                  )
                })}
              </select>

              <div className="input-wrapper">
                <label htmlFor='day' >Day:</label>
                <input type='text' name='day' value={this.state.day} onChange={this.handleChange} ></input>
              </div>

              <div className="input-wrapper">
                <label htmlFor='day' >Year:</label>
                <input type='text' name='year' value={this.state.year} onChange={this.handleChange} ></input>
              </div>

            </div>

            <div className="input-wrapper">
              <label htmlFor='focus' >Focus:</label>
              <textarea type='text' name='focus' value={this.state.focus} onChange={this.handleChange} ></textarea>
            </div>
            <div className="add-form-button-wrapper">
              <button type='submit'>Submit</button>
              <button type="button" onClick={this.clearForm}>Clear</button>
            </div>

          </form>
        </div>

        {/* submit coffee */}
        <div className="submit-form-wrapper coffee-form">
          <form onSubmit={this.coffeeSubmit} >
            <div className="input-wrapper">
              <label htmlFor='coffeeName' >Coffee Name:</label>
              <input type='text' name='coffeeName' value={this.state.coffeeName} onChange={this.handleChange} ></input>
            </div>

            <div className="input-wrapper">
              <label htmlFor='coffeeRoaster' >CoffeeRoaster:</label>
              <input type='text' name='coffeeRoaster' value={this.state.coffeeRoaster} onChange={this.handleChange} ></input>
            </div>

            <DaysSelector handleChange={this.handleChange} timeline={this.props.timeline} name="coffeeDayId" />

            <div className="add-form-button-wrapper">
              <button type='submit'>Submit</button>
              <button type="button" onClick={this.clearForm}>Clear</button>
            </div>

          </form>
        </div>

        {/* submit music */}
        <div className="submit-form-wrapper music-form">
          <form onSubmit={this.musicSubmit} >

            <div className="input-wrapper">
              <label htmlFor='albumTitle' >Album Title: (optional)</label>
              <input type='text' name='albumTitle' value={this.state.albumTitle} onChange={this.handleChange} ></input>
            </div>

            <div className="input-wrapper">
              <label htmlFor='songTitle' >Song Title: (optional)</label>
              <input type='text' name='songTitle' value={this.state.songTitle} onChange={this.handleChange} ></input>
            </div>

            <div className="input-wrapper">
              <label htmlFor='albumArtist' >Album Artist:</label>
              <input type='text' name='albumArtist' value={this.state.albumArtist} onChange={this.handleChange} ></input>
            </div>

            <DaysSelector handleChange={this.handleChange} timeline={this.props.timeline} name="musicDayId" />

            <div className="add-form-button-wrapper">
              <button type='submit'>Submit</button>
              <button type="button" onClick={this.clearForm}>Clear</button>
            </div>
          </form>
        </div>

        {/* submit resource */}
        <div className="submit-form-wrapper resource-form">
          <form onSubmit={this.resourceSubmit} >
            <div className="input-wrapper">
              <label htmlFor='resourceName' >Resource Name:</label>
              <input type='text' name='resourceName' value={this.state.resourceName} onChange={this.handleChange} ></input>
            </div>

            <div className="input-wrapper">
              <label htmlFor='resourceUrl'>Resource URL:</label>
              <input type='text' name='resourceUrl' value={this.state.resourceUrl} onChange={this.handleChange}></input>
            </div>

            <DaysSelector handleChange={this.handleChange} timeline={this.props.timeline} name="resourceDayId" />

            <div className="add-form-button-wrapper">
              <button type='submit'>Submit</button>
              <button type="button" onClick={this.clearForm}>Clear</button>
            </div>
          </form>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  timeline: state.timeline
})

const mapDispatchToProps = dispatch => ({
  fetchTimeline: () => dispatch(fetchTimeline()),
  addDay: (month, day, year, focus) => dispatch(addDay(month, day, year, focus)),
  addCoffee: (name, roaster, dayId) => dispatch(addCoffee(name, roaster, dayId)),
  addMusic: (album, song, artist, dayId) => dispatch(addMusic(album, song, artist, dayId)),
  addResource: (name, resourceUrl, dayId) => dispatch(addResource(name, resourceUrl, dayId))
})

// add my state and dispathc thunks here

export default connect(mapStateToProps, mapDispatchToProps)(Add)
