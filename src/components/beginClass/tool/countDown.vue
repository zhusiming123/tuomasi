<template>
  <div class="countDown_box">
    <span class="title">{{ type==0?"课间休息":'倒计时' }}</span>
    <div class="countDown">
      <div class="countDown_min">
        <span
          @mousedown="down($event,1)"
          @mouseup="up($event,1)"
          @mouseout="up($event)"
          @click="add(1)"
          class="countDown_min_add"
        >
          <b />
        </span>
        <input
          v-model="min_value"
          oninput="if(value>60)value=60;if(value.length>2)value=value.slice(0,2);if(value<0)value=0"
          type="number"
        >
        <span
          @mousedown="down($event,2)"
          @mouseup="up($event,2)"
          @mouseout="up($event)"
          @click="reduce(1)"
          class="countDown_min_reduce"
        >
          <b />
        </span>
      </div>
      <p class="min">
        分
      </p>
      <div class="countDown_second">
        <span
          @mousedown="down($event,1)"
          @mouseup="up($event,1)"
          @mouseout="up($event)"
          @click="add(2)"
          class="countDown_second_add"
        >
          <b />
        </span>
        <input
          v-model="second_value"
          oninput="if(value>60)value=60;if(value.length>2)value=value.slice(0,2);if(value<0)value=0"
          type="number"
        >
        <span
          @mousedown="down($event,2)"
          @mouseup="up($event,2)"
          @mouseout="up($event)"
          @click="reduce(2)"
          class="countDown_second_reduce"
        >
          <b />
        </span>
      </div>
      <p>秒</p>
    </div>
    <div class="countDown_btn">
      <p>
        <span
          class="countDown_btn_back"
          @click="back"
        >返回</span>
        <span
          class="countDown_btn_begin"
          @click="beginLoading"
        >开始计时</span>
      </p>
    </div>
  </div>
</template>
<script>
import { selectCountDown, countDown } from "@/api/xylink.js";
export default {
  data() {
    return {
      min_value: 5,
      second_value: 0,
      type:this.$route.query.type
    };
  },
  created() {
    selectCountDown({ lessonId: window.localStorage.getItem("lessonId") }).then(res => {
      if (res.data.errno == 200) {
        if (res.data.data) {
          let t =
            res.data.data.keepTime -
            parseInt((new Date().getTime() - res.data.data.timeStamp) / 1000);
          this.min_value = parseInt(t / 60);
          this.second_value = t % 60;
          this.$router.replace({
            path: "/openbox/classTab/tool/CountDownLoading",
            query: { min: this.min_value, second: this.second_value,type:this.$route.query.type  }
          });
        }
      }
    });
  },
  methods: {
    beginLoading: function() {
      if (parseInt(this.min_value * 60) + parseInt(this.second_value) >= 15) {
        countDown({
          lessonId: window.localStorage.getItem("lessonId"),
          keepTime: parseInt(this.min_value * 60) + parseInt(this.second_value),
          type:this.$route.query.type
        }).then(res => {
          if (res.data.errno == 200) {
            this.$router.replace({
              path: "/openbox/classTab/tool/CountDownLoading",
              query: { min: this.min_value, second: this.second_value,type:this.$route.query.type }
            });
          }
        });
      } else {
        this.$store.state.errorType = true;
        this.$store.state.errorTxt = "倒计时不能小于15秒";
        setTimeout(() => {
          this.$store.state.errorType = false;
          this.$store.state.errorTxt = "";
        }, 2000);
      }
    },
    back: function() {
      this.$router.replace({ path: "/openbox/classTab/tool" });
    },
    add: function(num) {
      if (num == 1) {
        if (parseInt(this.min_value) + 1 < 60) {
          this.min_value = parseInt(this.min_value) + 1;
        } else {
          this.min_value = 60;
        }
      } else {
        if (parseInt(this.second_value) + 15 < 60) {
          this.second_value = parseInt(this.second_value) + 15;
        } else {
          this.second_value = 60;
        }
      }
    },
    reduce: function(num) {
      if (num == 1) {
        if (parseInt(this.min_value) - 1 >= 0) {
          this.min_value = parseInt(this.min_value) - 1;
        } else {
          this.min_value = 0;
        }
      } else {
        if (parseInt(this.second_value) - 15 >= 0) {
          this.second_value = parseInt(this.second_value) - 15;
        } else {
          this.second_value = 0;
        }
      }
    },
    down: function(e, num) {
      if (num == 1) {
        e.currentTarget.className = e.currentTarget.className + " check";
      } else {
        e.currentTarget.className = e.currentTarget.className + " select";
      }
    },
    up: function(e) {
      e.currentTarget.className = e.currentTarget.className.split(" ")[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.countDown_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .title{
    font-size:32px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: 55px;
  }
  .countDown_btn {
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
      margin-left: 20px;
      background: #fff;
      padding: 20px 0;
      box-shadow:0px -3px 16px 0px rgba(205,212,225,0.5);
    }
    span {
      text-align: center;
      line-height: 60px;
      cursor: pointer;
    }
    .countDown_btn_back {
      display: inline-block;
      width: 149px;
      height: 60px;
      border-radius: 30px;
      border: 2px solid rgba(0, 133, 255, 1);
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 133, 255, 1);
      margin-right: 20px;
      line-height: 60px;
      box-sizing: border-box;
    }
    .countDown_btn_begin {
      display: inline-block;
      width: 178px;
      height: 60px;
      background: rgba(0, 133, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(164, 196, 236, 1);
      border-radius: 30px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .countDown_btn_begin:hover {
      background: #006acc;
    }
  }
  .countDown {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    &_min_add b {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: url("./../../../assets/image/add_1.png") no-repeat;
      background-position: center;
      box-shadow: 0px 2px 4px 0px rgba(164, 196, 236, 1);
      border-radius: 2px;
    }
    &_min_reduce b {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: url("./../../../assets/image/reduce_1.png") no-repeat;
      background-position: center;
      box-shadow: 0px 2px 4px 0px rgba(164, 196, 236, 1);
      border-radius: 2px;
    }
    &_second_add b {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: url("./../../../assets/image/add_1.png") no-repeat;
      background-position: center;
      box-shadow: 0px 2px 4px 0px rgba(164, 196, 236, 1);
      border-radius: 2px;
    }
    &_second_reduce b {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: url("./../../../assets/image/reduce_1.png") no-repeat;
      background-position: center;
      box-shadow: 0px 2px 4px 0px rgba(164, 196, 236, 1);
      border-radius: 2px;
    }
    .min {
      margin-right: 40px;
    }
    div {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
    }
    input {
      width: 95px;
      height: 140px;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 3px solid rgba(230, 230, 230, 1);
      margin: 20px 0;
      font-size: 56px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      text-align: center;
    }

    p {
      font-size: 56px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(126, 139, 154, 1);
      line-height: 64px;
    }
    span {
      display: inline-block;
      width: 95px;
      height: 48px;
      border-radius: 2px;
      text-align: center;
      cursor: pointer;
      background: #f39926;
    }
    .check {
      background: #006acc;
      b {
        background: url("./../../../assets/image/add_2.png") no-repeat;
        background-position: center;
      }
    }
    .select {
      background: #006acc;
      b {
        background: url("./../../../assets/image/reduce_2.png") no-repeat;
        background-position: center;
      }
    }
  }
}
</style>