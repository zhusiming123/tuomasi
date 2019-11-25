import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import {getLessonList} from '@/api/index'
Vue.use(Vuex)
const state = {
    toastType:false,
    lessonMsg:{},
    loading:false,
    errorType:false,
    errorTxt:'',
    tabIndexNum:5,
    stepNum:'',

    //上课界面tab切换
    sportsType:1,
    practiseType:1,
    backStepsType:1,
    questionBankType:1,
    reportType:1,
    toolType:1,
    xylinkType:1,
    //上课界面url路由地址
    sportsUrl:null,
    practiseUrl:null,
    backStepsUrl:null,
    reportUrl:null,
    questionBankUrl:null,
    toolUrl:null,
    xylinkUrl:null,

    sportsSteps:'',
    contentType:'',
    teacheDocument:1,
    calenderTypeCheck:false,
    interError:false,

    //我的课表
    listType:false,
    lessonList:[],
    lessonNumber:0,
    totalPage:0,
    date:'',
    lessonType:1,

    //websocket数据
    practiseMsg:{},
    sportsMsg:{},
    backUplateMsg:{},
    sportsClassMsg:[],

    tikuPractiseMsg:{},
    lianxiPractiseMsg:{},

    //题库数据
    questionDetail:null,
    questionIndex:null,
    tabnum:1,

    //判断发送题目是否为题库题目
    questionType:false,

    //备课详情
    prepareLessonDetail:null,
    prepareLessonNum:1,
    endTermTest:false,
    midTermTest:false,
    preClassTest:false
}
const getters = {
    
}
const mutations = {
    //改变日历状态
    changecalender(state){
        state.calenderTypeCheck = !state.calenderTypeCheck
        if( state.lessonType==1 ){
            state.lessonType = null
        }else{
            state.lessonType = 1
        }
    },
    //改变date数据
    changeDate(state,type){
        state.date = type
    },
    //改变课中教案资料类型
    changeTeacheDocument(state,type){
        state.teacheDocument = type
    },
    //发送课程反馈步骤
    changeBackSteps(state,type){
        state.backStepsType = type
    },
    //发送练习题步骤
    changePractise(state,type){
        state.practiseType = type
    },
    //改变活动类型
    changeSports(state,type){
        state.sportsType = type
    },
    //改变pk步骤
    changeContent(state,type){
        state.contentType = type
    },
    //改变题库发题步骤
    changeQuestionBank(state,type){
        state.questionBankType = type
    },
    //点击toast确定
    changeToastType(state,type){
        state.toastType = type
    },
    //改变开始上课tab
    changeTabNum(state,index){
        state.tabIndexNum = index
    },
    //loadeing加载
    changeLoading(state,type){
        state.loading = type
    },
    //改变忘记密码步骤条
    changeSteps(state,type){
        state.stepNum = type
    },

    //获取当前课程列表
    getList(state,json){
        state.date = json.date
        getLessonList({"pageSize":5,'pageNum':json.num,'date':json.date,'lessonState':state.lessonType}).then(res=>{
           if( res.data.errno==200 ){
               state.listType = true
               state.lessonList = res.data.data.courseList
               state.lessonNumber = res.data.data.total
               state.totalPage = res.data.data.totalPage
           }else if(res.data.errno==40119){
               state.listType = false
               state.lessonList = []
               state.totalPage = 0
               state.lessonNumber = 0
           }
       }).catch()               
   }
}
const actions = {
    //改变日历状态
    changecalender(context,type){
        context.commit('changecalender')
        if( type ){
            context.commit('getList',{'num':1,'date':type})
        }else{
            context.commit('getList',{'num':1,'date':state.date})
        }
    },
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules
})
  