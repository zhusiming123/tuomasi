<template>
  <div class="box_backUplate">
    <p>本次课提问问题：</p>
    <div class="question">
      <h1>嗨~伙计们，你们听课真认真，就要下课了，快来对本次课进行评价吧！</h1>
      <ul>
        <li>A 本节课充实并学到了新知识</li>
        <li>B 本节课较充实并学到了新知识</li>
        <li>C 本节课一般并学到了一些新知识</li>
        <li>D 本节课不好并没有学到了新知识</li>
      </ul>
    </div>
    <div class="send">
      <p>
        <button @click="sendBack">
          发送反馈
        </button>
      </p>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";
import {getPractiseUrl} from "./../../../api/index";
export default({
  data(){
    return{
      sendQuestion:{"category":2, "lesson": {"id":""}}
    };
  },
  created() {},
  methods:{
    ...mapMutations(["changeBackSteps"]),
    sendBack(){
			this.sendQuestion.lesson.id = window.localStorage.lessonId;
			// getPractiseUrl({classId:"",question:this.sendQuestion,"recordState":1}).then(res => {
        getPractiseUrl(this.sendQuestion).then(res => {
        if( res.data.errno==200 ){
          window.localStorage.setItem("backQuestionId",res.data.data.id);
          this.changeBackSteps(2);
          window.localStorage.setItem("backQuestion","true");
        }
        // }else if(res.data.errno==40120){
        //     window.localStorage.setItem('backQuestion','false')
        //     this.changeBackSteps(3)
        // }
      }).catch();
    }
  }
});
</script>
<style lang="scss" scoped>
   .box_backUplate{
       width: 100%;
       height: 590px;
       position: relative;
        p{
            font-size:24px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1); 
        }
        .question{
            padding: 20px;
            background:rgba(246,248,252,1);
            margin-top:20px;
            h1{
                font-size:26px;
                font-family:PingFangSC-Medium;
                color:rgba(51,51,51,1);
                margin-bottom: 10px;
            }
            ul li{
                font-size:24px;
                font-family:PingFangSC-Regular;
                color:rgba(51,51,51,1);
                margin-top: 20px;
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
            button:hover{
                background: #006ACC;
            }
   }
</style>