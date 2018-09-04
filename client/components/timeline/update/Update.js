import React from 'react'
import { connect } from 'react-redux'
import { fetchDay, updateDay } from '../../../redux/actions'
import { months } from '../helperData'


class Update extends React.Component {

  constructor() {
    super()
    this.state = {
      month: '',
      day: '',
      year: '',
      focus: '',
      coffees: [],
      music: [],
      resources: [],
    }

  }


  async componentDidMount() {

    await this.props.fetchDay(this.props.match.params.id)

    await this.setState({
      month: this.props.selectedDay.month,
      day: this.props.selectedDay.day,
      year: this.props.selectedDay.year,
      focus: this.props.selectedDay.focus,
      coffees: this.props.selectedDay.coffees,
      music: this.props.selectedDay.music,
      resources: this.props.selectedDay.resources,
    })
    console.log(this.state);
  }

  handleChange = event => {
   this.setState({
     [event.target.name]: event.target.value
   })
   console.log(this.state);
 }

 daySubmit = event => {
   event.preventDefault()
   const dayId = this.props.match.params.id
   this.props.updateDay(dayId, this.state)
   this.props.fetchDay(dayId)
 }


  render() {
    return (
      <div className="submit-form-wrapper day-form">
          <h1 className="add-form-title">Update some stuff</h1>

          {/* upate day */}
          <form onSubmit={this.daySubmit} >

            <div className="input-wrapper">
              <label htmlFor='month' >Month:</label>

              <select name='month' onChange={this.handleChange} value={this.state.month}>
                <option value="">--Select month--</option>
                {months.map(month => {
                  return (
                    <option value={month} key={month}>{month}</option>
                  )
                })}
              </select>
            </div>

              <div className="input-wrapper">
                <label htmlFor='day' >Day:</label>
                <input type='text' name='day' value={this.state.day} onChange={this.handleChange} ></input>
              </div>

              <div className="input-wrapper">
                <label htmlFor='year' >Year:</label>
                <input type='text' name='year' value={this.state.year} onChange={this.handleChange} ></input>
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
    )
  }
}

const mapStateToProps = state => ({
  selectedDay: state.selectedDay
})

const mapDispatchToProps = dispatch => ({

  fetchDay: (dayId) => dispatch(fetchDay(dayId)),

  updateDay: (dayId, dayData) => dispatch(updateDay(dayId, dayData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Update)
