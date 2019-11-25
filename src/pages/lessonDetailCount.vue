<template>
  <div class="box_lessonDetailcount">
    <div
      class="course_lesson"
      v-if="titledetail.questionInfo"
    >
      <p>{{ query.courseName }}-</p>
      <span>{{ query.lessonName }}</span>
    </div>
    <div
      class="top"
      v-if="!titledetail.questionInfo"
    >
      <p>
        题目序号：
        <span>{{ query.index }}</span>
      </p>
      <p>
        做题时间：
        <span>{{ titledetail.question.createTime }}</span>
      </p>
      <p>
        所属课程：
        <span>
          {{ titledetail.courseVo.course.name }}(
          <span>{{ titledetail.courseVo.finishLesson }}</span>
          /{{ titledetail.courseVo.totalLesson }})
        </span>
      </p>
      <p>
        题目类型：
        <span>{{ titledetail.question.category==0?"练习":titledetail.question.category==1?'PK互动':'' }}-自定义题</span>
      </p>
    </div>
    <PreLessonDetail
      v-if="titledetail.questionInfo"
      type="1"
    />
    <div class="content">
      <div class="content_left">
        <ul>
          <li
            :class="checkId==''?'active_select_box':'select_box'"
            @click="checkClass('','全部班级')"
          >
            全部班级
          </li>
          <div
            :key="index"
            v-for="(item,index) in classList"
          >
            <li
              :class="checkId==item.id?'active_select_box':'select_box'"
              @click="checkClass(item.id,item.name)"
              :id="item.id"
            >
              {{ item.name }}
            </li>
          </div>
        </ul>
      </div>
      <div class="content_right">
        <p class="bg" />
        <div>
          <p class="allclass">
            {{ className }}
          </p>
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
                  <span>做对：{{ Math.abs(reportDetail.rightCount) }}人</span>
                </p>
                <p>
                  <span class="answer_false" />
                  <span>做错：{{ Math.abs(reportDetail.wrongCount) }}人</span>
                </p>
                <p>
                  <span class="answer_no" />
                  <span>未答：{{ Math.abs(reportDetail.notDone) }}人</span>
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
            ref="questionDetail"
            :question-id="id"
            :type="2"
          />
          <div class="content_rank">
            <div class="content_rank_left">
              <p class="title">
                前三名
              </p>
              <div class="content_box">
                <div
                  class="content_box_list"
                  v-for="(item,index) in corretRateList"
                  :style="index>=3?'padding:0':''"
                >
                  <div
                    :class="'div'+index"
                    v-if="index<3"
                  >
                    <p>{{ item.name.klass.name }}</p>
                    <span>
                      正确率：
                      <span>{{ item.name.correctRate }}%</span>
                    </span>
                  </div>
                  <div
                    class="report_people"
                    v-if="index<3"
                  >
                    <p>
                      做对：
                      <span>{{ item.name.rightCount }}</span>&nbsp;&nbsp;人
                    </p>
                    <p>
                      做错：
                      <span>{{ item.name.wrongCount }}</span>&nbsp;&nbsp;人
                    </p>
                    <p>
                      未做：
                      <span>{{ item.name.notDone }}</span>&nbsp;&nbsp;人
                    </p>
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
                  :key="index"
                  class="content_box_list"
                  v-for="(item,index) in errorRateList"
                >
                  <li>
                    <div>
                      <b>{{ item.index }}</b>
                    </div>
                    <div>
                      <p>{{ item.name.klass.name }}</p>
                      <span>
                        正确率：
                        <span>{{ item.name.correctRate }}%</span>
                      </span>
                    </div>
                  </li>
                  <li class="report_people">
                    <p>
                      做对：
                      <span>{{ item.name.rightCount }}</span>&nbsp;&nbsp;人
                    </p>
                    <p>
                      做错：
                      <span>{{ item.name.wrongCount }}</span>&nbsp;&nbsp;人
                    </p>
                    <p>
                      未做：
                      <span>{{ item.name.notDone }}</span>&nbsp;&nbsp;人
                    </p>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getClassList,
  getCourseReport,
  getClassRank,
  gerTitleUrl
} from "./../api/index.js";
import QuestionDetail from "./../components/question/questionDetailRank";
import PreLessonDetail from "@/components/prepareLesson/preLessonDetail.vue";
import echarts from "@/api/echarts.js";
export default {
  data() {
    return {
      id: this.$route.query.questionId,
      className: "",
      width: 0,
      lessonId: "",
      classList: [],
      checkId: "",
      query: {},
      reportDetail: { correctRate: "0", question: { answer: ["", "", "", ""] } },
      question: {},
      corretRateList: [],
      errorRateList: [],
      arrLength: "",
      titledetail: {
        courseVo: {
          course: {
            name: ""
          },
          finishLesson: "",
          totalLesson: ""
        },
        question: {
          category: ""
        }
      }
    };
  },
  computed: {
    prepareLessonDetail: function() {
      return this.$store.state.prepareLessonDetail;
    }
  },
  watch: {
    reportDetail: function() {
      let myChart = echarts.init(document.getElementById("content_count_left"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["67%", "74.6%"],
            center: ["50%", "42%"],
            bottom: "90",
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
                color: "#333"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: this.reportDetail.rightCount ? Math.abs(this.reportDetail.rightCount) : null
              },
              {
                value: this.reportDetail.wrongCount ? Math.abs(this.reportDetail.wrongCount) : null
              },
              { value: Math.abs(this.reportDetail.notDone) }
            ],
            color: ["#3BCB1F", "#FF5921", "#EAEEF8"]
          }
        ]
      });
    }
  },
  methods: {
    //检索班级
    checkClass(id, name) {
      if (id === undefined) {
        this.$set(this, "checkId", "");
        this.$set(this, "checkIdName", name);
      } else {
        this.$set(this, "checkId", id);
        this.$set(this, "className", name);
      }
      this.$refs.questionDetail.changeType(id);
      this.getReport(this.query.lessonId, id);
    },
    //检索数据
    getList(id) {
      const json = { lessonId: id };
      getClassList(json)
        .then(res => {
          if (res.data.errno == 200) {
            this.$set(this, "classList", res.data.data);
          }
        })
        .catch();
    },
    //获取班级数据排名
    getClass() {
      getClassRank({ questionId: this.query.questionId })
        .then(res => {
          if (res.data.errno == 200) {
            this.$set(this, "arrLength", res.data.data.length);
            let arr = [];
            res.data.data.forEach((item, index) => {
              let json = { index: index + 1, name: item };
              arr.push(json);
            });
            let arr2 = [];
            arr.reverse().forEach((item, index) => {
              if (index < 3) {
                arr2.push(item);
              }
            });
            this.$set(this, "corretRateList", arr.reverse());
            this.$set(this, "errorRateList", arr2.reverse());
          }
        })
        .catch(() => {});
    },
    //获取学情报告详情
    getReport(lessonid, checkId) {
      const that = this;
      const searJson = { questionId: this.query.questionId, classId: checkId };
      getCourseReport(searJson)
        .then(res => {
          if (res.data.errno == 200) {
            let arr = ["", "", "", ""];
            for (let i = 0; i < 4; i++) {
              JSON.stringify(res.data.data.question.answer)
                .split("")
                .forEach((item) => {
                  if (i + 1 == item) {
                    arr[i] = item;
                  }
                });
              if (i == 3) {
                res.data.data.question.answer = arr;
                that.$set(that, "reportDetail", res.data.data);
              }
            }
            res.data.data.question.answer = arr;
            that.$set(that, "reportDetail", res.data.data);
          }
        })
        .catch();
    },
    //获取学情报告标题
    getTitleDetail() {
      gerTitleUrl({ questionId: this.query.questionId })
        .then(res => {
          if (res.data.errno == 200) {
            if (res.data.data.questionInfo) {
              let json = {};
              json.questionInfoList = res.data.data.questionInfo[0];
              this.$store.state.prepareLessonDetail = json;
              this.$store.state.prepareLessonDetail.index = 1;
            }
            this.$set(this, "titledetail", res.data.data);
          }
        })
        .catch();
    }
  },
  mounted() {
    if (this.$route.query.classId) {
      this.$refs.questionDetail.changeType(this.$route.query.classId);
    }
    setInterval(() => {
      if (this.width < 300) {
        this.$set(this, "width", this.width + 10);
      }
    }, 50);
  },
  created() {
    this.$set(this, "query", this.$route.query);
    this.$set(this, "checkId", this.$route.query.classId ? this.$route.query.classId : "");
    this.$set(this, "className", this.$route.query.className ? this.$route.query.className : "");
    this.getList(this.$route.query.lessonId);
    this.getReport(this.query.questionId, this.checkId);
    this.getClass();
    this.getTitleDetail();
  },
  components: { QuestionDetail, PreLessonDetail }
};
</script>
<style lang="scss" scoped>
.box_lessonDetailcount {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 0 20px 60px 20px;
  .course_lesson {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 26px;
    p {
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    span {
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }
  .time {
    margin-top: 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(126, 139, 154, 1);
    line-height: 22px;
  }
  .top {
    width: 100%;
    height: 192px;
    padding: 20px;
    box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
    border-radius: 4px 4px 4px 0px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
      font-family: PingFangSC-Regular;
      color: rgba(126, 139, 154, 1);
      span {
        color: #333;
        span {
          color: #f39926;
        }
      }
    }
  }
  .content {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: space-between;
    .content_left {
      ul {
        li:hover {
          border: 2px solid #f39926;
          box-sizing: border-box;
          line-height: 28px;
        }
        .select_box {
          cursor: pointer;
          width: 171px;
          height: 30px;
          border-radius: 2px;
          border: 1px solid #f39926;
          list-style-type: none;
          margin-bottom: 16px;
          text-align: center;
          color: #333;
          box-sizing: border-box;
          line-height: 30px;
        }
        .active_select_box {
          cursor: pointer;
          width: 171px;
          height: 30px;
          border-radius: 2px;
          border: 1px solid #f39926;
          list-style-type: none;
          margin-bottom: 16px;
          text-align: center;
          color: #fff;
          background: #f39926;
          justify-content: space-around;
          line-height: 30px;
        }
        li {
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .content_right {
      width: 970px;
      background: #fff;
      position: relative;
      box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
      padding: 20px 20px 60px 20px;
      border-radius: 4px 4px 4px 4px;
      .bg {
        position: absolute;
        left: 0;
        display: inline-block;
        height: 24px;
        width: 4px;
        top: 20px;
        background: #f39926;
      }
      .allclass {
        font-size: 18px;
        font-family: PingFangSC-Regular;
        color: rgba(51, 51, 51, 1);
      }
      .content_count {
        margin-top: 20px;
        width: 100%;
        padding: 20px 0 40px 0;
        background: rgba(255, 255, 255, 1);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 2px solid #e6e6e6;
      }
      .content_count_left {
        width: 50%;
        height: 268px;
        position: relative;
        #content_count_left {
          width: 100%;
          height: 268px;
        }
        .count_number {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          p {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            color: rgba(126, 139, 154, 1);
            line-height: 20px;
          }
          .answer_true {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #3bcb1f;
            margin-right: 8px;
          }
          .answer_false {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ff5921;
            margin-right: 8px;
          }
          .answer_no {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #eaeef8;
            margin-right: 8px;
          }
        }
        .count_text {
          position: absolute;
          width: 100%;
          height: 200px;
          left: 0;
          top: 5%;
          display: flex;
          flex-direction: row;
          align-items: center;
          div {
            width: 100%;
            text-align: center;
            p {
              font-size: 40px;
              font-family: PingFangSC-Medium;
              color: rgba(51, 51, 51, 1);
            }
            span {
              font-size: 16px;
              font-family: PingFangSC-Regular;
              color: rgba(51, 51, 51, 1);
            }
          }
        }
      }

      .content_count_right {
        padding: 0 20px;
        width: 50%;
        .tab_conten_box_list {
          margin-top: 20px;
          .tab_conten_box_list_title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 16px;
            font-family: PingFangSC-Regular;
            color: rgba(126, 139, 154, 1);
            p {
              width: 737px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
          }
          .percent {
            margin-top: 10px;
            display: inline-block;
            position: relative;
            width: 100%;
            background: #eaeef8;
            border-radius: 10px;
            height: 10px;
            div {
              width: 0%;
              height: 10px;
              border-radius: 10px;
              position: absolute;
              background: #ff5921;
              transition: all 0.5s ease;
            }
            .trueAnswer {
              width: 0%;
              background: #3bcb1f;
            }
          }
        }
      }
      .content_rank {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: #f6f8fc;
        padding: 0 20px;
        .content_rank_left {
          width: 455px;
          padding: 20px 0 20px 0;
          .title {
            font-size: 18px;
            font-family: PingFangSC-Medium;
            color: rgba(51, 51, 51, 1);
          }
          .content_box {
            margin-top: 10px;
            .content_box_list {
              margin-bottom: 16px;
              background: #fff;
              padding: 20px;
              box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
              .div0 {
                background: url("./../assets/image/first.png") no-repeat;
                background-position: left center;
                background-size: 48px 48px;
              }
              .div1 {
                background: url("./../assets/image/second.png") no-repeat;
                background-position: left center;
                background-size: 48px 48px;
              }
              .div2 {
                background: url("./../assets/image/third.png") no-repeat;
                background-position: left center;
                background-size: 48px 48px;
              }
              div {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-left: 57px;
                p {
                  font-size: 16px;
                  font-family: PingFangSC-Regular;
                  color: rgba(51, 51, 51, 1);
                }
                span {
                  margin-top: 6px;
                  font-size: 14px;
                  font-family: PingFangSC-Regular;
                  color: rgba(123, 139, 156, 1);
                  span {
                    color: #23bf29;
                    font-weight: bold;
                  }
                }
              }
              .report_people {
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-left: 0;
                p {
                  font-size: 14px;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(126, 139, 154, 1);
                  span {
                    color: #f39926;
                  }
                }
              }
            }
          }
        }
        .content_rank_right {
          width: 455px;
          padding: 20px 0 20px 20px;
          .title {
            font-size: 18px;
            font-family: PingFangSC-Medium;
            color: rgba(51, 51, 51, 1);
          }
          .content_box {
            margin-top: 10px;
            .content_box_list {
              background: #fff;
              padding: 20px;
              display: flex;
              flex-direction: column;
              margin-bottom: 16px;
              box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
              div {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              li {
                display: flex;
                flex-direction: row;
              }
              .report_people {
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-left: 0;
                p {
                  font-size: 14px;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(126, 139, 154, 1);
                  span {
                    color: #f39926;
                  }
                }
              }
              b {
                display: inline-block;
                width: 48px;
                height: 48px;
                background: url("./../assets/image/icon_star.png") no-repeat;
                background-position: center center;
                background-size: 48px 48px;
                margin-right: 9px;
                text-align: center;
                line-height: 48px;
                font-size: 22px;
                font-family: PingFangSC-Medium;
                color: #ff5921;
              }
              p {
                font-size: 16px;
                font-family: PingFangSC-Regular;
                color: rgba(51, 51, 51, 1);
              }
              span {
                margin-top: 6px;
                font-size: 14px;
                font-family: PingFangSC-Regular;
                color: rgba(123, 139, 156, 1);
                span {
                  color: #23bf29;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>







