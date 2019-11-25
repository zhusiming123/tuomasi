<template>
  <div class="questionDetailBox">
    <div class="questionDetail">
      <div class="questionDetail-content">
        <div class="questionDetail-content-header">
          <span>0{{ questionIndex+1 }}</span>
          <p>{{ questionDetail.questionInfoList.type_info.name }}</p>
        </div>
        <div class="questionDetail-content-question">
          <div
            class="questionDetail-content-question-title"
            v-html="questionDetail.questionInfoList.title"
          />
          <div class="questionDetail-content-question-answer">
            <p v-for="(item,index) in questionDetail.questionInfoList.choices">
              <span>{{ item.choice }}:&nbsp&nbsp</span><span v-html="item.content" />
            </p>
          </div>
          <div class="questionDetail-content-question-answerTrue">
            正确答案: <span v-for="item in questionDetail.questionInfoList.answer">{{ item }}&nbsp</span>
          </div>
        </div>
      </div>
      <div class="questionDetail-type">
        <span
          @click="select(1)"
          :class="questionDetail.questionType==1?'questiondetail-type-select':''"
        >练习</span>
        <span
          @click="select(2)"
          :class="questionDetail.questionType==2?'questiondetail-type-select':''"
        >班级PK</span>
      </div>
    </div>
    <div class="questionDetailBox-btn">
      <!-- <div>
        <span @click="back">返回</span>
        <span
          @click="sendQuestionDetail(questionDetail)"
          class="send"
          style="box-shadow:0px 2px 4px 0px rgba(164,196,236,1);margin-left:20px;background:#f39926;color:#fff;"
        >发送练习</span>
      </div> -->
      <div class="send">
        <p>
          <span
            @click="back"
          >
            返回
          </span>
          <button @click="sendQuestionDetail(questionDetail)">
            发送练习
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";
import {getPractiseUrl} from "@/api/index.js";
export default {
  data(){
    return{
      questionDetail:this.$store.state.questionDetail,
      questionIndex:this.$store.state.questionIndex
    };
  },
  methods:{
    ...mapMutations(["changeQuestionBank"]),
    back(){
      this.changeQuestionBank(1);
    },
    select(num){
      if(this.questionDetail.questionType!=num){
        this.questionDetail.questionType=num;
      }else{
        this.questionDetail.questionType==0;
      }
    },
    //发送习题
    sendQuestionDetail(item){
      if(item.questionType!=0){
        let arr = [];
        let sendQuestion;
        if( item.questionType==1 ){
          sendQuestion = {"type":"","answer": "","category":"", "lesson": {"id":""},
            "questionDescs": [{"type": 0,"value":2},{"type": 1,"value":1},{"type": 2,"value":0},
              {"type": 3,"value":0},{"type": 4,"value":0},{"type": 5,"value":0}]};
        }else{
          sendQuestion = {"type": "","answer": "","category":"","lesson": {"id":""},
            "questionDescs": [{"type": 3,"value":3},{"type": 4,"value":2},
              {"type": 5,"value":1},{"type": 6,"value":20}]};
        }
        item.questionInfoList.answer.forEach(e => {
          if( e=="A"||e=="正确" ){
            arr.push(1);
          }else if(e=="B"||e=="错误"){
            arr.push(2);
          }else if(e=="C"){
            arr.push(3);
          }else if(e=="D"){
            arr.push(4);
          }
        });
        sendQuestion.answer = arr.join("");
        sendQuestion.category = item.questionType==1?0:item.questionType==2?1:"";
        sendQuestion.questionLibraryId = item.questionId;
        sendQuestion.lesson.id = window.localStorage.getItem("lessonId");
				sendQuestion.type = item.questionInfoList.type_info.name=="单选"?0:item.questionInfoList.type_info.name=="多选"?1:item.questionInfoList.type_info.name=="判断"?2:"";
				
        // getPractiseUrl({"classId":"",question:sendQuestion,recordState:1}).then(res=>{
        getPractiseUrl(sendQuestion).then(res=>{
          if( res.data.errno==200 ){
            this.$store.state.questionType = true;
            if( item.questionType==1 ){
              this.changeQuestionBank(7);
              window.sessionStorage.setItem("classList",JSON.stringify(res.data.data.classes));
              window.localStorage.setItem("questionId",res.data.data.question.id);
            }else{
              this.changeQuestionBank(5);
              window.sessionStorage.setItem("PKtime",sendQuestion.questionDescs[3].value);
              window.localStorage.setItem("tikuPKsportsId",res.data.data.id);
            }
          }
        }).catch();
      }else{
        this.$store.state.errorTxt = "请选择题目类型";
        this.$store.state.errorType = true;
        setTimeout(()=>{
          this.$store.state.errorType = false;
        },2000);
      }
    },
  },
  created(){
    window.scrollTo(0,0);
  }
};
</script>
<style lang="scss" scoped>
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
    span{
        padding: 8px 30px;
        border-radius:30px;
        border:2px solid rgba(0,133,255,1);
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,133,255,1);
        cursor: pointer;
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
    .questionDetailBox{
        // &-btn{
        //     display: flex;
        //     margin-top: 40px;
        //     flex-direction: row;
        //     justify-content: space-around;
        //     div{
        //         width:1200px;
        //         text-align: center;
        //         position: fixed;
        //         bottom: 0px;
        //         left: 0px;
        //         right: 0px;
        //         margin-left:auto;
        //         margin-right:auto;
        //     // p{
        //     //     width: 971px;
        //     //     padding: 20px 0;
        //     //     box-shadow:0px -3px 16px 0px rgba(205,212,225,0.5);
        //     //     background: #fff;
        //     //     margin-left: 20px;
        //     // }
        //         span{
        //             padding: 8px 30px;
        //             border-radius:30px;
        //             border:2px solid rgba(0,133,255,1);
        //             font-size:28px;
        //             font-family:PingFangSC-Regular;
        //             font-weight:400;
        //             color:rgba(0,133,255,1);
        //             cursor: pointer;
        //         }
        //         .send:hover{
        //              border:2px solid #006ACC!important;
        //             background: #006ACC!important;
        //         }
                
        //     }
        // }
        .questionDetail{
            background:rgba(246,248,252,1);
            padding:26px 20px;
            min-height: 504px;
            &-type{
                margin-top: 20px;
                display: flex;
                flex-direction: row;
                span{
                    padding: 7px 14px;
                    border-radius:2px;
                    border:1px solid rgba(230,230,230,1);
                    font-size:14px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    margin-right: 20px;
                    background: #fff;
                    cursor: pointer;
                }
                span:hover{
                    border:1px solid #f39926;
                }
                .questiondetail-type-select{
                    background: url('./../../../assets/image/select.png') no-repeat;
                    background-position: top right;
                    background-size: 24px 24px;
                    border:1px solid #f39926!important;
                }
            }
            &-content{
                background: #fff;
                padding: 0 20px;
                box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
                border-radius:4px;
                &-header{
                    display: flex;
                    flex-direction: row;
                    span{
                        display: block;
                        width: 48px;
                        height: 49px;
                        background: url('./../../../assets/image/Rectangle-16.png') no-repeat;
                        background-size: 48px 49px;
                        margin:-6px 10px 0 0px;
                        text-align: center;
                        line-height: 42px;
                        color: #fff;
                        font-size: 18px;
                    }
                    p{
                        font-size:14px;
                        font-family:PingFangSC-Medium;
                        font-weight:500;
                        color:rgba(126,139,154,1);
                        margin-top: 15px;
                    }
                }
                &-question{
                    padding: 0 0 40px 0;
                    &-title{
                        font-size:24px;
                        font-family:PingFangSC-Medium;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:33px;
                        letter-spacing:2px;
                        margin-top: 24px;
                    }
                    &-answer{
                        margin: 30px 0 0 0;
                        p{
                            margin-bottom: 18px;
                            font-size:18px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:rgba(126,139,154,1);
                            display: flex;
                            flex-direction: row;
                            span{
                                font-size:18px;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                color:rgba(126,139,154,1);
                            }
                        }
                    }
                    &-answerTrue{
                        display: inline-block;
                        font-size:20px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        margin-top: 12px;
                        border-bottom: 1px solid #E6E6E6;
                        cursor: pointer;
                        span{
                            font-size:20px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:#f39926;
                            font-weight: bold;
                        }
                    }
                }
            }
        
        }
    }
</style>
