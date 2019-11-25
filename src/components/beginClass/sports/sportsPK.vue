<template>
  <div class="box_sportsPK">
    <div class="top">
      <ul>
        <li>
          <p class="title">
            互动方式：
          </p>
          <div class="content_question">
            <p
              :class="sportsType==1?'active':''"
              @click="changeSports(1)"
            >
              抢红包
            </p>
            <p
              :class="sportsType==2?'active':''"
              @click="changeSports(2)"
            >
              pk互动
            </p>
          </div>
        </li>
        <li>
          <p class="title">
            互动玩法：
          </p>
          <div class="content_question">
            <p class="active">
              自定义题目
            </p>
          </div>
        </li>
        <li>
          <p class="title">
            问题类型：
          </p>
          <div class="content_type">
            <p
              :class="typeNum==0?'active':''"
              @click="checkType(0)"
            >
              <span class="icon1" />
              <span class="txt">单选题</span>
            </p>
            <p
              :class="typeNum==1?'active':''"
              @click="checkType(1)"
            >
              <span class="icon2" />
              <span class="txt">多选题</span>
            </p>
            <p
              :class="typeNum==2?'active':''"
              @click="checkType(2)"
            >
              <span class="icon3" />
              <span class="txt">判断题</span>
            </p>
          </div>
        </li>
        <li style="margin-bottom:10px;">
          <p class="title">
            获得积分：
          </p>
          <div class="content_config">
            <p>
              第一名：<input
                type="number"
                readonly
                v-model="sendQuestion.questionDescs[0].value"
              >分
            </p>
            <p>
              第二名：<input
                type="number"
                readonly
                v-model="sendQuestion.questionDescs[1].value"
              >分
            </p>
            <p>
              第三名：<input
                type="number"
                readonly
                v-model="sendQuestion.questionDescs[2].value"
              >分
            </p>                    
          </div>
        </li>
        <span
          class="mind"
          style="display:inline-block"
        >(提示：以班级为单位，前三名班级内每个同学所获积分。)</span>
        <li style="margin-bottom:10px;">
          <p class="title">
            正确答案：
          </p>
          <div
            class="content_answer content_answerSelect"
            v-show="typeNum==0"
          >
            <p
              :class="answer.A==1?'checked':''"
              @click="checkOption('A')"
            >
              A
            </p>
            <p
              :class="answer.B==1?'checked':''"
              @click="checkOption('B')"
            >
              B
            </p>
            <p
              :class="answer.C==1?'checked':''"
              @click="checkOption('C')"
            >
              C
            </p>
            <p
              :class="answer.D==1?'checked':''"
              @click="checkOption('D')"
            >
              D
            </p>
          </div>
          <div
            class="content_answer content_answerSelect"
            v-show="typeNum==1"
          >
            <p
              :class="answer.A==1?'checked':''"
              @click="checkOption('A')"
            >
              A
            </p>
            <p
              :class="answer.B==1?'checked':''"
              @click="checkOption('B')"
            >
              B
            </p>
            <p
              :class="answer.C==1?'checked':''"
              @click="checkOption('C')"
            >
              C
            </p>
            <p
              :class="answer.D==1?'checked':''"
              @click="checkOption('D')"
            >
              D
            </p>
          </div>
          <div
            class="content_check content_answerSelect"
            v-show="typeNum==2"
          >
            <p
              :class="answer.A==1?'checked':''"
              @click="checkOption('A')"
            >
              <span class="project_true" />
            </p>
            <p
              :class="answer.B==1?'checked':''"
              @click="checkOption('B')"
            >
              <span class="project_false" />
            </p>
          </div>
        </li>
        <span
          class="mind"
          v-show="typeNum==1"
        >(提示：多选题只有全部选对才算正确，漏选错选均算错误。)</span>
        <span
          class="mind"
          v-show="typeNum==2"
        >(提示：选项 <span class="icon_true" /> 表示正确，选项 <span class="icon_false" /> 表示错误。)</span>
        <span
          class="mind"
          v-show="typeNum==0"
        />
        <li>
          <p class="title">
            活动时长：
          </p>
          <div class="content_question">
            <p
              :class="sendQuestion.questionDescs[3].value==20?'active':''"
              @click="selectTime(20)"
            >
              20秒
            </p>
            <p
              :class="sendQuestion.questionDescs[3].value==30?'active':''"
              @click="selectTime(30)"
            >
              30秒
            </p>
            <p
              :class="sendQuestion.questionDescs[3].value==40?'active':''"
              @click="selectTime(40)"
            >
              40秒
            </p>
          </div>
        </li>
      </ul>
      <div class="send">
        <p>
          <button @click="senQuestion">
            开始PK
          </button>
        </p>
      </div>
      <div
        class="toast"
        v-show="errorType"
      >
        <p>{{ errorText }}</p>
      </div>
    </div>
  </div>  
