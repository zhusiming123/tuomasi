<template>
    <div class="box_prepare_lesson">
        <div class="top">
            <h1>{{msg.name}}</h1>
            <p>
                <span>{{msg.start}} 至 {{msg.end}}</span>
                <span style="color:#F0F0F0;margin:0 10px;">|</span>
                <span>共<span style="color:#f39926"> {{msg.num}} </span>讲</span>
            </p>
        </div>
        <div class="content">
            <div class="content_right" style="min-height:725px;">
                <p class="bg"></p>
                <div>
                    <div class="content_right_top">
                        <p class="allpeople">课节详情</p>
                    </div>
                </div>
                <div class="content_list_box" v-for="(item,index) in list" :key="index">
                    <div class="list">
                        <p class="list_title"><span></span>第{{item.number}}讲：{{item.name}}</p>
                        <div class="list_time">
                            <span>{{item.state==1?item.realStartTime.split(' ')[0]:item.startTime.split(' ')[0]}}  {{item.state==1?item.realStartTime.split(' ')[1]:item.startTime.split(' ')[1]}}-{{item.state==1?item.realEndTime.split(' ')[1]:item.endTime.split(' ')[1]}}</span>
                        </div>
                    </div>
                    <div>
                        <div class="detail" @click="prepareTo(item.name,item.startTime,item.endTime,item.id)">备课</div>
                        <div class="discuss_detail" v-if="item.grindState == 1" @click="discussStatusTo(item.name,item.startTime,item.endTime,item.id,item.number,item.grindVideoId)">磨课详情</div>
                        <div class="discuss" v-else @click="discussTo(item.name,item.startTime,item.endTime,item.id,item.number,item.grindVideoId)">磨课</div>
                    </div>
                </div>
                <div class="box_center_page" v-show="totalPage>1">
                    <Page :current='pageNum' :total="lessonNumber" :page-size='5' @on-change='checkPage' show-elevator></Page>
                </div>
            </div>
            <div class="content_right content_right_box" style="width:270px;min-height:725px;padding-right:0;">
                <p class="bg"></p>
                <div>
                    <div class="content_right_top">
                        <p class="allpeople">课程资料</p>
                    </div>
                </div>
                <div class='default' v-show="defaultType">
                    <img src="./../../assets/image/no_document.png" alt="缺省图"/>
                    <span>暂无课程资料～</span>
                </div>
                <div class="content_list content_list_document" :style="item.state?'':''" v-for="(item,index) in dowloadList" :key="index">
                    <p>
                        <img src="@/assets/image/document.png" alt="" class="document"/>
                        <span>{{item.name}}</span>
                    </p>
                    <div class="hover" @click="checkToast(index)">
                        <span></span>
                        <li>
                            <b></b>
                            <p><a class="dowload" @click="showtoast(index)" :href='origin+"/jiaowu/admin/brace/v1/outlinesub/unauth/download?url="+encodeURIComponent(item.url)+"&name="+item.name' download>下载</a></p>
                            <p><a class="dowload1" @click="showtoast(index)" :href="item.url" target="_blank">打印</a></p>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getCourseListTwo, getOutLine } from "@/api/index.js";
