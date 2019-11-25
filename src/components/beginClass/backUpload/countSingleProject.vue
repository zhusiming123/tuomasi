<template>
  <div class="box">
    <div class="content_count">
      <div class="content_count_left">
        <div id="content_count_left" />
        <div class="count_text">
          <div>
            <p>{{ Math.floor(reportDetail.correctRate) }}%</p>
            <span>正确率</span>
          </div>
        </div>
        <div class="count_number">
          <p>
            <span class="answer_true" />
            <span>做对：{{ Math.abs(reportDetail.rightCount)||0 }}人</span>
          </p>
          <p>
            <span class="answer_false" />
            <span>做错：{{ Math.abs(reportDetail.wrongCount)||0 }}人</span>
          </p>
          <p>
            <span class="answer_no" />
            <span>未答：{{ Math.abs(reportDetail.notDone)||0 }}人</span>
          </p>
        </div>
      </div>
      <div class="content_count_right">
        <div class="tab_conten_box_list">
          <div class="tab_conten_box_list_title">
            <span>A选项</span>
            <span>{{ reportDetail.a }}人</span>
          </div>
          <div class="percent">
            <div
              :class="reportDetail.question.answer[0]==1?'trueAnswer':''"
              :style="reportDetail.totalCount==0?'width:0%':'width:'+reportDetail.a/reportDetail.totalCount*100+'%'"
            />
          </div>
        </div>
        <div class="tab_conten_box_list">
          <div class="tab_conten_box_list_title">
            <span>B选项</span>
            <span>{{ reportDetail.b }}人</span>
          </div>
          <div class="percent">
            <div
              :class="reportDetail.question.answer[1]==2?'trueAnswer':''"
              :style="reportDetail.totalCount==0?'width:0%':'width:'+reportDetail.b/reportDetail.totalCount*100+'%'" 
            />
          </div>
        </div>
        <div
          class="tab_conten_box_list"
          v-show="reportDetail.question.type!=2"
        >
          <div class="tab_conten_box_list_title">
            <span>C选项</span>
            <span>{{ reportDetail.c }}人</span>
          </div>
          <div class="percent">
            <div
              :class="reportDetail.question.answer[2]==3?'trueAnswer':''"
              :style="reportDetail.totalCount==0?'width:0%':'width:'+reportDetail.c/reportDetail.totalCount*100+'%'"
            />
          </div>
        </div>
        <div
          class="tab_conten_box_list"
          v-show="reportDetail.question.type!=2"
        >
          <div class="tab_conten_box_list_title">
            <span>D选项</span>
            <span>{{ reportDetail.d }}人</span>
          </div>
          <div class="percent">
            <div
              :class="reportDetail.question.answer[3]==4?'trueAnswer':''"
              :style="reportDetail.totalCount==0?'width:0%':'width:'+reportDetail.d/reportDetail.totalCount*100+'%'" 
            />
          </div>
        </div>
      </div>
    </div>
    <QuestionDetail
      :question-id="id"
      :type="1"
    />
    <div class="content_rank">
      <div class="content_rank_left">
        <p class="title">
          前三名
        </p>
        <div class="content_box">
          <div
            class="content_box_list"
            :key="index"
            v-for="(item,index) in corretRateList"
            :style="index>=3?'padding:0':''"
          > 
            <div
              :class="'div'+index"
              v-if="index<3"
            >
              <p>{{ item.name.klass.name }}</p>
              <span>正确率：<span>{{ item.name.correctRate }}%</span></span>
            </div>
            <div
              class="report_people"
              v-if="index<3"
            >
              <p>做对：<span>{{ item.name.rightCount }}</span>&nbsp;&nbsp;人</p>
              <p>做错：<span>{{ item.name.wrongCount }}</span>&nbsp;&nbsp;人</p>
              <p>未做：<span>{{ item.name.notDone }}</span>&nbsp;&nbsp;人</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content_rank_right">
        <p class="title">
          后三名
        </p>
        <div class="content_box">
          <div
            class="content_box_list"
            v-for="(item,index) in errorRateList"
            :key="index"
          >
            <li>
              <div>
                <b>{{ item.index }}</b>
              </div>
              <div>
                <p>{{ item.name.klass.name }}</p>
                <span>正确率：<span>{{ item.name.correctRate }}%</span></span>
              </div>
            </li>
            <li class="report_people">
              <p>做对：<span>{{ item.name.rightCount }}</span>&nbsp;&nbsp;人</p>
              <p>做错：<span>{{ item.name.wrongCount }}</span>&nbsp;&nbsp;人</p>
              <p>未做：<span>{{ item.name.notDone }}</span>&nbsp;&nbsp;人</p>
            </li>
          </div>
        </div>
      </div>
    </div>
    <div class="send">
      <p>
        <button @click="endPractise()">
          返回
        </button>
      </p>
    </div>
  </div>
