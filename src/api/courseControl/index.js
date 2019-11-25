import Base from './Base'
const AUDIO_AND_VIDEO_API_URL = 'http://teachserver.yiyatalk.com'

class CourseControlApi extends Base {
  constructor () {
    super()
    this.loopQueryscheduleUrl = AUDIO_AND_VIDEO_API_URL + '/api/schedule_self/schedule_status'
    this.beginTeachingUrl = AUDIO_AND_VIDEO_API_URL + '/api/schedule_self/self_begin_teaching'
    this.endTeachingUrl = AUDIO_AND_VIDEO_API_URL + '/api/schedule_self/self_end_teaching'
    this.resetTeachingUrl = AUDIO_AND_VIDEO_API_URL + '/api/schedule_self/reset_schedule'
    this.allDisconnectUrl = AUDIO_AND_VIDEO_API_URL + '/api/conference/outsConference'
    this.allConnectUrl = AUDIO_AND_VIDEO_API_URL + '/api/conference/entersConference'
    this.addDeviceUrl = AUDIO_AND_VIDEO_API_URL + '/api/schedule_self/add_temp_class_schedule'
    this.oneConnectUrl = AUDIO_AND_VIDEO_API_URL + '/api/conference/enterConference'
    this.oneDisConnectUrl = AUDIO_AND_VIDEO_API_URL + '/api/conference/outConference'
    this.switchMicUrl = AUDIO_AND_VIDEO_API_URL + '/api/conference/adjustAudioStatus'
    this.switchScreenUrl = AUDIO_AND_VIDEO_API_URL + '/api/conference/adjustModeStatus'
    this.screenTopUrl = AUDIO_AND_VIDEO_API_URL + '/api/schedule_self/top_video'
    this.changeVolumeUrl = AUDIO_AND_VIDEO_API_URL + '/api/conference/adjustAudioSize'
    this.queryRoomByEditUrl = AUDIO_AND_VIDEO_API_URL+'/api/schedule_self/find_room_tenant'
    this.confirmEditUrl = AUDIO_AND_VIDEO_API_URL + '/api/schedule_self/modify_schedule_room'
    this.deleteClassRoomUrl = AUDIO_AND_VIDEO_API_URL + '/api/schedule_self/remove_class_schedule'
    // 教室仅听主讲麦
    this.classroomOnlyListenSpeakerUrl = AUDIO_AND_VIDEO_API_URL + '/api/conference/adjustAudioConnectStatus'
  }

  // 页面轮询查询数据
  loopQueryscheduleApi (data, isHideLoading) {
    return this.sendPost(this.loopQueryscheduleUrl, data, isHideLoading)
  }
  // 开始教学
  beginTeachingApi (data) {
    return this.sendPost(this.beginTeachingUrl, data)
  }

  // 结束教学
  endTeachingApi (data) {
    return this.sendPost(this.endTeachingUrl, data)
  }

  // 重置教学计划
  resetTeachingApi (data) {
    return this.sendPost(this.resetTeachingUrl, data)
  }

  // 一键断开
  allDisconnectApi (data) {
    return this.sendPost(this.allDisconnectUrl, data)
  }

  // 一键连接
  allConnectApi (data) {
    return this.sendPost(this.allConnectUrl, data)
  }

  // 教室仅听主讲麦
  classroomOnlyListenSpeakerApi (data) {
    return this.sendPost(this.classroomOnlyListenSpeakerUrl, data)
  }

  // 添加设备(添加临时班级）
  addDeviceApi (data) {
    return this.sendPost(this.addDeviceUrl, data)
  }

  // 单个连接
  oneConnectApi (data) {
    return this.sendPost(this.oneConnectUrl, data)
  }

  // 单个断开
  oneDisConnectApi (data) {
    return this.sendPost(this.oneDisConnectUrl, data)
  }

  // 开关麦克风
  switchMicApi (data) {
    return this.sendPost(this.switchMicUrl, data)
  }

  // 切换幕布
  switchScreenApi (data) {
    return this.sendPost(this.switchScreenUrl, data)
  }

  // 置顶
  screenTopApi (data) {
    return this.sendPost(this.screenTopUrl, data)
  }

  // 音量改变
  changeVolumeApi (data) {
    return this.sendPost(this.changeVolumeUrl, data)
  }

  // 点击编辑查询方法
  queryRoomByEditApi (data) {
    return this.sendPost(this.queryRoomByEditUrl, data)
  }
  // 确认编辑方法
  confirmEditApi (data, isHideLoading) {
    return this.sendPost(this.confirmEditUrl, data, isHideLoading)
  }
  // 删除教室方法
  deleteClassRoomApi (data) {
    return this.sendPost(this.deleteClassRoomUrl, data)
  }
}

export default new CourseControlApi()
