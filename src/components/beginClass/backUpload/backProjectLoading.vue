<template>
  <div class="box_backProjectloading">
    <div class="bottom">
      <span>反馈已发送 </span>
      <p class="answer">
        学生正在作答中
      </p>
      <div class="img">
        <p><span>{{ second }}<span>s</span></span></p>
        <img
          src="./../../../assets/image/nopoint.gif"
          alt=""
        >
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";
import {endUplate} from "./../../../api/index";
export default{
  data(){
    return{
      second:30,
      timing:null
    };
  },
  created(){
    this.beginTime();
  },
  methods:{
    ...mapMutations(["changeBackSteps"]),
    beginTime(){
      let second = 30;
      this.timing = setInterval(()=>{
        if(second>0){
          second = second-1;
        }else{
          endUplate({"questionId":window.localStorage.getItem("backQuestionId")});
          this.changeBackSteps(3);
          clearInterval(this.timing);
        }
        this.$set(this,"second",second>=10?second:"0"+second);
      },1000);
    },
    endTo(){
      this.changeBackSteps(3);
    },
  },
  destroyed(){
    clearInterval(this.timing);
    this.timing = null;
  },
};
</script>
<style lang="scss" scoped>
.box_backProjectloading{
    height: 590px;
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
