<template>
  <div class="tool_index_box">
    <p @click="countDownTo(0)">
      <span class="tool_index_box_countdown" />
      <span>课间休息</span>
    </p>
    <p @click="countDownTo(1)">
      <span class="tool_index_box_countdown" />
      <span>倒计时</span>
    </p>
    <p @click="praiseTo">
      <span class="tool_index_box_praise" />
      <span>表扬奖励</span>
    </p>
  </div>
</template>
<script>
export default {
  methods: {
    countDownTo: function(num) {
      this.$router.replace({ path: "/openbox/classTab/tool/CountDown" ,"query":{"type":num}});
    },
    praiseTo: function() {
      this.$router.replace({ path: "/openbox/classTab/tool/Praise" });
    }
  }
};
</script>
<style lang="scss" scoped>
.tool_index_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
  p {
    width: 356px;
    height: 99px;
    text-align: center;
    line-height: 99px;
    background: rgba(0, 133, 255, 1);
    box-shadow: 0px 5px 22px 0px rgba(164, 196, 236, 1);
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
    cursor: pointer;
    padding-left: 47px;
  }
  span {
    display: inline-block;
    line-height: 99px;
    font-size: 48px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  p:hover {
    background: #006acc;
  }
  &_countdown {
    width: 38px;
    height: 40px;
    background: url("./../../../assets/image/countdown.png") no-repeat;
    background-size: 38px 40px;
    margin-right: 24px;
  }
  &_praise {
    width: 44px;
    height: 44px;
    background: url("./../../../assets/image/praise.png") no-repeat;
    background-size: 44px 44px;
    margin-right: 18px;
  }
}
</style>