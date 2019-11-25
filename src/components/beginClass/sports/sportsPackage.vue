<template>
  <div class="box_sportsPackage">
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
            <p>按ABCD抢</p>
          </div>
        </li>
        <li>
          <p class="title">
            红包形式：
          </p>
          <div class="content_question">
            <p>时间</p>
          </div>
        </li>
        <li>
          <p class="title">
            活动时长：
          </p>
          <div class="content_question">
            <p
              :class="sendQuestion.questionDescs[0].value==20?'active':''"
              @click="selectTime(20)"
            >
              20s
            </p>
            <p
              :class="sendQuestion.questionDescs[0].value==30?'active':''"
              @click="selectTime(30)"
            >
              30s
            </p>
            <p
              :class="sendQuestion.questionDescs[0].value==40?'active':''"
              @click="selectTime(40)"
            >
              40s
            </p>
          </div>
        </li>
        <li>
          <p class="title">
            获得积分：
          </p>
          <div class="content_config">
            <p>
              每个红包<input
                type="number"
                readonly
                v-model="sendQuestion.questionDescs[1].value"
              >积分
            </p>
          </div>
        </li>
      </ul>
      <div class="send">
        <p>
          <button @click="beginSport">
            开始抢红包
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
import {getPractiseUrl} from "./../../../api/index";
import {mapMutations,mapState} from "vuex";
export default({
  data(){
    return{
      state:1,
      query:{},
      errorType:false,
      errorText:"",
      sendQuestion:{"category":3, "lesson": {"id":""},
        "questionDescs": [
          {
            "type": 6,
            "value":20
          },
          {
            "type": 7,
            "value":1
          }
        ]
      }
    };
  },
  computed:{
    ...mapState(["sportsType"])
  },
  created() {
  },
  methods:{
    selectTime(num){
      this.sendQuestion.questionDescs[0].value = num;
    },
    checkState(num){
      this.$set(this,"state",num);
    },
    ...mapMutations(["changeSports"]),
    beginSport(){
      this.sendQuestion.lesson.id = window.localStorage.lessonId;
      if( !/^[1-9]\d*$/.test(this.sendQuestion.questionDescs[0].value)){
        this.$set(this,"errorType",true);
        this.$set(this,"errorText","请输入正整数");
        setTimeout(()=>{
          this.$set(this,"errorType",false);
        },3000);
      }else if(!/^[1-9]\d*$/.test(this.sendQuestion.questionDescs[1].value)||this.sendQuestion.questionDescs[1].value>10){
        this.$set(this,"errorType",true);
        this.$set(this,"errorText","请输入小于10的正整数");
        setTimeout(()=>{
          this.$set(this,"errorType",false);
        },3000);
      }else{
        // getPractiseUrl({"classId":"",question:this.sendQuestion,recordState:1}).then(res=>{
        getPractiseUrl(this.sendQuestion).then(res=>{
          if( res.data.errno==200 ){
            window.localStorage.setItem("moneyQuestionId",res.data.data.id);
            window.sessionStorage.setItem("packageTime",this.sendQuestion.questionDescs[0].value);
            this.changeSports(4);
          }
        }).catch();
      }
    }
  }
});
</script>
<style lang="scss" scoped>
    .toast{
        width:100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        left: 0;
        top: 433px;
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
    .box_sportsPackage{
        width: 100%;
        height:590px;
        display: flex;
        flex-direction: column;
        position: relative;
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
        ul li{
            display: flex;
            flex-direction: row;
            margin-bottom: 30px;
            align-items: center;
            div{
                display: flex;
                flex-direction: row;
            }
            p{
                cursor: pointer;
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
                p{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 20px 39px;
                    justify-content: space-between;
                    border:1px solid rgba(230,230,230,1);
                    span{
                        font-size:24px;
                        font-family:PingFangSC-Medium;
                        color:rgba(51,51,51,1);
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
            .content_answer{
                p{
                    width: 54px;
                    height: 54px;
                    line-height: 54px;
                    text-align: center;
                    font-size:24px;
                    font-family:PingFangSC-Medium;
                    color:rgba(237,128,40,1);
                    border:1px solid rgba(230,230,230,1);
                    margin-right:30px;
                    border-radius:2px;
                }
                .checked{
                    background: url('./../../../assets/image/select2.png') no-repeat;
                    background-position: top right;
                    border:1px solid rgba(35,191,41,1);
                    color:#23bf29;
                }
            }
        }
    }
</style>
