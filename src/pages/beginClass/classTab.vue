<template>
  <div class="box_beginClass">
    <div class="header">
      <p>{{ query.courseName }}-</p>
      <span>{{ query.lessonName }}</span>
    </div>
    <ul>
      <li
        :class="tabIndexNum==5?'active':''"
        @click="checktab($event,5)"
        url="/openbox/classTab"
      >
        题库题目
      </li>
      <li
        :class="tabIndexNum==1?'active':''"
        @click="checktab($event,1)"
        url="/openbox/classTab/Practise"
      >
        练习
      </li>
      <li
        :class="tabIndexNum==2?'active':''"
        @click="checktab($event,2)"
        url="/openbox/classTab/sports"
      >
        趣味互动
      </li>
      <li
        :class="tabIndexNum==3?'active':''"
        @click="checktab($event,3)"
        url="/openbox/classTab/report"
      >
        学情报告
      </li>
      <li
        :class="tabIndexNum==4?'active':''"
        @click="checktab($event,4)"
        url="/openbox/classTab/backUplate"
      >
        课程反馈
      </li>
      <li
        :class="tabIndexNum==6?'active':''"
        @click="checktab($event,6)"
        url="/openbox/classTab/tool"
      >
        小工具
      </li>
      <li
        :class="tabIndexNum==7?'active':''"
        @click="checktab($event,7)"
        url="/openbox/classTab/xylink"
      >
        会控
      </li>
    </ul>
    <div class="content">
      <div class="content_all">
        <router-view />
      </div>
      <div class="content_right">
        <div
          class="time"
          v-show="timeType"
        >
          <div>
            <p class="title">
              已开课时长
            </p>
          </div>
          <p class="time_detail">
            {{ min }}:{{ second }}
          </p>
          <p
            class="end_class"
            @click="endClass"
          >
            结束上课
          </p>
        </div>
      </div>
    </div>
    <showModal
      ref="endClassModal"
      @callback="endlesson"
    />
  </div>
</template>
<script>
import store from "@/vuex/store.js";
import router from "@/router";
import {getTime,requestSocket,endLesson} from "./../../api/index";
import {wsurl} from "@/api/axios";
import {mapState,mapMutations} from "vuex";
import showModal from "@/components/common/endClassModal.vue";

