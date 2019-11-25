<template>
  <div class="box">
    <div class="report-list">
      <Button
        type="primary"
        class="btn-collect"
        @click="goReportList"
      >
        汇总数据
      </Button>
      <ul>
        <li
          :key="index"
          class="checked"
          v-for="(item,index) in lessonDetail"
          @click="detailTo(item.id,index)"
        >
          <p>题目序号：<span>{{ index+1 }}</span></p>
          <p>做题时间：<span>{{ item.createTime }}</span></p>
          <p>所属课程：<span>{{ courseName }}-{{ lessonName }}</span></p>
          <p v-if="!item.questionLibraryId">
            题目类型：<span>{{ item.category==0?"练习-":'' }}自定义题</span>
          </p>
          <p v-if="item.questionLibraryId">
            题目类型：<span>题库题目</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";
import {getQuestionList} from "./../../api/index";
export default({
  data(){
    return{
      lessonDetail:[],
      courseName:"",
      lessonName:""
    };
  },
  created() {
    this.changeTabNum(3);
    this.$set(this,"courseName",window.localStorage.getItem("courseName"));
    this.$set(this,"lessonName",window.localStorage.getItem("lessonName"));
    getQuestionList({"lessonId":window.localStorage.lessonId}).then(res=>{
      this.$set(this,"lessonDetail",res.data.data);
    }).catch();
  },
  methods:{
    ...mapMutations(["changeTabNum"]),
    detailTo(id,index){
      let routeData = this.$router.resolve({path:"/openbox/lessonDetailCount",query:{"questionId":id,"classId":"","index":index+1,"courseName":window.localStorage.getItem("courseName"),"lessonName":window.localStorage.getItem("lessonName"),"lessonId":window.localStorage.getItem("lessonId")}});
      window.open(routeData.href, "_blank");
    },
    goReportList () {
      window.open("/#/openbox/reportlist");
    }
  }
});
</script>
<style lang="scss" scoped>
    .report-list>ul li{
        padding:20px 20px 0px 20px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 16px 0px rgba(205,212,225,0.5);
        border-radius:4px 4px 4px 0px;
        margin-bottom: 20px;
        border-left:3px solid #fff;
        box-sizing: border-box;
        cursor: pointer;
    }
    .report-list>ul li:hover{
        border-left:3px solid #f39926;
        box-sizing: border-box;
    }
    .report-list>ul li>p{
        font-size:18px;
        font-family:PingFangSC-Regular;
        color:rgba(126,139,154,1);
        padding-bottom:18px;
    }
    .report-list>ul li>p span{
        color:RGBA(51, 51, 51, 1);
    }

    .btn-collect {
      margin-bottom: 20px;
    }
</style>