import {origin,codeImage } from "@/api/axios.js";
export default {
  data() {
    return {
      msg: {},
      list: [],
      dowloadList: [],
      totalPage: "",
      pageNum: 1,
      lessonNumber: 0,
      codeImage: codeImage,
      defaultType: false,
      origin:origin
    };
  },
  created() {
    this.$set(this, "msg", this.$route.query);
    this.getList(1);
  },
  methods: {
    checkToast(index) {
      if (this.dowloadList[index].state) {
        this.dowloadList[index].state = false;
      } else {
        this.dowloadList.forEach(item => {
          item.state = false;
        });
        this.dowloadList[index].state = true;
      }
      this.$set(this, "dowloadList", this.dowloadList);
    },
    showtoast(index) {
      this.$set(this, "dowloadList", this.dowloadList);
    },
    prepareTo(name, start, end, id) {
      window.sessionStorage.setItem("courseName", this.msg.name);
      window.sessionStorage.setItem("startTime", start);
      window.sessionStorage.setItem("endTime", end);
      window.sessionStorage.setItem("lessonId", id);
      window.sessionStorage.setItem("lessonName", name);
      let routeData = this.$router.resolve({ path: "/Topic/tabIndex" });
      window.open(routeData.href, "_blank");
    },
    discussStatusTo(name, start, end, id, number, vid) {
      var obj = {
        name: this.msg.name,
        start: start,
        end: end,
        lessonId: id,
        lessonname: name,
        number: number,
        vid: vid
      };
      window.localStorage.setItem("statusObj", JSON.stringify(obj));
      this.$router.push({
        path: "/discussStatus"
      });
    },
    discussTo(name, start, end, id, number,vid) {
      this.$router.push({
        path: "/noDiscuss",
        query: {
          name: this.msg.name,
          start: start,
          end: end,
          lessonId: id,
          lessonname: name,
          number: number,
          vid: vid
        }
      });
    },
    getList(num) {
      getCourseListTwo({ courseId: this.msg.id, pageSize: 5, pageNum: num })
        .then(res => {
          if (res.data.errno == 200) {
            this.$set(this, "list", res.data.data.lessonList);
            this.$set(this, "totalPage", res.data.data.totalPage);
            this.$set(this, "lessonNumber", res.data.data.total);
            this.$set(this, "pageNum", 1);
            getOutLine(this.msg.oId)
              .then(res => {
                if (res.data.data.length != 0) {
                  this.$set(this, "defaultType", false);
                  res.data.data.forEach(item => {
                    item.state = false;
                  });
                  this.$set(this, "dowloadList", res.data.data);
                } else {
                  this.$set(this, "defaultType", true);
                }
              })
              .catch();
          }
        })
        .catch();
    },
    checkPage(res) {
      this.getList(res);
    }
  }
};
</script>
<style lang="scss" scoped>
.box_prepare_lesson {
  display: flex;
  flex-direction: column;
  padding: 21px;
  .default {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    img {
      width: 110px;
      height: 110px;
      margin-top: 128px;
    }
    span {
      margin-top: 20px;
      font-size: 20px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(126, 139, 154, 1);
    }
  }
  h1 {
    font-size: 24px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
  p {
    margin-top: 10px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(126, 139, 154, 1);
  }
  .box_center_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 27px 0;
  }
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
    .content_right {
      width: 870px;
      background: #fff;
      position: relative;
      padding: 20px;
      box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
      border-radius: 4px;
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
        margin-left: 20px;
        .allpeople {
          font-size: 18px;
          font-family: PingFangSC-Regular;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          margin-bottom: 16px;
          font-weight: bold;
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
      .content_list:hover li {
        display: bolck;
      }
      .content_list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;

        div {
          position: relative;
          cursor: pointer;
          span {
            display: inline-block;
            background: url("./../../assets/image/three.png") no-repeat;
            width: 40px;
            height: 16px;
            background-position: center center;
          }
          .span_check {
            display: inline-block;
            background: url("./../../assets/image/three_hover.png") no-repeat;
            width: 40px;
            height: 16px;
            background-position: center center;
          }
          span:hover {
            display: inline-block;
            background: url("./../../assets/image/three_hover.png") no-repeat;
            width: 40px;
            height: 16px;
            background-position: center center;
          }
          li {
            position: absolute;
            top: 20px;
            right: 6px;
            width: 82px;
            height: 86px;
            background: #fff;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            padding: 2px 0;
            cursor: pointer;
            box-shadow: 0px 3px 16px 0px rgba(205, 212, 225, 0.5);
            border-radius: 2px;
            display: none;
            b {
              width: 15px;
              height: 11px;
              background: url("./../../assets/image/point.png") no-repeat;
              position: absolute;
              top: -11px;
              right: 6px;
            }
            a {
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #7e8b9a;
            }
            p {
              width: 100%;
            }
            p:hover {
              width: 100%;
              background: #f3f8ff;
            }
            .c_checked {
              width: 100%;
              background: #f3f8ff;
            }
            .dowload {
              width: 100%;
              height: 41px;
              cursor: pointer;
              line-height: 41px;
              padding-left: 38px;
              background: url("./../../assets/image/dowload.png") no-repeat;
              background-size: 14px 14px;
              background-position: 14px center;
            }
            .dowload_checked {
              background: url("./../../assets/image/dowload_check.png")
                no-repeat;
              background-size: 14px 14px;
              background-position: 14px center;
              color: #f39926;
            }
            .dowload:hover {
              background: url("./../../assets/image/dowload_check.png")
                no-repeat;
              background-size: 14px 14px;
              background-position: 14px center;
              color: #f39926;
            }
            .dowload1 {
              width: 100%;
              height: 41px;
              cursor: pointer;
              background: url("./../../assets/image/dowload1.png") no-repeat;
              background-size: 14px 14px;
              background-position: 14px center;
              line-height: 41px;
              padding-left: 38px;
            }
            .dowload1:hover {
              background: url("./../../assets/image/dowload1_check.png")
                no-repeat;
              background-size: 14px 14px;
              background-position: 14px center;
              color: #f39926;
            }
          }
          .checked {
            display: none;
          }
        }
        .hover:hover li {
          display: block;
        }
        .hover:hover span {
          display: inline-block;
          background: url("./../../assets/image/three_hover.png") no-repeat;
          width: 40px;
          height: 16px;
          background-position: center center;
        }
        p {
          margin-top: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          span {
            width: 176px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
          }
          .document {
            margin-right: 9px;
          }
        }
      }
      .content_list_box:hover {
        border-left: 3px solid #f39926;
        box-sizing: border-box;
      }
      .content_list_box {
        padding: 20px 20px 20px 0;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        box-shadow: 0px 3px 16px 0px rgba(205, 212, 225, 0.5);
        border-radius: 4px 4px 4px 0px;
        border-left: 3px solid #fff;
        .detail,
        .discuss,
        .discuss_detail {
          float: right;
          margin-left: 20px;
          width: 98px;
          height: 36px;
          text-align: center;
          line-height: 36px;
          background: #f39926;
          box-shadow: 0px 2px 4px 0px rgba(164, 196, 236, 1);
          border-radius: 18px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
        .detail:hover {
          background: #006acc;
        }
        .discuss:hover {
          background: #006acc;
        }
        .discuss_detail {
          border: 2px solid rgba(0, 133, 255, 1);
          box-shadow: none;
          background: #ffffff;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color:rgba(0, 133, 255, 1);
          line-height: 32px;
        }
        .discuss_detail:hover {
          color:rgba(0,106,204,1);
          border:2px solid rgba(0,106,204,1);
        }
      }

      .list {
        .list_title {
          font-size: 18px;
          font-family: PingFangSC-Medium;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 16px;
          padding: 0 23px;
          position: relative;
        }
        .list_time {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          color: rgba(126, 139, 154, 1);
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 23px;
        }
      }
    }
    .content_list_document {
      background: #fff;
      cursor: pointer;
    }
    .content_list_document:hover {
      background: #f3f8ff;
    }
    .content_right_box {
      padding: 20px 0;
    }
    .right {
      padding: 18px 0;
    }
  }
}
</style>
