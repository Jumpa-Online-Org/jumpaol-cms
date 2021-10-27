import axios from "axios";

const baseURL = 'https://api-jumpaol.herokuapp.com/api/posts'

export const getPosts = (page) => {
  return async dispatch => {
      const response = await axios.get(`${baseURL}?q=&page=${page}&per_page=10`)
      let newDate, displayDate
      const tes = response?.data?.data?.data.map((item) => {
        newDate = new Date(item.post_date)
        displayDate  = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
        // console.log(displayDate)
        return {
          ...item,
          author_name: item.author.display_name,
          displayDate: displayDate
        }})
      const data = {...response.data.data, data: tes}
      // console.log(data)
      dispatch(getPostsSuccess(data))
    }
}

export const getPostsSuccess = data => {
  return ({
    type: "GET_POSTS",
    payload: data
  })
}
