<template>
  <div class="box_contentMsg">
    <QuestionBankModel
      ref="questionBankModel"
      v-if="list"
      :list="list"
    />
    <div class="top">
      <p>{{ query.courseName }}-</p>
      <span>{{ query.lessonName }}</span>
    </div>
    <div
      class="time"
    >
      {{ query.state==1?query.realStartTime.split(' ')[0]:query.startTime.split(' ')[0] }} {{ query.state==1?query.realStartTime.split(' ')[1]:query.startTime.split(' ')[1] }}-{{ query.state==1?query.realEndTime.split(' ')[1]:query.endTime.split(' ')[1] }}
    </div>
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
            v-for="(item,index) in classList"
            :key="index"
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
          <div class="content_right_top">
            <p class="allpeople">
              {{ className }}
            </p>
            <p>
              <span>班级数量：{{ checkId==''?reportDetail.classCount:'1' }}个</span>
              <span class="column-line" />
              <span>上课人数：{{ reportDetail.stuCount }}人</span>
              <span class="column-line" />
              <span>签到人数：{{ reportDetail.signCount }}人</span>
            </p>
          </div>
          <div class="content_right_middle">
            <div class="table_title">
              <img
                src="./../assets/image/title_icon.png"
                alt="icon"
              >
              <p>
                课后反馈
                <span>
                  (本次共统计到
                  <span>{{ reportDetail.reportCount }}</span> 人)
                </span>
              </p>
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
          <div class="content_right_bottom">
            <div class="table_title">
              <img
                src="./../assets/image/title_icon.png"
                alt="icon"
              >
              <p>
                课堂学情
                <span>
                  (本次共统计到
                  <span>{{ reportDetail.answerCount }}</span> 人)
                </span>
              </p>
            </div>
            <div
              class="questionBank"
              v-if="list"
            >
              <p>
                <span>题库题目使用情况：{{ list.num }}/{{ list.questionList.length }}次</span>
                <span class="fenge">|</span>
                <span>练习次数：{{ list.lessonDetailDto.practiceCount }}次</span>
                <span class="fenge">|</span>
                <span>班级PK次数：{{ list.lessonDetailDto.pKCount }}次</span>
                <a
                  v-if="list.num"
                  @click="openDetail"
                >详情</a>
              </p>
              <ul>
                <li>
                  <div>
                    <span>自定义练习</span>
                    <span>
                      <span>{{ list.lessonDetailDto.customPracticeCount }}</span>次
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>自定义班级PK</span>
                    <span>
                      <span>{{ list.lessonDetailDto.customPKCount }}</span>次
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>抢红包次数</span>
                    <span>
                      <span>{{ list.lessonDetailDto.packetCount }}</span>次
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="table">
              <ul>
                <li class="tab_title">
                  <span>题目类型</span>
                  <span>正确率</span>
                  <span>统计时间</span>
                  <span>操作</span>
                </li>
                <li
                  v-for="(item,index) in reportDetail.questionList"
                  :key="index"
                  :style="index%2==0?'background-color:#F6F9FF':''"
                >
                  <span
                    class="tab_title_one"
                  >{{ item.question.category==0?'练习题':item.question.category==1?"互动题":item.question.category==2?"反馈题":"" }}</span>
                  <span class="tab_title_two">{{ Math.floor(item.correctRate) }}%</span>
                  <span class="tab_title_three">{{ item.question.createTime }}</span>
                  <span class="tab_title_four">
                    <span @click="questionDetail(item.question.id,item,index)">
                      详情
                      <Icon
                        type="ios-arrow-forward"
                        color="#f39926"
                      />
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getlessonDetail, getClassList, getQuestionBank } from "./../api/index.js";
import QuestionBankModel from "@/components/model/questionBankModel.vue";
export default {
  data() {
    return {
      width: 0,
      lessonId: "",
      classList: [],
      checkId: "",
      query: {},
      reportDetail: {},
      className: "全部班级",
      list: null
    };
  },
  components: { QuestionBankModel },
  methods: {
    openDetail() {
      this.$refs.questionBankModel.check();
    },
    //获取题库题目详情
    getQuestionBank() {
      getQuestionBank({ id: this.$route.query.lessonId, pageNum: 1, pageSize: 10000 }).then(res => {
        if (res.data.errno == 200) {
          this.list = res.data.data;
          let num = 0;
          res.data.data.questionList.map(item => {
            if (item.category == 1) {
              num++;
            } else if (item.category == 0) {
              num++;
            }
          });
          this.list.num = num;
        }
      });
    },
    //统计题详情
    questionDetail(id, question, index) {
      let routeData = this.$router.resolve({
        path: "openbox/lessonDetailCount",
        query: {
          questionId: id,
          index: index + 1,
          className: this.className,
          classId: this.checkId,
          lessonId: this.query.lessonId,
          courseName: this.query.courseName,
          lessonName: this.query.lessonName
        }
      });
      window.open(routeData.href, "_blank");
    },
    //班级检索课中练习题list
    checkClass(id, name) {
      if (id === undefined) {
        this.$set(this, "checkId", "");
        this.$set(this, "className", "全部班级");
      } else {
        this.$set(this, "checkId", id);
        this.$set(this, "className", name);
      }
      this.getReport(this.query.lessonId, id);
    },
    //检索班级数据
    getList(id) {
      const json = { lessonId: id };
      getClassList(json)
        .then(res => {
          if (res.data.errno == 200) {
            this.$set(this, "classList", res.data.data);
          } else if (res.data.errno == 40160) {
            alert("没有数据");
          }
        })
        .catch();
    },
    //班级检索课中练习题list接口
    getReport(lessonid, checkId) {
      const searJson = { lessonId: lessonid, classId: checkId };
      getlessonDetail(searJson)
        .then(res => {
          if (res.data.errno == 200) {
            this.$set(this, "reportDetail", res.data.data);
          }
        })
        .catch();
    }
  },
  mounted() {
    setInterval(() => {
      if (this.width < 300) {
        this.$set(this, "width", this.width + 10);
      }
    }, 50);
  },
  created() {
    this.$set(this, "query", this.$route.query);
    this.getList(this.$route.query.lessonId);
    this.getReport(this.$route.query.lessonId, "");
    this.getQuestionBank();
  }
};
</script>
<style lang="scss" scoped>
.box_contentMsg {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 60px;
  .time {
    margin-top: 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(126, 139, 154, 1);
    line-height: 22px;
  }
  .top {
    display: flex;
    flex-direction: row;
    p {
      font-size: 22px;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      font-family: PingFangSC-Semibold;
    }
    span {
      font-size: 18px;
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
      padding: 20px 10px 60px 20px;
      box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
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
      .content_right_top {
        .allpeople {
          font-size: 18px;
          font-family: PingFangSC-Regular;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          margin-bottom: 16px;
        }
        p {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 16px;
          font-family: PingFangSC-Regular;
          color: rgba(126, 139, 154, 1);
          line-height: 22px;
        }
      }
      .content_right_middle {
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0px 20px 40px 20px;
        margin-top: 30px;
        .tab_content_box {
          display: flex;
          flex-direction: column;
          .tab_conten_box_list {
            margin-top: 20px;
            width: 100%;
            .tab_conten_box_list_title {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-size: 16px;
              font-family: PingFangSC-Regular;
              color: rgba(126, 139, 154, 1);
              span {
                color: #f39926;
              }
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
              .percent_ab {
                width: 0px;
                height: 10px;
                border-radius: 10px;
                position: absolute;
                background: #3bcb1f;
                transition: width 0.5s ease;
              }
            }
          }
        }
      }
      .content_right_bottom {
        border-top: 2px solid #e6e6e6;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 40px 0 0 0;
        margin-left: 20px;
        margin-right: 20px;
        .table {
          width: 100%;
          ul {
            .tab_title {
              font-size: 18px;
              font-family: PingFangSC-Medium;
              color: rgba(126, 139, 154, 1);
            }
            li {
              height: 50px;
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              span {
                height: 50px;
                width: 25%;
                display: inline-block;
                text-align: center;
                line-height: 50px;
              }
              .tab_title_one {
                font-size: 14px;
                font-family: PingFangSC-Regular;
                color: rgba(51, 51, 51, 1);
              }
              .tab_title_two {
                font-size: 14px;
                font-family: PingFangSC-Regular;
                color: rgba(59, 203, 31, 1);
              }
              .tab_title_three {
                font-size: 14px;
                font-family: PingFangSC-Regular;
                color: rgba(51, 51, 51, 1);
              }
              .tab_title_four {
                font-size: 14px;
                font-family: PingFangSC-Regular;
                color: #f39926;
                span {
                  cursor: pointer;
                }
                i {
                  margin-left: 3px;
                }
              }
            }
          }
        }
      }
      .questionBank {
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
        p {
          margin: 0 0 40px 0;
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(126, 139, 154, 1);
          .fenge {
            margin: 0 6px;
            color: #d8d8d8;
          }
        }
        ul {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          li {
            display: flex;
            flex-direction: row;
            width: 290px;
            height: 131px;
            border-radius: 4px;
            border: 2px solid rgba(230, 230, 230, 1);
            align-items: center;
            justify-content: space-around;
            div {
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 24px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(126, 139, 154, 1);
              span {
                span {
                  font-size: 48px;
                  font-family: PingFangSC-Medium;
                  font-weight: 500;
                  color:#f39926;
                  line-height: 58px;
                }
              }
            }
          }
        }
      }
      .table_title {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        font-weight: bolod;
        img {
          width: 14px;
          height: 18px;
          margin-right: 8px;
        }
        p {
          font-size: 18px;
          font-family: PingFangSC-Regular;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
        }
        span {
          color: #7e8b9a;
          font-size: 16px;
          span {
            color:#f39926;
          }
        }
      }
    }
  }
}
</style>
