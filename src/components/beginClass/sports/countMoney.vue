<template>
  <div class="box_countMoney">
    <div class="box_countMoney_header">
      <p>抢红包倒计时</p>
      <i-circle
        :percent="percent"
        dashboard="#eee"
        :size="183"
        :trail-width="4"
        :stroke-width="4"
        stroke-color="#FF5921"
      >
        <span
          class="demo-Circle-inner"
          style="font-size:64px;"
        >{{ time }}<span style="font-size:40px;">s</span></span>
      </i-circle>
    </div>
    <div class="content">
      <div class="content_left">
        <div
          :key="index"
          class="list"
          v-for="(item,index) in classMsgLeft"
        >
          <p>{{ item.name }}</p>
          <span v-show="item.sendState==0">正在抢红包中…</span>
          <div v-show="item.sendState==1">
            <span class="fail">发送失败</span>
            <div @click="resetSend(item.id)">
              重新发送
            </div>
          </div>
        </div>
      </div>
      <div class="content_right">
        <div
          :key="index"
          class="list"
          v-for="(item,index) in classMsgRight"
        >
          <p>{{ item.name }}</p>
          <span v-show="item.sendState==0">正在抢红包中…</span>
          <div v-show="item.sendState==1">
            <span class="fail">发送失败</span>
            <div @click="resetSend(item.id)">
              重新发送
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="send"> 
            <button class="sendCheck" v-if="countNum<1" @click="endSports">结束</button>
            <button v-if="countNum>=1">结束({{countNum}})</button>
        </div> -->
  </div>