</template>
<script>
import {mapMutations,mapState} from "vuex";
import {getPractiseUrl} from "./../../../api/index";
export default({
  data(){
    return{
      errorType:false,
      errorText:"",
      id:"",
      typeNum:0,
      answer:{"A":0,"B":0,"C":0,"D":0},
      sendQuestion:{"type": "","answer": "","category":1,
        "lesson": {"id":""},
        "questionDescs": [
          {
            "type": 3,
            "value":3
          },
          {
            "type": 4,
            "value":2
          },
          {
            "type": 5,
            "value":1
          },
          {
            "type": 6,
            "value":20
          }
        ]
      }
    };
  },
  created() {
  },
  computed:{
    ...mapState(["sportsType"])
  },
  methods:{
    selectTime(num){
      this.sendQuestion.questionDescs[3].value = num;
    },
    ...mapMutations(["changeSports"]),
    checkType(num){
      this.answer.A = 0;
      this.answer.B = 0;
      this.answer.C = 0;
      this.answer.D = 0;
      this.$set(this,"typeNum",num);
      this.$set(this,"answer",this.answer);
    },
    checkOption(name){
      if( this.answer[name]==1 ){
        this.answer[name]=0;
      }else{
        if(this.typeNum==1){
          this.answer[name]=1;
        }else{
          this.answer.A = 0;
          this.answer.B = 0;
          this.answer.C = 0;
          this.answer.D = 0;
          this.answer[name]=1;
        }
      }
      this.$set(this,"answer",this.answer);
    },
    senQuestion(){
      let arr = [];
      if( this.answer.A==1 ){
        arr.push(1);
      }
      if( this.answer.B==1 ){
        arr.push(2);
      }
      if( this.answer.C==1 ){
        arr.push(3);
      }
      if( this.answer.D==1 ){
        arr.push(4);
      }
      this.sendQuestion.type = this.typeNum;
      this.sendQuestion.lesson.id = window.localStorage.getItem("lessonId");
      this.sendQuestion.answer = arr.join("");
      const json = this.sendQuestion;
      if( arr.length==0 ){
        this.$set(this,"errorType",true);
        this.$set(this,"errorText","请配置正确答案");
      }else if(this.sendQuestion.questionDescs[0].value<=this.sendQuestion.questionDescs[1].value){
        this.$set(this,"errorType",true);
        this.$set(this,"errorText","第一名得分分应大于第二名得分,请重新配置");
      }else if(this.sendQuestion.questionDescs[0].value<=this.sendQuestion.questionDescs[2].value){
        this.$set(this,"errorType",true);
        this.$set(this,"errorText","第一名得分分应大于第三名得分,请重新配置");
      }else if(this.sendQuestion.questionDescs[1].value<=this.sendQuestion.questionDescs[2].value){
        this.$set(this,"errorType",true);
        this.$set(this,"errorText","第二名得分应大于等于第三名得分,请重新配置");
      }else if(this.sendQuestion.questionDescs[0].value>100||this.sendQuestion.questionDescs[1].value>100||this.sendQuestion.questionDescs[2].value>100){
        this.$set(this,"errorType",true);
        this.$set(this,"errorText","积分配置最大值不得超过100");
      }else{
        let sendType = true;
        this.sendQuestion.questionDescs.forEach(item => {
          if(!/^\d+$/.test(item.value)){
            this.$set(this,"errorType",true);
            this.$set(this,"errorText","请输入整数");
            sendType = false;
            return;
          }
        });
        if( sendType==true ){
          // getPractiseUrl({"classId":"",question:json,recordState:1}).then(res=>{
          getPractiseUrl(json).then(res=>{
            if( res.data.errno==200 ){
              this.$store.state.questionType = false;
              window.localStorage.setItem("lianxiPKsportsId",res.data.data.id);
              this.changeSports(7);
              window.sessionStorage.setItem("PKtime",this.sendQuestion.questionDescs[3].value);
            }
          });
        }
      }
      setTimeout(()=>{
        this.$set(this,"errorType",false);
      },3000);
    }
  } 
});
</script>
<style lang="scss" scoped>
    .box_sportsPK{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 720px;
        position: relative;
        .icon_true{
            display: inline-block;
            background: url('./../../../assets/image/check-true.png') no-repeat;
            background-size: 18px 13px;
            width: 18px;
            height: 13px;
        }
        .icon_false{
            display: inline-block;
            background: url('./../../../assets/image/check-false.png') no-repeat;
            background-size: 13px 13px;
            width: 13px;
            height: 13px;
        }
        .mind{
            margin-left: 125px;
            font-size:18px;
            font-family:PingFangSC-Regular;
            color:rgba(126,139,154,1);
            margin-bottom:30px;
            display: inline-block;
        }
        .toast{
            width:100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            position: absolute;
            left: 0;
            top: 333px;
            p{
                padding: 30px;
                background:rgba(0,0,0,0.7);
                box-shadow:0px 4px 30px 0px rgba(174,183,198,0.5);
                border-radius:10px;
                font-size:18px;
                font-family:PingFangSC-Regular;
                color:rgba(255,255,255,1);
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
        .bottom{
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;
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
                    }
                }
            }
            .send{
                position: absolute;
                bottom: 0;
                left: 0
            }
        }
        ul li{
            display: flex;
            flex-direction: row;
            margin-bottom: 30px;
            align-items: center;
            div{
                display: flex;
                flex-direction: row;
            }
            .title{
                font-size:24px;
                font-family:PingFangSC-Regular;
                color:rgba(126,139,154,1);
                flex-grow: 0;
                width: 125px;
            }
            .content_question{
                p{
                    padding: 10px 20px;
                    font-size:24px;
                    font-family:PingFangSC-Medium;
                    border:1px solid #E6E6E6;
                    margin-right: 30px;
                    color: #333333;
                    cursor: pointer;
                     border-radius:2px;
                }
                p:hover{
                    border-radius:2px;
                    border:1px solid rgba(0,133,255,1);
                }
                .active{
                    color:#f39926;
                    border:1px solid #f39926;
                    background: url('./../../../assets/image/select.png') no-repeat;
                    background-position: top right;
                }
            }
            .content_type{
                flex-grow: 1;
                justify-content: space-between;
                p:hover{
                    border-radius:2px;
                    border:1px solid rgba(0,133,255,1);
                }
                p{
                    border-radius:2px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 20px 39px;
                    justify-content: space-between;
                    border:1px solid rgba(230,230,230,1);
                    cursor: pointer;
                    span{
                        font-size:24px;
                        font-family:PingFangSC-Medium;
                        color:rgba(51,51,51,1);
                    }
                    .icon1{
                        display: inline-block;
                        width: 56px;
                        height: 56px;
                        background: url('./../../../assets/image/single.png') no-repeat;
                        background-position: center center;
                        background-size: 56px 56px;
                        margin-right: 24px;
                    }
                    .icon2{
                        display: inline-block;
                        width: 56px;
                        height: 56px;
                        background: url('./../../../assets/image/double.png') no-repeat;
                        background-position: center center;
                        background-size: 56px 56px;
                        margin-right: 24px;
                    }
                    .icon3{
                        display: inline-block;
                        width: 56px;
                        height: 56px;
                        background: url('./../../../assets/image/judge.png') no-repeat;
                        background-position: center center;
                        background-size: 56px 56px;
                        margin-right: 24px;
                    }
                }
                .active{
                    background: url('./../../../assets/image/select.png') no-repeat;
                    background-position: top right;
                    border:1px solid #f39926;
                }
            }
            .content_config{
                p{
                    margin-right: 30px;
                    font-size:24px;
                    font-family:PingFangSC-Regular;
                    color:rgba(126,139,154,1);
                    input{
                        width:66px;
                        height:54px;
                        margin:0 10px;
                        text-align: center;
                        font-size:24px;
                        font-family:PingFangSC-Medium;
                        color:rgba(51,51,51,1);
                        -webkit-border-radius:2px;//适配以webkit为核心的浏览器(chrome、safari等)
                        -moz-border-radius:2px;//适配firefox浏览器
                        -ms-border-radius:2px;//适配IE浏览器
                        -o-border-radius:2px;//适配opera浏览器
                        border-radius:2px;//适配所有浏览器(需要放在最后面，类似于if..else if..else..)
                        border:none;
                        background:rgba(240,240,240,1);
                    }    
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none !important;
                        margin: 0;
                    }
                }
            }
            .content_answerSelect{
                p:hover{
                    border: 1px solid #3BCB1F;
                    color:#3BCB1F;
                }
            }
            .content_check{
                p{
                    width: 54px;
                    height: 54px;
                    line-height: 54px;
                    text-align: center;
                    font-size:24px;
                    font-family:PingFangSC-Medium;
                    color:#FF5921;
                    border:1px solid rgba(230,230,230,1);
                    margin-right:30px;
                    border-radius:2px;
                    cursor: pointer;
                }
                
                .checked{
                    background: url('./../../../assets/image/select2.png') no-repeat;
                    background-position: top right;
                    border:1px solid #3BCB1F;
                    color:#3BCB1F;

                }
                .noselect{
                    background:rgba(255,255,255,1);
                    border-radius:2px;
                    border:1px solid rgba(255,89,33,1);
                    font-size:24px;
                    font-family:PingFangSC-Medium;
                    color:rgba(255,89,33,1);
                }
                .project_true{
                    display: inline-block;
                    width: 54px;
                    height: 54px;
                    background: url('./../../../assets/image/check-true.png') no-repeat;
                    background-size: 28px 18px;
                    background-position: center;
                }
                .project_false{
                    display: inline-block;
                    width: 54px;
                    height: 54px;
                    background: url('./../../../assets/image/check-false.png') no-repeat;
                    background-size: 19px 19px;
                    background-position: center;
                }
            }
            .content_answer{
                p{
                    width: 54px;
                    height: 54px;
                    line-height: 54px;
                    text-align: center;
                    font-size:24px;
                    font-family:PingFangSC-Medium;
                    color:#FF5921;
                    border:1px solid rgba(230,230,230,1);
                    margin-right:30px;
                    border-radius:2px;
                    cursor: pointer;
                }
                
                .checked{
                    background: url('./../../../assets/image/select2.png') no-repeat;
                    background-position: top right;
                    border:1px solid #3BCB1F;
                    color:#3BCB1F;
                }
                .noselect{
                    background:rgba(255,255,255,1);
                    border-radius:2px;
                    border:1px solid rgba(255,89,33,1);
                    font-size:24px;
                    font-family:PingFangSC-Medium;
                    color:rgba(255,89,33,1);
                }
                
            }
        }
    }
</style>
