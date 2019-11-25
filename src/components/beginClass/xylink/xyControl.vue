<template>
  <div class="xyControl">
    <confirmModel ref="confirmModel"
                  @callback="endMeet" />
    <randomModel ref="randomModel"
                 @callback="callback" />
    <inviteModel ref="invite"
                 @callback="invitePer" />
    <div class="xyControl_header"
         @click="back">
      <span class="xyControl_header_img" />
      <span>返回</span>
    </div>
    <div class="xyControl_content">
      <div class="xyControl_content_top">
        <span>参与者</span>
        <div class="xyControl_content_top_control">
          <span class="xyControl_content_top_control_phone"
                @click="invite">邀请通话</span>
          <span class="xyControl_content_top_control_quiet"
                @click="keepQuite">全体静音</span>
          <span class="xyControl_column" />
          <span class="xyControl_content_top_control_more">
            <div class="xyControl_content_top_control_more_moreBox">
              <p class="xyControl_content_top_control_more_moreBox_top" />
              <span @click="startRecord">{{ recordType?'结束录制':'开始录制' }}</span>
              <span @click="endMeeting">结束会议</span>
            </div>
          </span>
        </div>
      </div>
      <div class="xyControl_content_middle">
        <div class="xyControl_content_middle_tab">
          <span :class="tabNum==1?'xyControl_content_middle_tab_checked':''"
                @click="checkTab(1)">已入会（{{ cloudList.length }}）</span>
          <span :class="tabNum==2?'xyControl_content_middle_tab_checked':''"
                @click="checkTab(2)">未静音（{{ cloudListNo.length }}）</span>
        </div>
        <div class="xyControl_content_middle_control">
          <div class="xyControl_content_middle_control_video">
            <span>{{ recordType?'视频录制中...':'该课程还未开始录制，点击右侧开始录制按钮即可录制视频。' }}</span>
            <span :class="recordType?'xyControl_content_middle_control_video_begining':'xyControl_content_middle_control_video_begin'"
                  @click="startRecord">{{ recordType?'结束录制':'开始录制' }}</span>
          </div>
          <div class="xyControl_content_middle_control_main"
               v-if="mainTerminal">
            <div class="xyControl_content_middle_control_main_box">
              <!-- <img src="@/assets/xylink/kaimai.png" alt="" srcset=""/> -->
              <span class="xyControl_content_middle_control_main_box_img_1"
                    v-show="mainTerminal.muteStatus==0"
                    @click="mute(1,mainTerminal.device.type,mainTerminal.device.id)" />
              <span class="xyControl_content_middle_control_main_box_img_2"
                    v-show="mainTerminal.muteStatus==1"
                    @click="mute(0,mainTerminal.device.type,mainTerminal.device.id)" />
              <p>
                <span class="xyControl_content_middle_control_main_box_top">主会场</span>
                <span style="width:638px">{{ mainTerminal.name }}</span>
              </p>
            </div>
            <span class="xyControl_content_middle_control_main_more">更多
              <span class="xyControl_content_middle_control_main_more_down" />
              <div class="xyControl_content_middle_control_main_more_moreBox">
                <p class="xyControl_content_middle_control_main_more_moreBox_top" />
                <span @click="mainImage(0)">取消主会场</span>
                <!-- <span>设置轮询</span> -->
                <span @click="disconnect(mainTerminal.device.id,mainTerminal.device.type)">挂断</span>
              </div>
            </span>
          </div>
          <!-- <span
            class="xyControl_content_middle_control_btn"
            @click="unmute"
          >随机开麦</span> -->
          <div class="xyControl_content_middle_control_classList">
            <div class="xyControl_content_middle_control_classList_box"
                 :style="(index+1)%3==0?'margin-right:0':''"
                 v-for="(item,index) in tabNum==1?cloudList:cloudListNo"
                 :key="index">
              <span class="xyControl_content_middle_control_classList_box_img_1"
                    v-show="item.muteStatus==0"
                    @click="micClick(1,item.device.type,item.device.id)" />
              <span class="xyControl_content_middle_control_classList_box_img_2"
                    v-show="item.muteStatus==1"
                    @click="micClick(0,item.device.type,item.device.id,item)" />
              <span class="xyControl_content_middle_control_classList_box_name">{{ item.name }}</span>
              <p class="xyControl_content_middle_control_classList_box_bottom">
                <span class="xyControl_content_middle_control_classList_box_bottom_num">开麦次数
                  <span class="xyControl_content_middle_control_classList_box_bottom_number">{{ item.unmuteCount }}</span>
                </span>
                <span class="xyControl_content_middle_control_classList_box_more">
                  <div class="xyControl_content_middle_control_classList_box_more_moreBox">
                    <p class="xyControl_content_middle_control_classList_box_more_moreBox_top" />
                    <span @click="mainImage(1,item.device.id,item.device.type)">设置主会场</span>
                    <span @click="disconnect(item.device.id,item.device.type)">挂断</span>
                  </div>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask"
         v-show="maskFlag" />
    <div class="micMoudle"
         v-show="micFlag">
      <img @click="close()"
           src="./../../../assets/image/close.png">
      <h2>选择开麦模式</h2>
      <div>
        <div>
          <h3 @click="unmute()"
              @mouseenter="ranHover=true"
              @mouseleave="ranHover=false">
            <img v-show="!ranHover"
                 src="./../../../assets/xylink/random.png">
            <img v-show="ranHover"
                 src="./../../../assets/xylink/random-hover.png">
          </h3>
          <p>随机开麦</p>
        </div>
        <div>
          <h3 @click="mute(0,operateType,operateId)"
              @mouseenter="aimHover=true"
              @mouseleave="aimHover=false">
            <img v-show="!aimHover"
                 src="./../../../assets/xylink/aim.png">
            <img v-show="aimHover"
                 src="./../../../assets/xylink/aim-hover.png">
          </h3>
          <p>直接开麦</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { xylinkMeeting, keepQuite, mute, unmute, mainImage, disconnect, endMeeting, invitation, startRecording, endRecording, sham } from "@/api/xylink.js";
