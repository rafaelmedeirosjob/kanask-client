import axios from 'axios'

export default {
  request (method, uri, data = null) {
    if (!method) {
      return
    }

    if (!uri) {
      return
    }
    var url = "https://kankask.herokuapp.com" + uri
    return axios({ method, url, data })
  }
}
