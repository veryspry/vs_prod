import axios from 'axios'

// Action Types
const GOT_TIMELINE = 'GOT_TIMELINE'
const DAY_ADDED = 'DAY_ADDED'  // PROBABLY CAN REMOVE THIS
const GOT_DAY = 'GOT_DAY'

// -------------------------------------------
// ACTION CREATORS
// -------------------------------------------
const gotDays = days => ({
  type: GOT_TIMELINE,
  days
})

const dayAdded = day => ({ // PROBABLY CAN REMOVE THIS
  type: DAY_ADDED,
  day
})

const gotDay = day => ({
  type: GOT_DAY,
  day
})

// -------------------------------------------
// THUNKS
// -------------------------------------------

// get entire timeline
const fetchTimeline = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/timeline')
      dispatch(gotDays(data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

const fetchDay = dayId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/timeline/${dayId}`)
      dispatch(gotDay(data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

// add a single day
const addDay = (month, day, year, focus) => {
  return async dispatch => {
    try {
      await axios.post('/api/timeline/add/day', {
          month: month,
          day: day,
          year: year,
          focus: focus,
      })
      // get the new timeline so that redux state updates & react can re-render if necessary
      dispatch(fetchTimeline())
    }
    catch (err) {
      console.log(err)
    }
  }
}

const addCoffee = (name, roaster, dayId) => {
  return async dispatch => {
    try {
      await axios.post('/api/timeline/add/coffee', {
        name,
        roaster,
        dayId,
      })
      dispatch(fetchTimeline())
    }
    catch (err) {
      console.log(err)
    }
  }
}

const addMusic = (album, song, artist, dayId) => {
  return async dispatch => {
    try {
      await axios.post('/api/timeline/add/music', {
        album,
        song,
        artist,
        dayId,
      })
      dispatch(fetchTimeline())
    }
    catch (err) {
      console.log(err)
    }
  }
}

const addResource = (name, resourceUrl, dayId) => {
  return async dispatch => {
    try {
      await axios.post('/api/timeline/add/resource', {
        name,
        resourceUrl,
        dayId,
      })
      dispatch(fetchTimeline())
    }
    catch (err) {
      console.log(err)
    }
  }
}

const UpdateDay = (dayId, dayData) => {
  console.log('inside Updat day thunk');
  return async dispatch => {
    try {
      await axios({
        method: 'put',
        url: `/api/timeline/update/${dayId}`,
        data: {
          month: dayData.month,
          day: dayData.day,
          year: dayData.year,
          focus: dayData.focus,
        }
      })
      dispatch(fetchDay(dayId))
    }
    catch (err) {
      console.log(err)
    }
  }
}

const defaultState = []

// -------------------------------------------
// REDUCER
// -------------------------------------------

export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_TIMELINE:
      return action.days
    default:
      return state
  }
}


export {
  GOT_TIMELINE,
  GOT_DAY,
  fetchTimeline,
  addDay,
  addCoffee,
  addMusic,
  addResource,
  gotDay,
  fetchDay,
  UpdateDay,
}
