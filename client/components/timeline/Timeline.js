import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import { fetchTimeline } from '../../redux/actions'
import { fetchTimeline } from '../../store/'

import Coffee from './Coffee'
import Music from './Music'
import Resources from './Resources'

// import timelineDummy from './dummy-data'



class Timeline extends React.Component {

  async componentDidMount() {
    const data = await this.props.fetchTimeline()

    console.log('data!!!!!!', data)
  }


  render () {
    const timeline = this.props.timeline.days
    console.log('inside render', timeline);

    if (timeline.length > 0) {
      return (
        <div className="timeline-wrapper">
          {timeline.map(day => {
            console.log('the day info', day);
            return (
              <div key={day.id}>
                <div  className="day-wrapper">
                  <div className="date-div">
                    <h5 className="date" >{day.day} {day.month}, {day.year}</h5>
                  </div>
                  <h3 className="learned">{day.focus}</h3>
                  <Coffee coffees={day.coffees} />
                  <Music music={day.music} />

                  {day.resources.length > 0 && <h3 className="cool-things">Things I found today: </h3>}

                  <Resources resources={day.resources} />

                </div>
                <div className="day-seperator" />
              </div>
            )
          })}
        </div>
      )
    }
    else {
      return (
        <h1>loading...</h1>
      )
    }
  }
}

// get this bad boy hooked up & listening to the redux store
const mapStateToProps = state => ({
  timeline: state.timeline
})

const mapDispatchToProps = dispatch => ({
  fetchTimeline: () => dispatch(fetchTimeline()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