import randomModel from "@/components/model/random_model.vue";
import inviteModel from "@/components/model/invite_model.vue";
import confirmModel from "@/components/model/confirm_model.vue";
export default {
  data () {
    return {
      cloudList: [],
      cloudListNo: [],
      mainTerminal: null,
      tabNum: 1,
      timer: null,
      params: null,
      recordTime: 0,
      recordType: false,
      micFlag: false,
      maskFlag: false,//蒙层
      // 随机开麦参数
      operateId: 0,
      operateType: 0,
      termObj: {},
      ranHover: false,
      aimHover: false
    };
  },
  components: { randomModel, inviteModel, confirmModel },
  created () {
    this.params = { "meetingNumber": window.localStorage.getItem("meetingNumber") };
    this.xylinkMeeting();
    this.timer = setInterval(() => {
      this.xylinkMeeting();
    }, 2000);
  },
  beforeDestroy () {
    clearInterval(this.timer);
  },
  mounted () {

  },
  methods: {
    checkTab: function (num) {
      this.tabNum = num;
      this.xylinkMeeting();
    },
    //录制视频
    startRecord: function () {
      if (this.recordType) {
        endRecording(this.params).then(res => {
          if (res.data.errno == 200) {
            this.recordType = false;
          }
        });
      } else {
        startRecording(this.params).then(res => {
          if (res.data.errno == 200) {
            this.recordType = true;
          }
        });
      }

    },
    //结束会议
    endMeeting: function () {
      this.$refs.confirmModel.load("确认退出本次本次主持会议？", "取 消", "退 出");
      this.$refs.confirmModel.show();
    },
    //结束会议接口
    endMeet: function () {
      endMeeting(this.params).then(res => {
        if (res.data.errno == 200) {
          this.$router.replace({ "path": "/openbox/classTab/xylink" });
        }
      });
    },
    //设置主会场
    mainImage: function (num, id, type) {
      let json;
      if (num) {
        json = {
          "meetingNumber": window.localStorage.getItem("meetingNumber"),//云会议室号
          "deviceDto":
          {
            "id": id,//设备id
            "type": type//设备type
          }
        };
      } else {
        json = {
          "meetingNumber": window.localStorage.getItem("meetingNumber"),//云会议室号
          "deviceDto": null
        };
      }

      mainImage(json).then(res => {
        if (res.data.errno == 200) {
          this.xylinkMeeting();
        }
      });
    },
    //邀请入会
    invite: function () {
      this.$refs.invite.show();
    },
    //邀请入会接口调用
    invitePer: function (num) {
      let json = {
        "callNumber": window.localStorage.getItem("meetingNumber"),//云会议室号
        "deviceList": [
          {
            "number": num.num//被邀请的设备号
          }
        ]
      };
      invitation(json).then(res => {
        if (res.data.errno == 200) {
          this.$refs.invite.cancel();
        } else {
          this.$refs.invite.showErr(JSON.parse(res.data.data).errorCode);
        }
      });
    },
    //挂断踢人
    disconnect: function (id, type) {
      let json = {
        "meetingNumber": window.localStorage.getItem("meetingNumber"),//云会议室号
        "deviceDtos": [
          {
            "id": id,//设备id
            "type": type //设备type
          }
        ],
      };
      disconnect(json).then(res => {
        if (res.data.errno == 200) {
          this.xylinkMeeting();
        }
      });
    },
    //随机开麦
    // unmute: function () {
    //   unmute({ "meetingNumber": window.localStorage.getItem("meetingNumber"), "courseId": window.localStorage.getItem("courseId"), "lessonId": window.localStorage.getItem("lessonId") }).then(res => {
    //     if (res.data.errno == 200) {
    //       this.$refs.randomModel.showModel(res.data.data, this.cloudList);
    //     }
    //   });
    // },
    // 随机开麦（黑箱操作版）
    unmute () {
      this.micFlag = false;
      sham({
        "meetingNumber": window.localStorage.getItem("meetingNumber"),
        "courseId": window.localStorage.getItem("courseId"),
        "lessonId": window.localStorage.getItem("lessonId"),
        "terminalDto": this.termObj
      }).then(res => {
        console.log(res);
        console.log(this.cloudList);
        if (res.data.errno == 200) {
          this.$refs.randomModel.showModel(this.termObj, this.cloudList);
        }
      });
    },
    //随机开麦callback函数
    callback: function (data) {
      this.mute(0, data.terminalDto.type, data.terminalDto.id);
    },
    // 关闭弹窗
    close () {
      this.maskFlag = false;
      this.micFlag = false;
    },
    micClick (num, type, id, value) {
      // console.log(num, type, id, value);
      if (num == 1) {
        this.maskFlag = true;
        this.mute(num, type, id);
      } else {
        this.maskFlag = true;
        this.micFlag = true;
        this.operateId = id;
        this.operateType = type;
        // 随机开麦的参数对象
        Object.assign(this.termObj, {
          "name": value.name,
          "muteStatus": value.muteStatus,
          "terminalDto": {
            "id": value.device.id,
            "type": value.device.type,
            "participantId": value.device.participantId,
            "externalUserId": value.device.externalUserId,
            "participantNumber": value.device.participantNumber
          }
        });
        // console.log(value);
        console.log(this.termObj);
      }
    },
    //开麦闭麦
    mute (num, type, id) {
      this.micFlag = false;
      this.maskFlag = false;
      let json = {
        "meetingNumber": window.localStorage.getItem("meetingNumber"),//云会议室号
        "deviceDtos": [
          {
            "id": id,//设备id
            "type": type //设备type
          }
        ],
        "muteState": num, //0:开麦操作 1:闭麦操作
        "courseId": window.localStorage.getItem("courseId")
      };
      mute(json).then(res => {
        // console.log(res);
        this.$store.state.maskFlag = false;
        this.micFlag = false;
        if (res.data.errno == 200) {
          this.xylinkMeeting();
        }
      });
    },
    //返回
    back: function () {
      this.$router.replace({ "path": "/openbox/classTab/xylink" });
    },
    //小鱼会议列表
    xylinkMeeting: function () {
      xylinkMeeting({ "meetingNumber": window.localStorage.getItem("meetingNumber"), "courseId": window.localStorage.getItem("courseId") }).then(res => {
        if (res.data.errno == 200) {
          this.cloudList = res.data.data.deviceStatusList;
          this.mainTerminal = res.data.data.mainTerminal;
          if (res.data.data.recordingDevice != null) {
            this.recordType = true;
          } else {
            this.recordType = false;
          }
          let arr = [];
          res.data.data.deviceStatusList.forEach(item => {
            if (item.muteStatus == 0) {
              arr.push(item);
            }
          });
          this.cloudListNo = arr;
        }
      });
    },
    //全体静音
    keepQuite () {
      keepQuite(this.params).then(res => {
        if (res.data.errno == 200) {
          this.xylinkMeeting();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.xyControl {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 20;
  }
  .micMoudle {
    width: 500px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 13px 35px 0px rgba(143, 143, 143, 0.5);
    border-radius: 16px;
    z-index: 21;
    position: fixed;
    top: 230px;
    left: 50%;
    margin-left: -250px;
    padding: 40px;
    text-align: center;

    > img {
      width: 16px;
      height: 16px;
      position: absolute;
      right: 16px;
      top: 16px;
    }
    h2 {
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-top: 26px;
      margin-bottom: 30px;
    }
    div {
      display: flex;
      justify-content: space-between;
      div {
        width: 200px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        h3 {
          background: rgba(238, 247, 255, 1);
          border-radius: 5px;
          padding: 24px 60px;
          img {
            width: 80px;
						height: 80px;
						border-radius: 40px;
						background:rgba(0,133,255,1);
						box-shadow:0px 6px 10px 0px rgba(0,133,255,0.3);
          }
        }
        p {
          font-size: 18px;
          font-family: PingFangSC-Medium;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          letter-spacing: 1px;
          margin-top: 18px;
        }
      }
    }
  }
  &_column {
    display: inline-block;
    width: 2px;
    height: 24px;
    background: #bdbdbd;
  }
  &_header {
    width: 80px;
    cursor: pointer;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    display: flex;
    flex-direction: row;
    align-items: center;
    &_img {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url("./../../../assets/xylink/point.png") no-repeat;
      margin-right: 8px;
    }
    span {
      cursor: pointer;
    }
  }
  &_header:hover {
    .xyControl_header_img {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url("./../../../assets/xylink/point-hover.png") no-repeat;
      margin-right: 8px;
    }
    span {
      color: #f39926;
    }
  }
  &_content {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    display: inline-block;
    background: rgba(246, 248, 252, 1);
    padding: 20px;
    &_top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      &_control {
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(126, 139, 154, 1);
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        span {
          margin-left: 20px;
          cursor: pointer;
        }

        &_phone {
          display: inline-block;
          padding-left: 30px;
          background: url("./../../../assets/xylink/phone.png") no-repeat;
          background-size: 24px 24px;
          background-position: left center;
        }
        &_phone:hover {
          display: inline-block;
          padding-left: 30px;
          color: #f39926;
          background: url("./../../../assets/xylink/phone-hover.png") no-repeat;
          background-size: 24px 24px;
          background-position: left center;
        }
        &_quiet {
          display: inline-block;
          padding-left: 30px;
          background: url("./../../../assets/xylink/quiet.png") no-repeat;
          background-size: 22px 24px;
          background-position: left center;
        }
        &_quiet:hover {
          display: inline-block;
          padding-left: 30px;
          color: #f39926;
          background: url("./../../../assets/xylink/quiet-hover.png") no-repeat;
          background-size: 22px 24px;
          background-position: left center;
        }
        &_more {
          width: 28px;
          height: 28px;
          display: inline-block;
          background: url("./../../../assets/xylink/more.png") no-repeat;
          background-size: 28px 28px;
          background-position: left center;
          &_moreBox {
            position: absolute;
            height: 0;
            transition: height 0.2s ease;
            right: 0;
            top: 30px;
            display: flex;
            flex-direction: column;
            background: #fff;
            width: 89px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(126, 139, 154, 1);
            box-sizing: border-box;
            box-shadow: 0px 3px 16px 0px rgba(205, 212, 225, 0.5);
            border-radius: 2px;
            display: none;
            span {
              margin-left: 0;
              padding: 10px 15px 10px 15px;
            }
            &_top {
              background: #006acc;
              display: inline-block;
              position: absolute;
              top: -11px;
              right: 7px;
              width: 15px;
              height: 11px;
              background: url("./../../../assets/image/point.png") no-repeat;
              background-size: 15px 11px;
              padding: 0;
            }
            &_checked {
              color: #f39926;
              background: rgba(243, 248, 255, 1);
            }
            span:hover {
              color: #f39926;
              background: rgba(243, 248, 255, 1);
            }
          }
        }
        &_more:hover {
          width: 28px;
          height: 28px;
          color: #f39926;
          display: inline-block;
          background: url("./../../../assets/xylink/more-hover.png") no-repeat;
          background-size: 28px 28px;
          background-position: left center;
          .xyControl_content_top_control_more_moreBox {
            padding: 1px 0;
            height: 84px;
            display: flex;
          }
        }
      }
    }
    &_middle {
      margin-top: 28px;
      &_tab {
        width: 100%;
        display: block;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(126, 139, 154, 1);
        border-bottom: 1px solid #bdbdbd;
        span {
          display: inline-block;
          cursor: pointer;
          padding: 0 20px 10px 20px;
          margin-bottom: -1px;
        }
        &_checked {
          border-bottom: 3px solid #f39926;
          color: rgba(0, 133, 255, 1);
        }
      }
      &_control {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        &_video {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          padding: 10px 20px;
          background: #fff;
          box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
          border-radius: 2px;
          font-size: 20px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(126, 139, 154, 1);
          &_begin {
            cursor: pointer;
            width: 152px;
            height: 46px;
            border: 2px solid rgba(51, 51, 51, 1);
            border-radius: 50px;
            line-height: 42px;
            font-size: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            padding-left: 50px;
            background: url("./../../../assets/xylink/begin.png") no-repeat;
            background-position: 17px center;
          }
          &_begining {
            cursor: pointer;
            width: 152px;
            height: 46px;
            border: 2px solid #ff5921;
            border-radius: 50px;
            line-height: 42px;
            font-size: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #ff5921;
            padding-left: 50px;
            background: url("./../../../assets/xylink/stop.png") no-repeat;
            background-position: 17px center;
          }
          // &_begin:hover{
          //     // color: #006ACC;
          //     background: url('./../../../assets/xylink/begin-hover.png') no-repeat;
          //     background-position:17px center;
          //     // border:2px solid #006ACC;
          // }
          &_begining:hover {
            color: #d65124;
            background: url("./../../../assets/xylink/stop-hover.png") no-repeat;
            background-position: 17px center;
            border: 2px solid #d65124;
          }
        }
        &_main {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 20px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
          border-radius: 2px;
          align-items: center;
          padding: 16px 20px 6px 11px;
          &_box_img_1 {
            cursor: pointer;
            margin-right: 12px;
            display: inline-block;
            width: 68px;
            height: 68px;
            background: url("./../../../assets/xylink/kaimai.png") no-repeat;
            background-size: 68px 68px;
          }
          &_box_img_1:hover {
            cursor: pointer;
            margin-right: 20px;
            display: inline-block;
            width: 68px;
            height: 68px;
            background: url("./../../../assets/xylink/kaimai-hover.png") no-repeat;
            background-size: 68px 68px;
          }
          &_box_img_2 {
            cursor: pointer;
            margin-right: 20px;
            display: inline-block;
            width: 68px;
            height: 68px;
            background: url("./../../../assets/xylink/bimai.png") no-repeat;
          }
          &_box_img_2:hover {
            cursor: pointer;
            margin-right: 20px;
            display: inline-block;
            width: 68px;
            height: 68px;
            background: url("./../../../assets/xylink/bimai-hover.png") no-repeat;
          }
          &_box_top {
            display: inline-block;
            width: 50px;
            height: 20px;
            background: rgba(77, 170, 255, 1);
            border-radius: 2px;
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 20px;
          }
          &_more {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 104px;
            height: 50px;
            font-size: 20px;
            padding-left: 20px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(0, 133, 255, 1);
            line-height: 50px;
            background: rgba(251, 251, 252, 1);
            cursor: pointer;
            position: relative;
            &_down {
              display: inline-block;
              width: 14px;
              height: 8px;
              background: url("./../../../assets/xylink/down-hover.png") no-repeat;
              margin-left: 8px;
            }
            &_moreBox {
              position: absolute;
              right: 0;
              top: 50px;
              height: 0;
              // overflow: hidden;
              transition: height 0.2s ease;
              display: flex;
              flex-direction: column;
              background: #fff;
              width: 104px;
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(126, 139, 154, 1);
              box-shadow: 0px 3px 16px 0px rgba(205, 212, 225, 0.5);
              border-radius: 2px;
              display: none;
              span {
                display: inline-block;
                margin-left: 0;
                padding: 10px 15px 10px 15px;
                line-height: 21px;
                text-align: center;
              }
              &_top {
                display: inline-block;
                position: absolute;
                top: -11px;
                right: 7px;
                width: 15px;
                height: 11px;
                background: url("./../../../assets/image/point.png") no-repeat;
                background-size: 15px 11px;
                padding: 0;
              }
              &_checked {
                color: #f39926;
                background: rgba(243, 248, 255, 1);
              }
              span:hover {
                color: #f39926;
                background: rgba(243, 248, 255, 1);
              }
            }
          }
          &_more:hover {
            color: #478be1;
            .xyControl_content_middle_control_main_more_down {
              background: url("./../../../assets/xylink/top-hover.png") no-repeat;
              margin-left: 8px;
            }
            .xyControl_content_middle_control_main_more_moreBox {
              height: 87px;
              padding: 1px 0;
              display: flex;
            }
          }
          &_box {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 20px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            img {
              margin-right: 20px;
            }
            p {
              display: flex;
              flex-direction: column;
            }
          }
        }
        &_btn {
          cursor: pointer;
          margin-top: 30px;
          display: inline-block;
          width: 178px;
          height: 60px;
          background: rgba(0, 133, 255, 1);
          box-shadow: 0px 2px 4px 0px rgba(164, 196, 236, 1);
          border-radius: 60px;
          font-size: 28px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 60px;
        }
        &_btn:hover {
          background: #006acc;
        }
        &_classList {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-top: 20px;
          &_box {
            margin-right: 20px;
            width: 276px;
            padding: 30px 20px 20px 20px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 6px 0px rgba(205, 212, 225, 0.2);
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 4px;
            justify-content: space-between;
            &_name {
              font-size: 20px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            &_img_1 {
              cursor: pointer;
              margin-bottom: 4px;
              display: inline-block;
              width: 98px;
              height: 98px;
              background: url("./../../../assets/xylink/kaimaida.png") no-repeat;
              background-size: 98px 98px;
            }
            &_img_1:hover {
              background: url("./../../../assets/xylink/kaimaida-hover.png") no-repeat;
            }
            &_img_2 {
              cursor: pointer;
              margin-bottom: 4px;
              display: inline-block;
              width: 98px;
              height: 98px;
              background: url("./../../../assets/xylink/bimaida.png") no-repeat;
              background-position: center 0;
            }
            &_img_2:hover {
              background: url("./../../../assets/xylink/bimaida-hover.png") no-repeat;
              background-position: center 0;
            }
            &_more {
              cursor: pointer;
              display: inline-block;
              width: 23px;
              height: 23px;
              display: inline-block;
              background: url("./../../../assets/xylink/morexiao.png") no-repeat;
              background-size: 23px 23px;
              background-position: left center;
              position: relative;
              &_moreBox {
                position: absolute;
                right: 0;
                top: 25px;
                height: 0;
                // overflow: hidden;
                transition: height 0.2s ease;
                display: flex;
                flex-direction: column;
                background: #fff;
                width: 104px;
                font-size: 14px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(126, 139, 154, 1);
                box-shadow: 0px 3px 16px 0px rgba(205, 212, 225, 0.5);
                border-radius: 2px;
                display: none;
                span {
                  margin-left: 0;
                  padding: 10px 15px 10px 15px;
                }
                &_top {
                  display: inline-block;
                  position: absolute;
                  top: -11px;
                  right: 7px;
                  width: 15px;
                  height: 11px;
                  background: url("./../../../assets/image/point.png") no-repeat;
                  background-size: 15px 11px;
                  padding: 0;
                }
                &_checked {
                  color: #f39926;
                  background: rgba(243, 248, 255, 1);
                }
                span:hover {
                  color: #f39926;
                  background: rgba(243, 248, 255, 1);
                }
              }
            }
            &_more:hover {
              width: 23px;
              height: 23px;
              color: #f39926;
              display: inline-block;
              background: url("./../../../assets/xylink/morexiao-hover.png") no-repeat;
              background-size: 23px 23px;
              background-position: left center;
              .xyControl_content_middle_control_classList_box_more_moreBox {
                padding: 1px 0;
                height: 86px;
                display: flex;
              }
            }
            .xyControl_content_middle_control_classList_box_bottom_number {
              color: #f39926;
              margin-left: 6px;
              font-weight: bold;
              font-size: 28px;
            }
            &_bottom {
              width: 100%;
              margin-top: 30px;
              font-size: 18px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              .xyControl_content_middle_control_classList_box_num {
                font-family: PingFangSC-Regular;
                color: rgba(126, 139, 154, 1);
              }
            }
          }
        }
      }
    }
  }
}
</style>