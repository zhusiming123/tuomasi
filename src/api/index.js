import  axios from "./axios.js";
//v1.0
//websocket
const socketUrl ="/backend/course/ws/auth";
export const requestSocket = () => {
  return axios.post(socketUrl,{headers : {hideLoading : true,hideToast:true}});
};


//登录接口
const loginUrl = "/jiaowu/user/unauth/brace/login";
export const Login = (params) => {
  return axios.get(loginUrl,{params:params,headers : {hideLoading : true,hideToast : true}});
};


//灰度版本接口验证
const grayUrl = "/jiaowu/grayscale/other/user/isExist";
export const gray = (params) => {
  return axios.get(grayUrl,{params:params});
};


//我的课表接口
const lessonUrl = "/backend/course/web/todayCourses";
export const getLessonList = (params) =>{
  return axios.get(lessonUrl,{params: params,headers : {hideToast:true}});
};


//学情报告首页列表
const teachMsgList = "/backend/course/web/courseList";
export const getTeachList = (params) =>{
  return axios.get(teachMsgList,{params: params,headers : {hideToast:true}});
};


//学情报告页 获取课节列表
const courseListUrl = "/backend/course/web/lessonList";
export const getCourseList = (params)=>{
  return axios.get(courseListUrl,{params: params});
};

//学情报告详情页
const detailUrl = "/backend/course/web/report";
export const getlessonDetail = (params)=>{
  return axios.get(detailUrl,{params:params});
};

//获取班级列表页
const classUrl = "/backend/course/web/classList";
export const getClassList = (params)=>{
  return axios.get(classUrl,{params:params});
};

//获取课堂学情
const courseReporturl = "/backend/course/web/report/info";
export const getCourseReport = (params)=>{
  return axios.get(courseReporturl,{params:params});
};

//点击开始上课
const beginClassUrl = "/backend/course/web/startLesson";
export const beginClass = (params)=>{
  return axios.get(beginClassUrl,{params:params,headers : {hideToast:true}});
};

//上课开始正记时
const startTimeUrl = "/backend/course/web/startedTime";
export const getTime = (params)=>{
  return axios.get(startTimeUrl,{params:params});
};

//获取课程详情班级排名
const classRankUrl = "/backend/course/web/orderClass";
export const getClassRank = (params)=>{
  return axios.get(classRankUrl,{params:params});
};

//学情报告详情页 标题
const titleUrl = "/backend/course/web/questionTital";
export const gerTitleUrl = (params)=>{
  return axios.get(titleUrl,{params:params});
};


//发送练习题
const practiseUrl = "/backend/course/web/sendQuestion";
export const getPractiseUrl = (params)=>{
  return axios.post(practiseUrl,params);
};

//结束答题
const refuseUrl = "/backend/course/web/endQuestion";
export const refuseProject = (params)=>{
  return axios.get(refuseUrl,{params:params});
};

//检查是否有未完成的课程
const checkLessonUrl = "/backend/course/web/checkCourse";
export const checkLesson = (params)=>{
  return axios.get(checkLessonUrl,{params:params});
};

//获取当前课程题目列表
const questionUrl = "/backend/course/web/questions";
export const getQuestionList = (params)=>{
  return axios.get(questionUrl,{params:params});
};

//结束上课
const endLessonUrl = "backend/course/web/endLesson";
export const endLesson = (params)=>{
  return axios.get(endLessonUrl,{params:params});
};

// 获取课程反馈信息
const backMsgUrl = "/backend/course/web/feedbackInfo";
export const getBackMswg = (params)=>{
  return axios.get(backMsgUrl,{params:params});
};

//查看红包发送成功与否
const getMoneyUrl = "/backend/course/web/sendRedPacket";
export const getMoneySendMsg = (params)=>{
  return axios.get(getMoneyUrl,{params:params});
};

//抢红包详情
const moneyDetailList = "/backend/course/web/integralResult";
export const getMoneyDetailList = (params)=>{
  return axios.get(moneyDetailList,{params:params});
};

//再次发送红包
const resetMoney = "/backend/course/web/sendOnePacket";
export const resetSendMoney = (params)=>{
  return axios.get(resetMoney,{params:params});
};


//结束互动
const endSportsUrl = "/backend/course/webApp/endInteract";
export const endSports = (params)=>{
  return axios.get(endSportsUrl,{params:params,headers : {hideLoading : true}});
};


//v1.1

//发送验证码
const sendCodeUrl = "/backend/course/unauth/forgetPassword/sendCode";
export const sendCode = (params)=>{
  return axios.post(sendCodeUrl,params,{headers : {hideToast:true}});
};
// http://school.tengyue360.com/jiaowu/principal/unauth/sendCode/17683926233
//校验验证码
const checkCodeUrl = "/backend/course/unauth/forgetPassword/checkCode";
export const checkCode = (params)=>{
  return axios.post(checkCodeUrl,params,{headers : {hideToast:true}});
};

