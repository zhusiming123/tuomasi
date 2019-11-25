import  axios from "./axios.js";


//查询当前班级是否有倒计时
const selectCountDownUrl ="/backend/teacher/lesson/countdown";
export const selectCountDown = (params) => {
  return axios.get(selectCountDownUrl,{params:params});
};

//开始倒计时
const countDownUrl ="/backend/teacher/lesson/countdown/start";
export const countDown = (params) => {
  return axios.get(countDownUrl,{params:params});
};

//结束倒计时
const endCountDownUrl ="/backend/teacher/lesson/countdown/end";
export const endCountDown = (params) => {
  return axios.get(endCountDownUrl,{params:params});
};

//班级表扬班级列表
const praiseListUrl ="/backend/teacher/reward/list";
export const praiseList = (params) => {
  return axios.get(praiseListUrl,{params:params});
};

//班级表扬-发送奖励
const sendPraiseUrl ="/backend/teacher/reward/send";
export const sendPraise = (params) => {
  return axios.post(sendPraiseUrl,params);
};


//主讲会议室查询入口
const reseachPartyUrl ="/backend/course/cloudRoom/info";
export const reseachParty = (params) => {
  return axios.get(reseachPartyUrl,{params:params});
};

/**
 * 会控部分
 * 获取scheduleId
 * @type {string}
 */
const getScheduleIdUrl = '/jiaowu/admin/brace/v1/lesson/info/'
export const getScheduleId = (lessonId,params) => {
  return axios.get(getScheduleIdUrl+lessonId,{params:params})
}
//会议主持-会议室详情列表
const xylinkMeetingUrl ="/backend/teacher/preside/meeting";
export const xylinkMeeting = (params) => {
  return axios.get(xylinkMeetingUrl,{params:params,headers:{hideLoading:true}});
};

//会议主持-全体静音
const keepQuiteUrl ="/backend/teacher/preside/muteAll";
export const keepQuite = (params) => {
  return axios.get(keepQuiteUrl,{params:params});
};

//会议主持-邀请入会
const invitationUrl ="/backend/teacher/preside/invitation";
export const invitation = (params) => {
  return axios.post(invitationUrl,params,{headers:{hideToast : true}});
};

//会议主持-结束会议
const endMeetingUrl ="/backend/teacher/preside/endMeeting";
export const endMeeting = (params) => {
  return axios.get(endMeetingUrl,{params:params});
};

//会议主持-开麦&闭麦
const muteUrl ="/backend/teacher/preside/mute";
export const mute = (params) => {
  return axios.post(muteUrl,params);
};


//会议主持-随机开麦
const unmuteUrl ="/backend/teacher/preside/randomUnmute";
export const unmute = (params) => {
  return axios.get(unmuteUrl,{params:params});
};

//会议主持-伪随机开麦
const shamUrl ="/backend/teacher/preside/randomUnmute/sham";
export const sham = (params) => {
  return axios.post(shamUrl,params);
};

//会议主持-挂断
const disconnectUrl ="/backend/teacher/preside/disconnect";
export const disconnect = (params) => {
  return axios.post(disconnectUrl,params);
};

//会议主持-开始录制
const startRecordingUrl ="/backend/teacher/preside/startRecording";
export const startRecording = (params) => {
  return axios.get(startRecordingUrl,{params:params});
};

//会议主持-结束录制
const endRecordingUrl ="/backend/teacher/preside/endRecording";
export const endRecording = (params) => {
  return axios.get(endRecordingUrl,{params:params});
};

//主持会议-设置主会场
const mainImageUrl ="/backend/teacher/preside/mainImage";
export const mainImage = (params) => {
  return axios.post(mainImageUrl,params);
};
