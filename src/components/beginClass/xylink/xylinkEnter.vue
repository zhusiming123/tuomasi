<template>
  <div class="xylinkEnter">
    <p>{{ name }}的云会议室({{ msg?msg.roomNumber:'' }})</p>
    <span @click="enter">主持我的会议</span>
  </div>
</template>
<script>
import {reseachParty,getScheduleId} from "@/api/xylink";
import lesson from "../../../pages/prepareLesson/lesson";
export default {
  data(){
    return{
      msg:null,
      name:null
    };
  },
  created() {
    this.name = window.localStorage.getItem("name");
    //reseachParty().then(res=>{
    //  this.msg = res.data.data;
    //});
    const lessonId = window.localStorage.getItem('lessonId')
    getScheduleId(lessonId).then(res=>{
      window.localStorage.setItem('scheduleId',res.data.data.scheduleId)
    })
  },
  methods:{
    enter:function(){
      //window.localStorage.setItem("meetingNumber",this.msg.roomNumber);
      this.$router.replace({"path":"/openbox/classTab/xylink/xyControl"});
    }
  }
};
</script>
<style lang="scss" scoped>
    .xylinkEnter{
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            margin-top: 80px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
        }
        span{
            cursor: pointer;
            display: inline-block;
            width:360px;
            height:60px;
            background:rgba(0,133,255,1);
            box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
            border-radius:30px;
            margin-top: 30px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height: 60px;
            text-align: center;
        }
        span:hover{
              background: #006ACC;
        }
    }
</style>