</template>
<script>
import echarts from "@/api/echarts.js";
import {mapMutations, mapState} from "vuex";
import QuestionDetail from "./../../../components/question/questionDetailRank";
export default({
  data(){
    return{
      id:window.localStorage.questionId,
      width:"",
      "query":{},
      reportDetail:{"correctRate":0,"wrongCount":"0","notDone":"0","question":{"answer":["","","",""]}},
      corretRateList:[],
      errorRateList:[],
      arrLength:""
    };
  },
  components:{QuestionDetail},
  created() {
    this.$store.state.loading = true;
    setTimeout(()=>{
      if( this.$store.state.loading == true ){
        this.$store.state.loading = false;
      }
    },5000);
  },
  computed:{
    ...mapState(["practiseMsg","lianxiPractiseMsg","tikuPractiseMsg"])
  },
  mounted() {
    console.log(this.$store.state.tabIndexNum);
    if( this.$store.state.tabIndexNum==5 ){
      if(this.$store.state.tikuPractiseMsg.orderClasses){
        this.$store.state.practiseMsg = this.$store.state.tikuPractiseMsg;
        this.$store.state.loading = false;
        this.getReport();
        this.getClass();
      }
    }else if(this.$store.state.tabIndexNum==1){
      if(this.$store.state.lianxiPractiseMsg.orderClasses){
        this.$store.state.practiseMsg = this.$store.state.lianxiPractiseMsg;
        this.$store.state.loading = false;
        this.getReport();
        this.getClass();
      }
    }
  },
  methods:{
    ...mapMutations(["tabIndexNum","changeLoading","changePractise","changeQuestionBank"]),
    endPractise(){
      this.$store.state.practiseMsg = {};
      if(this.$store.state.tabIndexNum==5){
        this.$store.state.tikuPractiseMsg = {};
      }else if(this.$store.state.tabIndexNum==1){
        this.$store.state.lianxiPractiseMsg = {};
      }
      if( this.$store.state.questionType ){
        this.changeQuestionBank(1);
      }else{
        this.changePractise(1);
      }
    },
    //获取学情报告详情
    getReport(){
      let arr = ["","","",""];
      for( let i=0; i<4; i++ ){
        JSON.stringify(this.$store.state.practiseMsg.question.answer).split("").forEach(item=>{
          if( i+1==item ){
            arr[i] = item;
          }
        });
      }
      this.$store.state.practiseMsg.question.answer = arr;
      this.$set(this,"reportDetail",this.$store.state.practiseMsg);
      setInterval(()=>{
        if( this.width<300 ){
          this.$set(this,"width",this.width+10);
        }
      },50);
    },
    ///获取班级数据排名
    getClass(){
      this.$set(this,"arrLength",this.$store.state.practiseMsg.orderClasses.length);
      let arr = [];
      this.$store.state.practiseMsg.orderClasses.forEach((item,index)=>{
        let json = {"index":index+1,"name":item};
        arr.push(json);
      });
      let arr2 = [];
      arr.reverse().forEach((item,index)=>{
        if( index<3 ){
          arr2.push(item);
        }
      });
      this.$set(this,"corretRateList",arr.reverse());
      this.$set(this,"errorRateList",arr2.reverse());
    },
  },
  watch:{
    tikuPractiseMsg:function(){
      this.$store.state.practiseMsg = this.$store.state.tikuPractiseMsg;
      this.$store.state.loading = false;
      this.getClass();
      this.getReport();
    },
    lianxiPractiseMsg:function(){
      this.$store.state.practiseMsg = this.$store.state.lianxiPractiseMsg;
      this.$store.state.loading = false;
      this.getClass();
      this.getReport();
    },
    reportDetail:function(){
      let myChart = echarts.init(document.getElementById("content_count_left"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name:"访问来源",
            type:"pie",
            radius: ["67%", "74.6%"],
            center:["50%","42%"],
            bottom:"90",
            hoverOffset: 3,
            avoidLabelOverlap: false,
            startAngle: 180,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                },
                color:"#333",
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:this.reportDetail.rightCount!=0?Math.abs(this.reportDetail.rightCount):null},
              {value:this.reportDetail.wrongCount!=0?Math.abs(this.reportDetail.wrongCount):null},
              {value:Math.abs(this.reportDetail.notDone)},
            ],
            color:["#3BCB1F","#FF5921","#EAEEF8"]
          }
        ]
      });
    }
  },
});
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
    .content_count{
        width: 100%;
        padding:20px 0 40px 0;
        background:rgba(255,255,255,1);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
         border-bottom:2px solid #E6E6E6;
    }
    .content_count_left{
        width: 50%;
        height: 268px;
        position: relative;
        #content_count_left{
            width: 100%;
            height: 268px;
        }
        .count_number{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            p{
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size:14px;
                font-family:PingFangSC-Regular;
                color:rgba(126,139,154,1);
                line-height:20px;
            }
            .answer_true{
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #3BCB1F;
                margin-right: 8px;
            }
            .answer_false{
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #FF5921;
                margin-right: 8px;
            }
            .answer_no{
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #EAEEF8;
                margin-right: 8px;
            }
        }
        .count_text{
            position: absolute;
            width: 100%;
            height: 200px;
            left: 0;
            top:5%;
            display: flex;
            flex-direction: row;
            align-items: center;
            div{
                width: 100%;
                text-align: center;
                p{
                    font-size:40px;
                    font-family:PingFangSC-Medium;
                    color:rgba(51,51,51,1);
                }
                span{
                    font-size:16px;
                    font-family:PingFangSC-Regular;
                    color:rgba(51,51,51,1);
                }
            }
        }
    }

    .content_count_right{
        padding: 0 20px;
        width: 50%;
        .tab_conten_box_list{
            margin-top: 20px;
            .tab_conten_box_list_title{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size:16px;
                font-family:PingFangSC-Regular;
                color:rgba(126,139,154,1);
                p{
                    width: 737px;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:1;
                    overflow:hidden;
                }
            }
            .percent{
                margin-top: 10px;
                display: inline-block;
                position: relative;
                width: 100%;
                background: #EAEEF8;
                border-radius: 10px;
                height: 10px;
                div{
                    height: 10px;
                    border-radius: 10px;
                    position: absolute;
                    background: #FF5921;
                    transition: all .2s linear;
                }
                .trueAnswer{
                    background: #3BCB1F;
                    transition: all .2s linear;
                }
            }
        }
    }
    .content_rank{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: #F6F8FC;
        padding:0 20px;
       .content_rank_left{
            width: 455px;
            padding: 20px 0 20px 0 ;
            .title{
                font-size:18px;
                font-family:PingFangSC-Medium;
                color:rgba(51,51,51,1);
            }
            .content_box{
                margin-top: 10px;
                .content_box_list{
                    margin-bottom: 16px;
                    background: #fff;
                    padding: 20px;
                    box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
                    .div0{
                        background: url('./../../../assets/image/first.png') no-repeat;
                        background-position:left center;
                        background-size: 48px 48px;
                    }
                    .div1{
                        background: url('./../../../assets/image/second.png') no-repeat;
                        background-position:left center;
                        background-size: 48px 48px;
                    }
                    .div2{
                        background: url('./../../../assets/image/third.png') no-repeat;
                        background-position:left center;
                        background-size: 48px 48px;
                    }
                    div{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding-left: 57px;
                        p{
                            font-size:16px;
                            font-family:PingFangSC-Regular;
                            color:rgba(51,51,51,1);
                        }
                        span{
                            margin-top:6px;
                            font-size:14px;
                            font-family:PingFangSC-Regular;
                            color:rgba(123,139,156,1);
                            span{
                                color: #23BF29;
                                font-weight: bold;
                            }
                        }
                    }
                    .report_people{
                        margin-top: 10px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        padding-left:0;
                        p{
                            font-size:14px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:rgba(126,139,154,1);
                            span{
                                color: #f39926;
                            }
                        }
                    }
                }
                
            }
        }
        .content_rank_right{
            width: 455px;
            padding: 20px 0 20px 20px;
            .title{
                font-size:18px;
                font-family:PingFangSC-Medium;
                color:rgba(51,51,51,1);
            }
            .content_box{
                margin-top: 10px;
                .content_box_list{
                    background: #fff;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 16px;
                    box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
                    div{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    li{
                        display: flex;
                        flex-direction: row;
                    }
                    .report_people{
                        margin-top: 10px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        padding-left:0;
                        p{
                            font-size:14px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:rgba(126,139,154,1);
                            span{
                                color: #f39926;
                            }
                        }
                    }
                    b{
                        display: inline-block;
                        width: 48px;
                        height: 48px;
                        background: url('./../../../assets/image/icon_star.png') no-repeat;
                        background-position:center center;
                        background-size: 48px 48px;
                        margin-right: 9px;
                        text-align: center;
                        line-height: 48px;
                        font-size:22px;
                        font-family:PingFangSC-Medium;
                        color:#FF5921;
                    }
                    p{
                        font-size:16px;
                        font-family:PingFangSC-Regular;
                        color:rgba(51,51,51,1);
                    }
                    span{
                        margin-top:6px;
                        font-size:14px;
                        font-family:PingFangSC-Regular;
                        color:rgba(123,139,156,1);
                        span{
                            color: #23BF29;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
</style>
