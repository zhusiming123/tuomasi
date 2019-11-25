<template>
    <div class="box_discussDetail">
        <div class="top">
            <h1>{{msg.name}}-</h1>
            <h2>
                <span>第{{msg.number}}讲：</span>
                <span>{{msg.lessonname}}</span>
            </h2>
            <p>
                <span>{{timeFormat}}</span>
            </p>
        </div>
        <div class="content">
            <div class="detail">
                <div class="left">
                  <div>
                    <p>辅导老师</p>
                  </div>
                    <ul class="list">
                        <li v-for="(item,index) in assistantsList" :key="index" :class="item.assistant.id==chosedId?'choosed':''" @click="chosePerson(item.assistant.id)">
                            <p class="assName">{{item.assistant.name}}</p>
                            <p class="schName" :title="item.school.schoolName">{{item.school.schoolName}}</p>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <h2>磨课任务</h2>
                    <div class="context" v-show="flag">
                        <div class="impotent" v-for="(item,index) in discribe.data" :key="index">
                            <h3>{{index+1}}、{{item.name}}</h3>
                            <div class="imDetail" v-show="flag">
                                <span v-show="item.taskNote">{{item.taskNote}}</span>
                                <div class="impotentImg" v-show="item.pathList.length>0">
                                    <img v-for="(it,index) in item.pathList" :key="index" @click="enlarge(it)" :src="it">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nocontent" v-show="!flag">
                      <p>暂无任务内容~</p>
                    </div>
                </div>
            </div>
        </div>
        <Maskname v-show="showDlg" :imgSrc="imgSrc"></Maskname>
    </div>
</template>
<script>
import { teacherList, discussDetail } from "@/api/index.js";
import { eventBus } from "@/api/eventBus.js";
import Maskname from "@/components/common/mask.vue";
export default {
  data() {
    return {
      msg: {},
      imgList: [1, 3, 4],
      assistantsList: [],
      ass: [],
      discribe: [],
      showDlg: false,
      chosedId: 0,
      flag: true,
      imgSrc: "",
      timeFormat: ""
    };
  },
  components: { Maskname },
  created() {
    eventBus.$on("hided", res => {
      this.showDlg = !this.showDlg;
    });
    this.msg = JSON.parse(window.localStorage.getItem("statusObj"));
    this.msg.userId = window.localStorage.getItem("peopleId");
    this.chosedId = this.msg.userId;
    this.timeFormat = this.msg.start + "-" + this.msg.end.split(" ")[1];
  },
  mounted() {
    this.getTeacherList();
    this.chosePerson(this.msg.userId);
    $(".left").height(window.innerHeight - 250);
  },
  methods: {
    chosePerson(userId) {
      discussDetail({ lessonId: this.msg.lessonId, assistantId: userId })
        .then(res => {
          if (res.data.errno == 200) {
            this.flag = true;
            this.discribe = res.data;
            this.chosedId = userId;
          } else if (res.data.errno == 40106) {
            this.flag = false;
            this.chosedId = userId;
          }
        })
        .catch();
    },
    getTeacherList() {
      teacherList({ lessonId: this.msg.lessonId })
        .then(res => {
          if (res.data.errno == 200) {
            this.assistantsList = res.data.data.assistants;
            this.assistantsList.forEach((ele, index) => {
              if (ele.assistant.id != this.msg.userId) {
                this.ass.push(ele);
              } else {
                this.assistantsList = this.assistantsList.slice(
                  index,
                  index + 1
                );
              }
            });
            this.assistantsList = this.assistantsList.concat(this.ass);
          }
        })
        .catch();
    },
    enlarge(reg) {
      this.showDlg = true;
      this.imgSrc = reg;
    }
  }
};
</script>
<style lang="scss" scoped>
.box_discussDetail {
  display: flex;
  flex-direction: column;
  padding: 21px;
  .top {
    p {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(126, 139, 154, 1);
      line-height: 22px;
      margin-top: 10px;
    }
    h1 {
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      display: inline-block;
    }
    h2 {
      display: inline-block;
      font-size: 14px;
    }
  }
  .content {
    margin-top: 30px;
    height: 100%;
    .detail {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      p {
        color: #000000;
      }
      .left {
        width: 270px;
        background: rgba(251, 251, 252, 1);
        box-shadow: 0px 3px 16px 0px rgba(205, 212, 225, 0.5);
        border-radius: 4px;
        overflow: hidden;
        div {
          width: 270px;
          height: 68px;
          background: rgba(255, 255, 255, 1);
          // border-radius: 0px 0px 4px 4px;
          border-bottom: 1px solid rgba(237, 237, 237, 1);
          padding-top: 19px;
          p {
            font-size: 20px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            text-align: center;
            // line-height: 28px;
            // padding-left: 21px;
            // border-left: 4px solid rgba(0, 133, 255, 1);
          }
        }
        .list {
          height: 100%;
          overflow: auto;
          li {
            width: 100%;
            height: 99px;
            background: rgba(251, 251, 252, 1);
            // box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.5);
            border-bottom: 1px solid rgba(237, 237, 237, 1);
            padding: 16px;
            cursor: pointer;
            .assName {
              font-size: 16px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 16px;
            }
            .schName {
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 20px;
              margin-top: 11px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }
          .choosed {
            background: rgba(0, 133, 255, 1);
            .schName {
              color: rgba(255, 255, 255, 1);
            }
            .assName {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
        .list::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 5px;
          height: 232px;
        }
        .list::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        .list::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          border-radius: 10px;
          // background: rgba(251, 251, 252, 0);
          // opacity: 0;
        }
      }
      .right {
        width: 871px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 16px 0px rgba(205, 212, 225, 0.5);
        border-radius: 4px;
        position: relative;
        padding-bottom: 40px;
        h2 {
          font-size: 20px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
          margin-top: 18px;
          padding-left: 21px;
          border-left: 4px solid rgba(0, 133, 255, 1);
        }
        .context {
          width: 831px;
          background: rgba(246, 248, 252, 1);
          border-radius: 4px 4px 4px 0px;
          margin-left: 20px;
          margin-top: 27px;
          padding: 20px;
          h3 {
            margin-bottom: 16px;
            font-size: 18px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 25px;
          }
          .impotent {
            margin-bottom: 20px;
            .impotentImg {
              margin: 20px 0 40px;
              img {
                display: inline-block;
                max-width: 250px;
                max-height: 250px;
              }
              img:not(:first-child) {
                margin: 20px 0 0 20px;
              }
            }
          }
          span {
            font-size: 16px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 24px;
          }
        }
        .nocontent {
          width: 200px;
          height: 200px;
          background: url(../../assets/image/null.png);
          background-size: 200px 200px;
          position: absolute;
          top: 50%;
          margin-top: -100px;
          left: 50%;
          margin-left: -100px;
          p {
            font-size: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(126, 139, 154, 1);
            line-height: 28px;
            text-align: center;
            margin-top: 230px;
          }
        }
      }
    }
  }
}
</style>
