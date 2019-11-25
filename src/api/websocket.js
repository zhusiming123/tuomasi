import store from './../vuex/store.js'
import {requestSocket} from '@/api/index.js'
import {wsurl} from '@/api/axios.js'
import router from './../router'
const socket = ()=>{
    requestSocket().then((res)=>{
        if( res.data.errno = 200 ){
            let ws = new WebSocket(wsurl+"/websocket/"+res.data.data.auth+'/'+window.localStorage.getItem('userId'))
            //建立 web socket 连接成功触发事件
            ws.onopen = function () {
                window.sessionStorage.setItem('websocketType',false)
            };
            // 接收服务端数据时触发事件
            ws.onmessage = function (res) {
                let msg = JSON.parse(res.data)
                switch(msg.cmd){
                    case 1:store.state.practiseMsg = msg.data;break;
                    case 2:store.state.sportsClassMsg = msg.data;break;
                    case 3:store.state.sportsMsg = msg.data;break;
                    case 4:store.state.backUplateMsg = msg.data;break;
                    case 605: window.sessionStorage.setItem('websocketType',true);break;
                }
            };
            // 断开 websocket 连接成功触发事件
            ws.onclose = function () {
                if( window.sessionStorage.getItem('websocketType') ){
                    store.state.errorType = true
                    store.state.errorTxt = '您已打开新的窗口，当前窗口即将关闭'
                    setTimeout(()=>{
                        store.state.errorType = false
                        router.push({'path':'/Topic'})
                    },2500)
                }else{
                    setTimeout(()=>{
                        socket()
                    },2500)
                }
            };
            ws.onerror= (err) => {};
        }
    })
}
export default socket