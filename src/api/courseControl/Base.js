import axios from './../axios'
// service 基础类，只用于继承
class Base {
  /**
   * Get请求
   * @param { String } url
   * @param { Object } params
   * @param { Boolean } mute 是否loading，默认false
   */
  sendGet (url, params, mute = false) {
    return axios.get(url, { params }).then(response => {
      return response.data
    }).catch(() => {
      console.log('get error')
    })
  }

  /**
   * Post 请求
   * @param { String } url
   * @param { Object } data
   */
  sendPost (url, data, isHideLoading) {
    const config = { header:{hideLoading: isHideLoading} }
    return axios.post(url, data,config).then(response => {
      return response.data
    }).catch((response) => {
      return response
    })
  }
}

export default Base
