<template>
  <div class="countDownLoading">
    <confirmModel
      ref="confirmModel"
      @callback="endCount"
    />
    <div class="bottom">
      <p class="answer">
        {{ type==0?'课间休息':'倒计时' }}
      </p>
      <div class="img">
        <p><span><span>{{ min<10?'0'+min:min }}:{{ second<10?'0'+second:second }}</span></span></p>
        <img
          src="./../../../assets/image/point.gif"
          alt=""
        >
      </div> 
    </div>
    <div class="send">
      <button @click="beginEnd">
        结束计时
      </button>
    </div>
    <span class="countDownLoading_tips"> 倒计时结束后，系统将自动结束计时</span>
  </div>
</template>
<script>
import {endCountDown,selectCountDown} from "@/api/xylink";
import confirmModel from "@/components/model/confirm_model.vue";
export default {
  data(){
    return{
      min:0,
      second:0,
      timer:null,
      type:this.$route.query.type
    };
  },
  components:{confirmModel},
  created(){
        
    selectCountDown({"lessonId":window.localStorage.getItem("lessonId")}).then(res=>{
      if( res.data.errno==200 ){
        if( res.data.data ){
          let t  =res.data.data.keepTime - parseInt((new Date().getTime()-res.data.data.timeStamp)/1000);
          this.min = parseInt(t/60);
          this.second = t%60;
          this.countdown(this.min,this.second);
        }else{
          this.min = this.$route.query.min;
          this.second = this.$route.query.second;
          this.countdown(this.$route.query.min,this.$route.query.second);
        }
      }
    });
  },
  methods:{
    beginEnd:function(){
      this.$refs.confirmModel.load("是否提前结束计时","点错了","结束");
      this.$refs.confirmModel.show();
    },
    endCount:function(){
      endCountDown({"lessonId":window.localStorage.getItem("lessonId")}).then(res=>{
        if( res.data.errno==200 ){
          clearInterval(this.timer);
          this.$router.replace({"path":"/openbox/classTab/tool"});
        }
      });
    },
    countdown:function(){
      this.timer = setInterval(()=>{
        if(this.second<=0&&this.min>0){
          this.second = 59;
          this.min = parseInt(this.min)-1;
        }else if(this.min<=0&&this.second<=0){
          this.endCount();
        }else{
          this.second = parseInt(this.second)-1;
        }
      },1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  }
};
</script>
<style lang="scss" scoped>
    .countDownLoading{
        height: 590px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .countDownLoading_tips{
        position: absolute;
        bottom:0;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(189,189,189,1);
    }
    .send{
        width:100%;
        text-align: center;
        position: absolute;
        bottom: 38px;
        left: 0
    }
    button:hover{
        background: #006ACC;
    }
    button{
        display: inline-block;
        padding: 10px 30px;
        background:#f39926;
        box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
        border-radius:60px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
        outline:none;
        cursor: pointer;
    }
    .bottom{
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        padding-bottom: 50px;
        
        .answer{
            margin-top: 60px;
            color:#f39926;
            font-size:32px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(71,139,225,1)
        }
        .img{
            margin-top: 17px;
            width: 334px;
            height: 334px;
            position: relative;
            p{
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                text-align: center;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                span{
                    font-size:52px;
                    font-family:PingFangSC-Medium;
                    color:rgba(51,51,51,1);
                    span{
                        font-size: 40px;
                    }
                }
            }
        }
      
    }
</style>