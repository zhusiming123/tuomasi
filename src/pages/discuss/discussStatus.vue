<template>
    <div class="box">
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
            <div class="video">
                <div class="left">
                    <div class="noVideo" v-if="video">
                      <div>
                        <img src="@/assets/image/video.png" alt="">
                        <p>未磨课，暂无视频～</p>
                      </div>
                    </div>
                    <div v-else id="player"></div>
                </div>
                <div class="right">
                    <p>视频资料</p>
                    <div class="novideo" v-if="video">
                      <img src="@/assets/image/videoDefault.png" alt="">
                      <h3>暂无视频～</h3>
                    </div>
                    <ul class="list" v-else>
                        <li class="playing">
                          <div class="play">
                            <img src="@/assets/image/play.png" alt="">
                          </div>
                          <div class="name">1.磨课视频</div>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="assitentTitle">辅导老师</p>
            <ul class="assList">
                <p>已完成磨课任务( <span>{{alerdyPeople}}</span> 人)</p>
                <li v-for="(item,index) in assistantsList" v-if="item.grindState==1" :key="index" @click="toDetail(item.assistant.id)">
                    <p class="assName">{{item.assistant.name}}</p>
                    <p class="schName" :title="item.school.schoolName">{{item.school.schoolName}}</p>
                </li>
            </ul>
            <ul class="subassList">
                <p>未完成磨课任务( <span>{{doingPeople}}</span> 人)</p>
                <li v-for="(item,index) in assistantsList" v-if="item.grindState==0" :key="index" @click="toDetail(item.assistant.id)">
                    <p class="assName">{{item.assistant.name}}</p>
                    <p class="schName" :title="item.school.schoolName">{{item.school.schoolName}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { teacherList, videoToken } from "@/api/index.js";
export default {
  data() {
    return {
      msg: null,
      assistantsList: [],
      video: true,
      choosed: 0,
      videoUrl: "",
      player: null,
      alerdyPeople: 0,
      doingPeople: 0,
      timeFormat: "",
      token: ""
    };
  },
  created() {
    this.msg = JSON.parse(window.localStorage.getItem("statusObj"));
    this.timeFormat = this.msg.start + "-" + this.msg.end.split(" ")[1];
  },
  mounted() {
    this.getTeacherList();

    if (this.msg.vid != undefined) {
      this.video = false;
      this.getVideoToken();
    }
  },
  methods: {
    getVideoToken() {
      videoToken({ vid: this.msg.vid })
        .then(res => {
          if (res.data.errno == 200) {
            this.token = res.data.data;

            this.player = polyvPlayer({
              wrap: "#player",
              width: 870,
              height: 490,
              vid: this.msg.vid,
              hideSwitchPlayer: true,
              volume: 0.3,
              showHd: false,
              ban_history_time: "on",
              playsafe: this.token
            });
          }
        })
        .catch();
    },
    getTeacherList() {
      teacherList({ lessonId: this.msg.lessonId })
        .then(res => {
          if (res.data.errno == 200) {
            this.assistantsList = res.data.data.assistants;
            for (var i = 0; i < this.assistantsList.length; i++) {
              if (this.assistantsList[i].grindState == "1") {
                this.alerdyPeople++;
              } else {
                this.doingPeople++;
              }
            }
          }
        })
        .catch();
    },
    toDetail(userId) {
      window.localStorage.setItem("discussObj", JSON.stringify(this.msg));
      window.localStorage.setItem("peopleId", userId);
      let routeData = this.$router.resolve({
        path: "/discussDetail"
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
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
    position: relative;
    p {
      color: #000000;
    }

    .video {
      width: 100%;
      height: 490px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 870px;
        .noVideo {
          width: 100%;
          height: 100%;
          background: rgba(51, 51, 51, 1);
          box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
          border-radius: 4px 4px 4px 0px;
          position: relative;
          div {
            width: 200px;
            height: 200px;
            position: absolute;
            top: 120px;
            left: 50%;
            margin-left: -100px;
            p {
              font-size: 20px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 28px;
              text-align: center;
              margin-top: 30px;
            }
          }
        }
        #player {
          width: 100%;
          height: 100%;
        }
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .right {
        width: 270px;
        height: 490px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
        border-radius: 4px 4px 4px 0px;
        overflow: hidden;
        p {
          font-size: 20px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
          margin-top: 18px;
          padding-left: 21px;
          border-left: 4px solid rgba(0, 133, 255, 1);
        }
        .list {
          height: 410px;
          overflow: auto;
          margin-top: 30px;
          .playing {
            background: rgba(243, 248, 255, 1);
            color: rgba(0, 133, 255, 1);
          }
          // li:hover {
          //   background: rgba(243, 248, 255, 1);
          // }
          li {
            width: 100%;
            height: 40px;
            cursor: pointer;
            .play {
              width: 8px;
              height: 8px;
              margin: 11px 5px 16px 10px;
              float: left;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .name {
              width: 226px;
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // white-space: nowrap;
              color: rgba(0, 133, 255, 1);
              line-height: 40px;
              float: left;
              padding-right: 10px;
            }
          }
        }
        // .list::-webkit-scrollbar {
        //   /*滚动条整体样式*/
        //   width: 5px;
        //   height: 232px;
        // }
        // .list::-webkit-scrollbar-thumb {
        //   /*滚动条里面小方块*/
        //   background: rgba(216, 216, 216, 1);
        //   border-radius: 3px;
        // }
        // .list::-webkit-scrollbar-track {
        //   /*滚动条里面轨道*/
        //   border-radius: 10px;
        //   background: rgba(251, 251, 252, 1);
        // }
        .novideo {
          text-align: center;
          padding: 108px 0;
          img {
            display: inline-block;
            width: 110px;
            height: 110px;
          }
          h3 {
            font-size: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(126, 139, 154, 1);
            margin-top: 20px;
          }
        }
      }
    }
    .assitentTitle {
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      margin-top: 30px;
    }
    .assList {
      overflow: hidden;
      margin-left: -20px;
      padding-bottom: 5px;
      & > p {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(126, 139, 154, 1);
        line-height: 16px;
        margin-top: 21px;
        padding-left: 20px;
        span {
          color: #f39926;
        }
      }
      li {
        width: 215px;
        height: 99px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.5);
        border-radius: 4px 4px 4px 0px;
        border: 1px solid rgba(237, 237, 237, 1);
        float: left;
        margin: 20px 0 0 20px;
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
      li:hover {
        box-shadow: 0px 3px 16px 0px rgba(205, 212, 225, 0.5);
        border: 1px solid rgba(0, 133, 255, 1);
      }
      li:hover .schName {
        color: rgba(0, 133, 255, 1);
      }
      li:hover .assName {
        color: rgba(0, 133, 255, 1);
      }
    }
    .subassList {
      overflow: hidden;
      margin-left: -20px;
      padding-bottom: 5px;
      & > p {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(126, 139, 154, 1);
        line-height: 16px;
        margin-top: 21px;
        padding-left: 20px;
        span {
          color: #f39926;
        }
      }
      li {
        width: 215px;
        height: 99px;
        background: #fbfbfc;
        border-radius: 4px 4px 4px 0px;
        border: 1px solid rgba(237, 237, 237, 1);
        float: left;
        margin: 20px 0 0 20px;
        padding: 16px;
        cursor: pointer;
        .assName {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
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
      li:hover {
        box-shadow: 0px 3px 16px 0px rgba(205, 212, 225, 0.5);
        border: 1px solid rgba(0, 133, 255, 1);
      }
      li:hover .schName {
        color: rgba(0, 133, 255, 1);
      }
      li:hover .assName {
        color: rgba(0, 133, 255, 1);
      }
    }
  }
}
</style>