</template>
<script>
import {mapMutations, mapState} from "vuex";
import {getMoneySendMsg,resetSendMoney,endSports} from "./../../../api/index";
export default({
  data(){
    return{
      query:{},
      time:0,
      // countNum:5,
      percent:100,
      time_percent:"",
      classMsgLeft:[],
      classMsgRight:[],
      timer:null,
      percenter:null
    };
  },
  created() {
    this.$store.state.loading = true;
    setTimeout(()=>{
      if( this.$store.state.loading == true ){
        this.$store.state.loading = false;
      }
    },5000);
           
  },
  mounted() {
    if(this.$store.state.sportsClassMsg.length!=0){
      this.$set(this,"time",parseInt(window.sessionStorage.getItem("packageTime"))+4);
      this.$store.state.loading = false;
      this.begin();
      this.countPercent();
      this.$store.state.sportsClassMsg.forEach((item,index)=>{
        if( index%2==0 ){
          this.classMsgLeft.push(item);
        }else{
          this.classMsgRight.push(item);
        }
      });
    }
  },
  computed:{
    ...mapState(["sportsClassMsg"])
  },
  watch:{
    sportsClassMsg:function(){
      this.$set(this,"time",parseInt(window.sessionStorage.getItem("packageTime"))+4);
      this.$store.state.loading = false;
      this.begin();
      this.countPercent();
      this.$store.state.sportsClassMsg.forEach((item,index)=>{
        if( index%2==0 ){
          this.classMsgLeft.push(item);
        }else{
          this.classMsgRight.push(item);
        }
      });
    }
  },
  methods:{
    ...mapMutations(["changeSports","changeLoading"]),
    resetSend(id){
      resetSendMoney({"questionId":window.localStorage.getItem("moneyQuestionId"),"classId":id}).then(res=>{
        if( res.data.errno==200 ){
          this.$store.state.sportsClassMsg.forEach(item=>{
            if( item.id==id ){
              item.sendState = 0;
            }
          });
        }
      }).catch();
    },
    countPercent(){
      this.$set(this,"time_percent",this.percent/this.time/10);
    },
    //5s倒计时
    // beginCountNum(){
    //     let oT = setInterval(()=>{
    //         if(this.countNum>=1){
    //             this.countNum = this.countNum-1
    //         }else{
    //             clearInterval(oT)
    //         }
    //     },1000)
    // },
    //开始倒计时
    begin(){
      this.timer = setInterval(()=>{
        if( this.time>0 ){
          this.$set(this,"time",(this.time-1)<10?"0"+(this.time-1):(this.time-1));
        }else{
          clearInterval(this.timer);
          //结束抢红包活动
          endSports({"interactId":window.localStorage.getItem("moneyQuestionId"),"lessonId":window.localStorage.getItem("lessonId")}).then(res=>{
            if( res.data.errno==200 ){
              this.changeSports(5);
            }
          }).catch();
        }
      },1000);
      this.percenter = setInterval(()=>{
        if(this.percent>0){
          this.$set(this,"percent",this.percent-this.time_percent);
        }else{
          clearInterval(this.percenter);
        }
      },100);
    },
    //提前结束红包活动
    endSports(){
      endSports({"interactId":window.localStorage.getItem("moneyQuestionId"),"lessonId":window.localStorage.getItem("lessonId")}).then(res=>{
        if( res.data.errno==200 ){
          clearInterval(this.timer);
          clearInterval(this.percenter);
          this.changeSports(5);
        }
      }).catch();
    },
    //查看红包发送成功与否
    getMoney(){
      getMoneySendMsg({"lessonId":window.localStorage.getItem("lessonId")}).then(res=>{                    
        if( res.data.errno==200 ){
          this.begin();
          this.countPercent();
          res.data.data.classMsg.forEach((item,index)=>{
            if( index%2==0 ){
              this.classMsgLeft.push(item);
            }else{
              this.classMsgRight.push(item);
            }
          });
          this.$set(this,"classMsgLeft",this.classMsgLeft);
          this.$set(this,"classMsgRight",this.classMsgRight);
        }
      }).catch();
    }
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.percenter);
  },
});
</script>
<style lang="scss" scoped>
    .box_countMoney{
        .box_countMoney_header{
            font-size:20px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1); 
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: -10px;
            padding-bottom: 38px;
            p{
                font-size:20px;
                font-family:PingFangSC-Regular;
                color:rgba(51,51,51,1);
                margin-bottom: 15px;
            }
        }
        .demo-Circle-inner{
            font-family:PingFangSC-Medium;
            color:#FF5921;
          
        }
        .content{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background:rgba(246,248,252,1);
            padding: 20px 20px 0 20px;
        }
         .list{
            width: 428px;
            height: 178px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            align-items: center;
            background: #fff;
            margin-bottom: 20px;
            padding: 45px 16px;
            text-align: center;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            p{
                font-size:16px;
                font-family:PingFangSC-Regular;
                color:rgba(51,51,51,1);
                
            }
            span{
                font-size:18px;
                font-family:PingFangSC-Medium;
                color:#FF5921;
            }
            .fail{
                font-size:18px;
                font-family:PingFangSC-Medium;
                color:rgba(153,153,153,1);
                margin-top: 10px;
            }
            div div{
                width:136px;
                height:37px;
                background:#FF5921;
                box-shadow:0px 2px 4px 0px rgba(255,204,171,1);
                border-radius:18px;
                font-size:14px;
                font-family:PingFangSC-Medium;
                color:rgba(255,255,255,1);
                text-align: center;
                line-height: 37px;
                margin-top: 10px;
                cursor: pointer;
            }
            div div:hover{
                background: #D65124;
                color:#FFFFFF
            }
        }
        .send{
            width:1200px;
            text-align: center;
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            margin-left:auto;
            margin-right:auto;
            p{
                width: 971px;
                padding: 20px 0;
                box-shadow:0px -3px 16px 0px rgba(205,212,225,0.5);
                background: #fff;
                margin-left: 20px;
            }
        }
        button{
            display: inline-block;
            padding:10px 40px;
            background:#f39926;
            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
            border-radius:60px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            color:rgba(255,255,255,1);
            outline:none;
        }
        .sendCheck{
             cursor: pointer;
        }
    }
</style>
