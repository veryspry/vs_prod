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

  state = {
    width: window.innerWidth,
  }

  async componentDidMount() {
    // get the timeline
    const data = await this.props.fetchTimeline()
    // get the window size
    window.addEventListener('resize', this.getWidth)
  }

  getWidth = () => {
    this.setState({width: window.innerWidth})
  }

  render () {
    const timeline = this.props.timeline.days

    if (timeline.length > 0) {
      return (
        <div className={
          this.state.width > 800
          ? 'timeline-wrapper large-top-margin'
          : 'timeline-wrapper small-top-margin'
          }>
          {timeline.map(day => {
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
