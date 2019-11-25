<template>
  <div class="random_model"
       v-if="modelType">
    <div class="random_model_box">
      <span class="random_model_box_left"></span>
      <div class="random_model_box_center">
        <span class="random_model_box_center_maskTop"></span>
        <span class="random_model_box_center_maskBottom"></span>
        <span class="random_model_box_center_top">
          <div class="random_model_box_center_top_list">
            <ol v-for="(item,index) in list"
                :key="index">{{item.name}}</ol>
          </div>
        </span>
        <p>
          <span class="random_model_box_center_top_select">
            <span v-for="(item,index) in list"
                  :key="index">{{item.name}}</span>
          </span>
        </p>
      </div>
      <span class="random_model_box_right"></span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modelType: false,
      list: [],
      checkMsg: null
    }
  },
  created () {

  },
  mounted () { },
  methods: {
    showModel: function (data, list) {
      this.modelType = true
      this.checkMsg = data
      if (list.length < 55) {
        for (let i = 0; i < 55; i++) {
          this.list[i] = list[i] ? list[i] : list[i % list.length]
        }
      } else {
        this.list = list
      }
      this.list[52] = data
      setTimeout(() => {
        this.animateBegin()
      }, 1000)
    },
    animateBegin: function () {
      // document.getElementsByClassName('random_model_box_center_top_list')[0].style.top = -4025 + 'px';
      // document.getElementsByClassName('random_model_box_center_top_select')[0].style.top = -4888 + 'px';
      document.getElementsByClassName("random_model_box_center_top_list")[0].className = "random_model_box_center_top_list random_model_box_center_top_list1";
      document.getElementsByClassName("random_model_box_center_top_select")[0].className = "random_model_box_center_top_select random_model_box_center_top_select1";
      setTimeout(() => {
        this.modelType = false
        this.$emit('callback', this.checkMsg)
      }, 7000)
    }
  }
}
</script>
<style lang="scss" scoped>
.random_model {
  z-index: 10000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  &_box {
    margin-top: 240px;
    width: 627px;
    height: 350px;
    background: #fff;
    box-shadow: 0px 8px 22px 0px rgba(143, 143, 143, 0.5);
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    &_left {
      display: inline-block;
      width: 56px;
      height: 54px;
      background: url("./../../assets/xylink/left.png") no-repeat;
      background-position: left center;
    }
    &_right {
      display: inline-block;
      width: 53px;
      height: 54px;
      background: url("./../../assets/xylink/right.png") no-repeat;
    }
    &_center {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 350px;
      position: relative;
      p {
        width: 100%;
        height: 94px;
        flex-grow: 0;
        font-size: 24px;
        border-top: 2px solid #bfbfbf;
        border-bottom: 2px solid #bfbfbf;
        font-weight: 600;
        position: absolute;
        top: 128px;
        left: 0;
        overflow: hidden;
        background: #fff;
        z-index: 300;
        .random_model_box_center_top_select {
          width: 100%;
          display: inline-block;
          // height: 94px;
          transition: all 6s ease;
          position: absolute;
          left: 0;
          top: -188px;
          span {
            height: 94px;
            padding: 10px 50px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
          }
        }
        .random_model_box_center_top_select1 {
          top: -4888px;
        }
      }
      &_maskTop {
        z-index: 200;
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        width: 100%;
        height: 128px;
        background: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(rgba(255, 255, 255, 1)),
          to(rgba(255, 255, 255, 0))
        );
      }
      &_maskBottom {
        z-index: 200;
        position: absolute;
        left: 0;
        bottom: 0;
        display: inline-block;
        width: 100%;
        height: 128px;
        background: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(rgba(255, 255, 255, 0)),
          to(rgba(255, 255, 255, 1))
        );
      }
      &_top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 350px;
        z-index: 100;
        overflow: hidden;
        div {
          position: absolute;
          left: 0;
          top: -25px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 6s ease;
          ol {
            margin-bottom: 10px;
          }
        }
        .random_model_box_center_top_list1 {
          top: -4025px;
        }
      }
      &_bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        height: 129px;
        overflow: hidden;
        div {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 5s ease;
          ol {
            margin-bottom: 10px;
          }
        }
      }
      span {
        display: inline-block;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      ol {
        width: 208px;
        height: 60px;
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(126, 139, 154, 1);
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
}
</style>
