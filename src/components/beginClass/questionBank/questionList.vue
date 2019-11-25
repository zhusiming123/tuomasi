<template>
  <div class="questionBank">
    <div
      class="questionBank-null"
      v-show="list&&list.length==0"
    >
      <img
        src="@/assets/image/null.png"
        alt=""
      >
      <span>暂无题库题～</span>
    </div>
    <div
      class="questionBank-list"
      v-for="(item,index) in list"
      :key="index"
      :style="item.sendState==0?'margin-bottom: 60px;':'margin-bottom:24px;'"
    >
      <div class="questionBank-list-header">
        <div class="questionBank-list-header-left">
          <span>0{{ index+1 }}</span>
          <p>{{ item.questionInfoList.type_info.name }}题</p>
        </div>
        <span
          class="questionBank-list-header-right"
          v-show="item.sendState==1" 
        />
      </div>
      <p
        class="questionBank-list-title"
        v-html="item.questionInfoList.title"
      />
      <p class="questionBank-list-line" />
      <div class="questionBank-list-bottom">
        <p>{{ item.sendState==0?'请选择发送题目类型':'题目类型' }}</p>
        <div class="questionBank-list-bottom-content">
          <div
            class="questionBank-list-bottom-content-left"
            v-if="item.sendState==0"
          >
            <span
              @click="check(index,1)"
              :class="item.questionType==1?'questionBank-list-bottom-content-left-select':''"
            >练习</span>
            <span
              @click="check(index,2)"
              :class="item.questionType==2?'questionBank-list-bottom-content-left-select':''"
            >班级PK</span>
          </div>
          <div
            class="questionBank-list-bottom-content-left"
            v-if="item.sendState==1"
          >
            <span class="questionBank-list-bottom-content-left-select">{{ item.category==0?'练习':item.category==1?'互动':'' }}</span>
          </div>
          <div
            class="questionBank-list-bottom-content-right"
            @click="detailTo(item,index)"
          >
            {{ item.sendState==0?'题目详情':'学情报告' }}
          </div>
        </div>
      </div>
      <p
        class="questionBank-list-sendQuestion"
        @click="sendQuestionDetail(item)"
        v-if="item.sendState==0"
      >
        发送练习
      </p>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";
import {getQuestionBank,getPractiseUrl} from "@/api/index.js";
export default {
  data(){
    return{
      list:null,
      errorType:false,
      errorText:null
    };
  },
  methods:{
    ...mapMutations(["changeQuestionBank"]),
    btn(){
      this.changeQuestionBank(7);
    },
    //获取题库列表
    getQuestionBankList(){
      getQuestionBank({"id":window.localStorage.getItem("lessonId"),"pageNum":1,"pageSize":10000}).then(res=>{
        if( res.data.errno==200 ){
          res.data.data.questionList.map(item=>{
            item.questionType = 0;
          });
          this.list = res.data.data.questionList;
        }
      });
    },
    //选择发送习题类型
    check(index,num){
      if(this.list[index].questionType!=num){
        this.list[index].questionType = num;
      }else{
        this.list[index].questionType = 0;
      }
    },
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
    //查看题目详情
    detailTo(item,index){
      if( item.sendState==1 ){
        let routeData = this.$router.resolve({path:"lessonDetailCount",query: 
                {"questionId":item.ownQuestionId,"index":index+1,"className":"全部班级",
                  "classId":"","lessonId":window.localStorage.getItem("lessonId"),
                  "courseName":window.localStorage.getItem("courseName"),"lessonName":window.localStorage.getItem("lessonName")}});
        window.open(routeData.href, "_blank");
      }else{
        this.$store.state.questionDetail = item;
        this.$store.state.questionIndex = index;
        this.changeQuestionBank(2);
      }
    }
  },
  created(){
  },
  mounted(){
    this.getQuestionBankList();
  }
};
</script>
<style lang="scss" scoped>
    .questionBank{
        font-size: 16px;
        background:rgba(246,248,252,1);
        min-height: 590px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        button{
            cursor: pointer;
        }
        &-null{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            span{
                font-size:20px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(126,139,154,1);
            }
        }
        &-list{
            background: #fff;
            box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
            border-radius:4px;
            padding: 20px;
            position: relative;
            &-title{
                margin-top:45px;
                font-size: 24px;
                font-size:24px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(51,51,51,1);
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            &-sendQuestion{
                width: 105px;
                height: 36px;
                background:rgba(0,133,255,1);
                box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
                position: absolute;
                right: 21px;
                bottom: -36px;
                line-height: 36px;
                text-align: center;
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                cursor: pointer;
            }
             &-sendQuestion:hover{
                background: #006ACC!important;
             }
            &-line{
                width: 100%;
                height:1px;
                background:rgba(230,230,230,1);
                margin: 20px 0;
            }
            &-bottom{
                width: 100%;
                p{
                    margin-bottom: 10px;
                    font-size:12px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(189,189,189,1);
                }
                &-content{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    position: relative;
                    &-left{
                        span{
                            display: inline-block;
                            padding: 7px 14px;
                            border-radius:2px;
                            border:1px solid rgba(230,230,230,1);
                            font-size:14px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:rgba(51,51,51,1);
                            margin-right: 20px;
                            cursor: pointer;
                        }
                        &-select{
                            background: url('./../../../assets/image/select.png') no-repeat;
                            background-position: top right;
                            background-size: 24px 24px;
                            border:1px solid #f39926!important;
                        }
                        span:hover{
                            border:1px solid #f39926;
                        }
                    }
                    &-right{
                        line-height: 38px;
                        color: #f39926;
                        background: url('./../../../assets/image/Group-7.png') no-repeat;
                        background-position: center right;
                        padding-right: 12px;
                        cursor: pointer;
                    }
                }
            }
            &-header{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size:14px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(126,139,154,1);
                position: absolute;
                left: 0;
                top: 0;
                &-left{
                    display: flex;
                    flex-direction: row;
                    span{
                        display: block;
                        width: 40px;
                        height: 40px;
                        background: url('./../../../assets/image/Rectangle-16.png') no-repeat;
                        background-size: 40px 40px;
                        margin:0 10px 0 20px;
                        text-align: center;
                        line-height: 35px;
                        color: #fff;
                        font-size: 18px;
                        margin-top: -5px;
                    }
                    p{
                        margin-top:7px;
                    }
                }
                &-right{
                    display: block;
                    width: 60px;
                    height: 60px;
                    background: url('./../../../assets/image/eddd.png') no-repeat;
                    margin-top:-3px;
                    margin-right: -3px;
                }
            }
        }
    }
</style>
