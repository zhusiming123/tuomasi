import axios from 'axios'
import store from './../vuex/store.js'
import router from './../router'
import codeMsg from './../api/code'
import xylinkCode from './../api/xylinkCode.js'
import {setCookie} from './../api/cookie'

//axios.defaults.withCredentials = true
axios.defaults.timeout = 30000
axios.defaults.validateStatus=function (status) {
    return status < 401 // Reject only if the status code is greater than or equal to 500
}
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let url
let codeImage
let wsurl
let origin
if( process.env.NODE_ENV==='development' ){
    url ='/api'
    codeImage = 'http://api-shuangshi-dev.office.yiyatalk.com';
    wsurl = '10.88.88.7:8082'
}else if(process.env.NODE_ENV==='testing'){
    codeImage = 'http://api-shuangshi-test.office.yiyatalk.com';
    wsurl = '10.88.88.5:8082'
}else if(process.env.NODE_ENV==='deving'){
    codeImage = 'http://api-shuangshi-dev.office.yiyatalk.com';
    wsurl = '10.88.88.7:8082'
}else if(process.env.NODE_ENV==='production'){
    codeImage = 'http://apiv1.yiyatalk.com';
    wsurl = 'ws-shuangshi.yiyatalk.com:9001';
}else if(process.env.NODE_ENV==='staging'){
    codeImage = 'http://apiv1.yiyatalk.com';
    wsurl = 'ws-shuangshi.yiyatalk.com:9001';
}

if( process.env.NODE_ENV!='development' ){
    axios.defaults.baseURL = window.location.origin
    origin = window.location.origin
}else{
    axios.defaults.baseURL = url
    origin = 'teacher-shuangshi-dev.office.tengyue360.com'
}
export {codeImage,wsurl,origin}

//添加请求拦截器
axios.interceptors.request.use(function (config) {
    //是否显示loading
    if (!config.headers.hideLoading)store.state.loading = false
    config.headers.authorization = setCookie('token')
    return config;
}, function (error) {
    if (!config.headers.hideLoading)store.state.loading = true
    router.push({path:'/Topic/interError'})
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    store.state.interError = false
    //是否显示loading
    store.state.loading = false
    //是否显示错误信息提示
    if( response.data.errno!=200&&!response.config.headers.hideToast&&response.data.code!=1&&response.data.code!=0 ){
        if(response.data.errno==1003){
            store.state.errorTxt = xylinkCode[JSON.parse(response.data.data).errorCode]?xylinkCode[JSON.parse(response.data.data).errorCode].errno:'发生未知错误，请重试'
            store.state.errorType = true
        }else if(response.data.status_code==200){
            store.state.loading = false
        }else{
            if(response.data.errno){
                store.state.errorTxt = codeMsg[response.data.errno].viewMsg
                store.state.errorType = true
            }
        }
        setTimeout(()=>{
            store.state.errorType = false
        },2000)
    }
    return response;
}, function (error) {
    //是否显示loading
    store.state.loading = false
     //超时处理
    let originalRequest = error.config;
    if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
        store.state.errorTxt ='当前请求已超时，请刷新重试'
        store.state.errorType = true
        setTimeout(()=>{
            store.state.errorType = false
        },2000)
    }
    if( error.response.data.status === 401 ){
        setCookie('token','',{expires:-1,path:"/"})
        store.state.errorTxt = '登录状态失效，请重新登录'
        store.state.errorType = true
        setTimeout(()=>{
            store.state.errorType = false
            router.push({path:'/'})
        },2000)
    }else{
        store.state.interError = true
    }
    return Promise.reject(error);
})
export default axios