export default({
  data(){
    return{
      timeType:true,
      query:{},
      startTime:"",
      second:"00",
      min:"00",
      timer:null
    };
  },
  computed:{
    ...mapState(["tabIndexNum"])
  },
  components:{showModal},
  beforeDestroy:function(){
  },
  methods:{
    socket(){
      let that = this;
      let timer;
      let wsStr;
      if(/https/.test(window.location.origin.test)){
        wsStr = "wss://";
      }else{
        wsStr = "ws://";
      }
      requestSocket().then((res)=>{
        if( res.data.errno == 200 ){
          let ws = new WebSocket(wsStr+wsurl+"/websocket/"+res.data.data.auth+"/"+window.localStorage.getItem("userId"));
          //建立 web socket 连接成功触发事件
          ws.onopen = function () {
            window.sessionStorage.setItem("websocketType",1);
            timer = setInterval(()=>{
              ws.send("1");
            },30000);
          };
          // 接收服务端数据时触发事件
          ws.onmessage = function (res) {
            let msg = JSON.parse(res.data);
            switch(msg.cmd){
            case 1:
              if( store.state.tabIndexNum==5 ){
                store.state.tikuPractiseMsg = msg.data;
              }else{
                store.state.lianxiPractiseMsg = msg.data;
              }
              break;
            case 2:store.state.sportsClassMsg = msg.data;break;
            case 3:store.state.sportsMsg = msg.data;break;
            case 4:store.state.backUplateMsg = msg.data;break;
            case 605: window.sessionStorage.setItem("websocketType",2);break;
            }
          };
          // 断开 websocket 连接成功触发事件
          ws.onclose = function () {
            clearInterval(timer);
            if( window.sessionStorage.getItem("websocketType")==2 ){
              store.state.errorType = true;
              store.state.errorTxt = "您已打开新的窗口，当前窗口即将关闭";
              setTimeout(()=>{
                store.state.errorType = false;
                router.push({"path":"/Topic"});
              },2500);
            }else if(window.sessionStorage.getItem("websocketType")==1){
              setTimeout(()=>{
                that.socket();
              },2500);
            }
          };
          // 路由跳转时结束websocket链接
          this.over = () => {
            window.sessionStorage.setItem("websocketType",3);
            ws.close();
          };
          ws.onerror= () => {};
        }
      });
    },
    ...mapMutations(["changeTabNum"]),
    checktab(event,num){
      switch(this.$store.state.tabIndexNum){
      case 1 :  this.$store.state.practiseUrl = this.$route.path ;break;
      case 2 :  this.$store.state.sportsUrl = this.$route.path;break;
      case 3 :  this.$store.state.reportUrl = this.$route.path;break;
      case 4 :  this.$store.state.backStepsUrl = this.$route.path;break;
      case 5 :  this.$store.state.questionBankUrl = this.$route.path;break;
      case 6 :  this.$store.state.toolUrl = this.$route.path;break;
      case 7 :  this.$store.state.xylinkUrl = this.$route.path;break;
      }
      switch(num){
      case 1 :
        this.$store.state.questionType = false;
        if( this.$store.state.practiseUrl ){
          this.$router.replace({"path":this.$store.state.practiseUrl});
        }else{this.$router.replace({"path":event.target.getAttribute("url")});}
        break;
      case 2 :
        this.$store.state.questionType = false;
        if( this.$store.state.sportsUrl ){
          this.$router.replace({"path":this.$store.state.sportsUrl});
        }else{this.$router.replace({"path":event.target.getAttribute("url")});}
        break;
      case 3 :
        if( this.$store.state.reportUrl ){
          this.$router.replace({"path":this.$store.state.reportUrl});
        }else{this.$router.replace({"path":event.target.getAttribute("url")});}
        break;
      case 4 :
        if( this.$store.state.backStepsUrl ){
          this.$router.replace({"path":this.$store.state.backStepsUrl});
        }else{this.$router.replace({"path":event.target.getAttribute("url")});}
        break;
      case 5 :
        this.$store.state.questionType = true;
        if( this.$store.state.questionBankUrl ){
          this.$router.replace({"path":this.$store.state.questionBankUrl});
        }else{this.$router.replace({"path":event.target.getAttribute("url")});}
        break;
      case 6 :
        if( this.$store.state.toolUrl ){
          this.$router.replace({"path":this.$store.state.toolUrl});
        }else{this.$router.replace({"path":event.target.getAttribute("url")});}
        break;
      case 7 :
        if(this.$store.state.xylinkUrl ){
          this.$router.replace({"path":this.$store.state.xylinkUrl});
        }else{this.$router.replace({"path":event.target.getAttribute("url")});}
        break;
      }
      this.changeTabNum(num);
    },
    getTimeSt(){
      const json = {"lessonId":window.localStorage.lessonId};
      getTime(json).then(res=>{
        if( res.data.errno==200 ){
          let second = parseInt(res.data.data.startedTime/1000%60);
          let min = parseInt(res.data.data.startedTime/1000/60%60)+parseInt(res.data.data.startedTime/1000/60/60%24)*60;
          this.$set(this,"second",second>=10?second:"0"+second);
          this.$set(this,"min",min>=10?min:"0"+min);
          this.timer = setInterval(()=>{
            second = second+1;
            if(second>=60){
              min = min+1;
              second = 0;
            }
            this.$set(this,"second",second>=10?second:"0"+second);
            this.$set(this,"min",min>=10?min:"0"+min);
          },1000);
        }
      }).catch(()=>{});
    },
    //打开结束弹框
    endClass(){
      this.$refs.endClassModal.makeSure();
    },
    //结束正在上的课程
    endlesson(){
      endLesson({"lessonId":window.localStorage.lessonId}).then(res=>{
        if( res.data.errno==200 ){
          this.$router.go(-1);
        }
      }).catch();
    }
  },
  created() {
    this.$set(this,"query",window.localStorage);
    this.getTimeSt();
  },
  mounted() {
    this.socket();
  },
  beforeDestroy(){
    this.over();
  },
  destroyed() {
    clearInterval(this.timer);
  },
});
</script>
<style lang="scss" scoped>
    .box_beginClass{
        display: flex;
        flex-direction: column;
        padding: 0 10px 0 20px;
        .header{
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            margin-top: 30px;
            p{
                font-size:22px;
                font-family:PingFangSC-Semibold;
                color:rgba(51,51,51,1);
            }
            span{
                font-size: 18px;
            }
        }
        ul{
            display: flex;
            flex-direction: row;
            margin-top: 18px;
            z-index:1000;
            li{
                z-index: 100;
                font-size:20px;
                font-family:PingFangSC-Regular;
                color:rgba(126,139,154,1);
                padding: 10px 24px;
                background:rgba(251,251,252,1);
                border:1px solid rgba(230,230,230,1);
                margin-right: 6px;
                box-sizing: border-box;
                cursor: pointer;
               font-weight: bold;
            }
            .active{
                border: 1px solid #fff;
                background: #fff;
                box-shadow:-3px -6px 16px 0px rgba(205,212,225,0.5);
                color:#f39926;
                font-weight: bold;
            }
        }
        .content{
            z-index: 1000;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: -1px;
            .content_all{
                width: 1060px;
                display: inline-block;
                padding: 30px 26px 40px 30px;
                box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);
                border-top: 1px solid #e6e6e6;
                background: #fff;
                min-height: 661px;
                margin-bottom: 104px;
                position: relative;
            }
            .content_right{
                display: flex;
                flex-direction: column;
                align-items: center;
                
            }
            .time{
                display: flex;
                flex-direction: column;
                width: 100px;
                background: #fff;
                height:221px;
                box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);
                align-items: center;
                div{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    // flex-grow: 0;
                    text-align:  center;
                    height: 48px;
                    border-bottom: 1px solid #e6e6e6;
                    padding: 0 14px;
                    align-items: center;
                   
                    span{
                        font-size:12px;
                        font-family:PingFangSC-Medium;
                        color:#f39926;
                        cursor: pointer;
                    }
                }
                .title{
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    color:rgba(51,51,51,1);
                    line-height: 48px;
                }
                .time_detail{
                    // flex-grow: 1;
                    text-align: center;
                    font-size:32px;
                    line-height: 67px;
                    font-family:PingFangSC-Medium;
                    color:rgba(51,51,51,1);
                    margin-top: 29px;
                }
                .end_class{
                    text-align: center;
                    font-size: 14px;
                    color: #f39926;
                    cursor: pointer;
                    margin-top: 20px;
                    height: 36px;
                    line-height: 34px;
                    border:2px solid #f39926;
                    border-radius: 36px;
                    width: 80px;
                    font-weight:400;
                }
            }
        }
    }
</style>
