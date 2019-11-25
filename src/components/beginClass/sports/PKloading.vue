<template>
  <div class="box_Pkloading">
    <div class="bottom">
      <span>互动PK已发送  </span>
      <p class="answer">
        公布结果倒计时
      </p>
      <div class="img">
        <p><span>{{ second }}<span>s</span></span></p>
        <img
          src="./../../../assets/image/point.gif"
          alt=""
        >
      </div> 
    </div>
    <div class="send">
      <p>
        <button @click="endTo">
          结束并公布结果
        </button>
      </p>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";
import {refuseProject} from "@/api/index";
export default{
  data(){
    return{
      second:"",
      timing:null
    };
  },
  created(){
    this.$set(this,"second",window.sessionStorage.getItem("PKtime"));
    this.beginTime(window.sessionStorage.getItem("PKtime"));
  },
  methods:{
    ...mapMutations(["changeSports","changeQuestionBank"]),
    endPksports(){
      let PKId = this.$store.state.tabIndexNum==5?window.localStorage.getItem("tikuPKsportsId"):window.localStorage.getItem("lianxiPKsportsId");
      refuseProject({"lessonId":window.localStorage.getItem("lessonId"),"questionId":PKId}).then(res=>{
        if( res.data.errno==200 ){
          if(this.$store.state.questionType){
            this.changeQuestionBank(3);
          }else{
            this.changeSports(3);
          }
        }
      }).catch();
    },
    beginTime(num){
      let second = num;
      this.timing = setInterval(()=>{
        if(second>0){
          second = second-1;
        }else{
          this.endPksports();
          clearInterval(this.timing);
        }
        this.$set(this,"second",second>=10?second:"0"+second);
      },1000);
    },
    endTo(){
      this.endPksports();
    },
  },
  destroyed(){
    clearInterval(this.timing);
    this.timing = null;
  },
};
</script>
<style lang="scss" scoped>
    .box_Pkloading{
        height: 590px;
        position: relative;
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
        span{
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            margin-top:10px;
            
        }
        .answer{
            margin-top: 40px;
            font-size:24px;
            font-family:PingFangSC-Medium;
            color:#f39926;
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
