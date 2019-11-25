<template>
    <div class="box_nodiscuss">
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
            <div class="noVideo">
              <div>
                <img src="@/assets/image/video.png" alt="">
                <p>未磨课，暂无视频~</p>
                <p @click="startDiscuss" class="startDiscuss">开始磨课</p>
              </div>
            </div>
            <p class="assitentTitle">辅导老师</p>
            <ul>
                <li v-for="(item,index) in assistantsList" :key="index">
                    <p class="assName">{{item.assistant.name}}</p>
                    <p class="schName" :title="item.school.schoolName">{{item.school.schoolName}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { teacherList, discuss } from "@/api/index.js";
export default {
  data() {
    return {
      msg: {},
      assistantsList: []
    };
  },
  created() {
    this.msg = this.$route.query;
    this.getTeacherList();
  },
  computed: {
    timeFormat: function() {
      return this.msg.start + "-" + this.msg.end.split(" ")[1];
    }
  },
  methods: {
    startDiscuss() {
      discuss({ lessonId: this.msg.lessonId })
        .then(res => {
          if (res.data.errno == 200) {
            window.localStorage.setItem("statusObj", JSON.stringify(this.msg));
            this.$router.push({
              path: "/discussStatus"
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
          }
        })
        .catch();
    }
  }
};
</script>
<style lang="scss" scoped>
.box_nodiscuss {
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
    .noVideo {
      width: 100%;
      height: 653px;
      background: rgba(51, 51, 51, 1);
      box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
      border-radius: 4px 4px 4px 0px;
      position: relative;
      div {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 212px;
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
        .startDiscuss {
          width: 105px;
          height: 36px;
          background: rgba(0, 133, 255, 1);
          box-shadow: 0px 2px 4px 0px rgba(32, 86, 135, 1);
          border-radius: 18px;
          margin-left: 44px;
          margin-top: 20px;
          cursor: pointer;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 36px;
          text-align: center;
        }
      }
    }
    .video {
      width: 100%;
      height: 500px;
      margin-top: 20px;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
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
    ul {
      overflow: hidden;
      margin-left: -20px;
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
}
</style>
