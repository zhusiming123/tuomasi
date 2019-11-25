<template>
  <div class="box">
    <div class="header">
      本次课程信息
    </div>
    <div class="content_right_middle">    
      <div class="table_title">
        <p>{{ course }}-<span>{{ lesson }}</span></p>
        <div>统计已结束，共{{ reportDetail.reportCount }}名学生参与反馈</div>
      </div>
      <div class="tab_content_box">
        <div class="tab_conten_box_list">
          <div class="tab_conten_box_list_title">
            <p>A 本节课充实并学到了新知识</p>
            <span>{{ reportDetail.a }}人/{{ reportDetail.aPercent }}%</span>
          </div>
          <div class="percent">
            <div
              class="percent_ab"
              :style="'width:'+reportDetail.aPercent+'%'" 
            />
          </div>
        </div>
        <div class="tab_conten_box_list">
          <div class="tab_conten_box_list_title">
            <p>B 本节课较充实并学到了新知识</p>
            <span>{{ reportDetail.b }}人/{{ reportDetail.bPercent }}%</span>
          </div>
          <div class="percent">
            <div
              class="percent_ab"
              :style="'width:'+reportDetail.bPercent+'%'" 
            />
          </div>
        </div>
        <div class="tab_conten_box_list">
          <div class="tab_conten_box_list_title">
            <p>C 本节课一般并学到了一些新知识</p>
            <span>{{ reportDetail.c }}人/{{ reportDetail.cPercent }}%</span>
          </div>
          <div class="percent">
            <div
              class="percent_ab"
              :style="'width:'+reportDetail.cPercent+'%'"
            />
          </div>
        </div>
        <div class="tab_conten_box_list">
          <div class="tab_conten_box_list_title">
            <p>D 本节课不好并没有学到了新知识</p>
            <span>{{ reportDetail.d }}人/{{ reportDetail.dPercent }}%</span>
          </div>
          <div class="percent">
            <div
              class="percent_ab"
              :style="'width:'+reportDetail.dPercent+'%'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="send">
      <p>
        <button @click="endTo">
          结束课堂
        </button>
      </p>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapState} from "vuex";
import {endLesson} from "./../../../api/index";
export default{
  data(){
    return{
      reportDetail:{},
      course:"",
      lesson:"",
    };  
  },
  computed:{
    ...mapState(["backUplateMsg"])  
  },
  created(){
    this.$set(this,"course",window.localStorage.getItem("courseName"));
    this.$set(this,"lesson",window.localStorage.getItem("lessonName"));
    this.$store.state.loading = true;
    setTimeout(()=>{
      if( this.$store.state.loading == true ){
        this.$store.state.loading = false;
      }
    },5000);
  },
  mounted(){
    if( this.$store.state.backUplateMsg.a||this.$store.state.backUplateMsg.a==0 ){
      this.$store.state.loading = false;
      this.getReport();    
    }
  },
  methods:{
    ...mapMutations(["changeLoading","changeBackSteps"]),
    //班级检索课中练习题list接口
    getReport(){
      this.$set(this,"reportDetail",this.$store.state.backUplateMsg);
    },
    endTo(){
      this.$store.state.backUplateMsg = {};
      endLesson({"lessonId":window.localStorage.getItem("lessonId")}).then(res=>{
        if( res.data.errno==200 ){
          this.changeBackSteps(1);
          this.$router.push({"path":"/Topic"});
        }
      }).catch();
    }
  },
  watch:{
    backUplateMsg:function(){
      this.$store.state.loading = false;
      this.getReport();
    }
  }
};
</script>
<style lang="scss" scoped>
    .header{
        font-size:20px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
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
    .content_right_middle{
        background:rgba(246,248,252,1);
        padding: 20px 20px 40px 20px;
        margin-top: 20px;
        
        .table_title{
            display: flex;
            flex-direction: column;
            p{
                font-size:18px;
                font-family:PingFangSC-Semibold;
                color:rgba(51,51,51,1);
                span{
                    font-family:PingFangSC-Regular;
                    font-size:14px;
                }
            }
            div{
                font-size:16px;
                font-family:PingFangSC-Regular;
                color:#f39926;
                margin-top: 20px;
            }
        }
        .tab_content_box{
            display: flex;
            flex-direction: column;
            .tab_conten_box_list{
                margin-top: 20px;
                width: 100%;
                .tab_conten_box_list_title{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size:16px;
                    font-family:PingFangSC-Regular;
                    color:rgba(126,139,154,1);
                    span{
                        color:#f39926;
                    }
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
                    .percent_ab{
                        height: 10px;
                        border-radius: 10px;
                        position: absolute;
                        background: #3BCB1F;
                        transition: all .2s linear;
                    }
                }
            }
        }
    }
</style>
