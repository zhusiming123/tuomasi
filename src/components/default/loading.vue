<style scoped lang='scss'>
div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 40px;
  p {
    width: 187px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(221, 228, 235, 1);
    border-radius: 4px;
    position: fixed;
    top: 100px;
    left: center;
    display: flex;
    align-items: center;
    img {
      margin-left: 40px;
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      color:rgba(5,52,94,1);
      // margin-top: 22px;
    }
  }
}
</style>
<template>
  <div>
    <p>
      <img src="@/assets/image/loadings.gif" alt="loading">
      <span>loading…</span>
    </p>
  </div>
</template>
<script>
// 部分样式代码冗长，未作展示
export default {};
</script>