//检查手机密码的合法性
const checkPhoneUrl = "/backend/course/unauth/web/checkPhone";
export const checkPhone = (params)=>{
  return axios.get(checkPhoneUrl,{params:params,headers:{hideLoading : true,hideToast:true}});
};

//重置新密码
const resetPassWordUrl = "/backend/course/unauth/forgetPassword/update";
export const resetPassWord = (params)=>{
  return axios.post(resetPassWordUrl,params);
};

//获取个人信息详情
const getMsgUrl = "/backend/course/web/teacherInfo";
export const getPersonMsg = (params)=>{
  return axios.get(getMsgUrl,{params:params});
};

//验证密码合法性
const checkPassWordUrl = "/backend/course/web/checkOldPassword";
export const checkPassWord = (params)=>{
  return axios.get(checkPassWordUrl,{params:params,headers:{hideLoading : true,hideToast:true}});
};

//修改密码
const changePassWordUrl = "/backend/course/web/modifyPassword";
export const changePassWord = (params)=>{
  return axios.get(changePassWordUrl,{params:params});
};


//基础标签列表
const getTagsUrl = "/jiaowu/user/brace/tag";
export const getTags = (params)=>{
  return axios.get(getTagsUrl,{params:params});
};


//筛选课程列表
const selectLessonUrl = "/backend/course/web/courseList";
export const selectLesson = (params)=>{
  return axios.get(selectLessonUrl,{params:params,headers : {hideToast:true}});
};


//获取课次列表
const courseListTwoUrl = "/backend/course/web/lessonList";
export const getCourseListTwo = (params)=>{
  return axios.get(courseListTwoUrl,{params: params});
};


//获取下载资源
export const getOutLine = (id)=>{
  return axios.get("/jiaowu/admin/brace/v1/outlinesub/linkList/"+id);
};


//获取下载资源
export const getDowloadList = (id)=>{
  return axios.get("/jiaowu/admin/brace/v1/outlinesub/download/"+id);
};


//获取日历有课日 无课日
const getDateList = "/backend/course/web/month/lessonsInfo";
export const getDate = (params)=>{
  return axios.get(getDateList,{params: params,headers : {hideLoading : true,hideToast:true}});
};


//获取课次详情ppt，讲义
export const getPpt = (id)=>{
  return axios.post("/jiaowu/admin/brace/v1/outlinesub/info/"+id);
};


//获取课次讲义详情
export const getCourseDetail = (id)=>{
  return axios.get("/jiaowu/admin/brace/v1/lesson/attachment/"+id);
};


//获取PK互动排序列表
const PKlistUrl = "/backend/course/web/interactiveResult";
export const PKlist = (params)=>{
  return axios.get(PKlistUrl,{"params":params});
};

//v1.2
//磨课相关接口

//获取助教老师列表
const teacherListUrl = "/backend/course/web/grind/assistants";
export const teacherList = (params)=>{
  return axios.get(teacherListUrl,{params: params});
};

//开始磨课
const discussUrl = "/backend/course/web/startGrind";
export const discuss = (params)=>{
  return axios.get(discussUrl,{params: params});
};

//视频token
const videoTokenUrl = "/backend/course/video/token";
export const videoToken = (params)=>{
  return axios.get(videoTokenUrl,{params: params});
};

//磨课详情
const discussDetailUrl = "/backend/course/web/grind/info";
export const discussDetail = (params)=>{
  return axios.get(discussDetailUrl,{params: params});
};

//结束反馈
const endUplateUrl = "/backend/course/webApp/endFeedBack";
export const endUplate = (params)=>{
  return axios.get(endUplateUrl,{params: params,headers : {hideLoading : true}});};
    
//班级练习数据统计列表
const reportList = "/backend/course/web/summary";
export const getReportList = (params)=>{
  return axios.get(reportList,{params:params});
};

//答题前十排行列表
const rankingUrl = "/backend/course/web/ranking";
export const ranking = (params)=>{
  return axios.get(rankingUrl,{params:params});
};


//二次发送班级习题
const sendQuestionAgainUrl = "/backend/course/web/sendQuestionAgain";
export const sendQuestionAgain = (params)=>{
  return axios.get(sendQuestionAgainUrl,{params:params});
};
    

//v1.4

// /web/questionLibrary/detai  get请求

const getQuestionBankUrl = "/backend/course/web/questionLibrary/detail";
export const getQuestionBank = (params)=>{
  return axios.get(getQuestionBankUrl,{params:params});
};