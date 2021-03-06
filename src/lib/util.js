let util = {
  openModal: (content) => {
    var modal = document.createElement('div')
    modal.id = 'httpModal'
    modal.innerHTML = '<i class=\'ivu-icon ivu-icon-close-circled\' style=\'color: #eb4449\'></i><span style=\'padding-left:12px\'>' + content + '</span>'
    document.body.appendChild(modal)
    setTimeout(function () {
      document.body.removeChild(modal)
    }, 1500)
  },
  parseDate (timestamp) {
    let date = new Date(timestamp)
    let Y = date.getFullYear() + '年'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
    let D = date.getDate() + '日'
    /* h = date.getHours() + ':'
        m = date.getMinutes() + ':'
        s = date.getSeconds() */
    return Y + M + D
  }
}
util.title = function (title) {
  title = title ? '河南联合奖惩-' + title : '河南信用'
  window.document.title = title
}
util.responseProcessor = function (res) {

  if (res) {
    let httpCode = res.status
    if (httpCode >= 200 && httpCode <= 299) {
      if (res.data.code === '1001') {
        let url = location.href
        if (url.startsWith('/login')) {
          return {code: '1', msg: '登录失败,用户名或密码错误'}
        } else {
          url = encodeURIComponent(url)
          this.openModal('没有登录系统：' + res.data.msg)
          location.href = `/login?return=${url}`
        }
      } else if (res.data.code === '1') {
        this.openModal('请求失败：' + res.data.msg)
      } else {
        try{
          return JSON.parse(res.request.responseText)
        }
        catch(e){
          return {code: '1', error: '返回数据格式不正确'}
        }

      }
    } else {

      this.openModal('后台接口失败，返回状态码：' + httpCode)
      return {code: '1', msg: res.data.error}
    }
  } else {
    return {code: '1', error: '没有找到有效数据'}
  }
}

export default util
