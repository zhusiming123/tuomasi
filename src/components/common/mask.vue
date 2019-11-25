<template>
    <div class="mask" @click="hideImg($event)">
        <div class="image">
            <span @click="hideImg($event)">x</span>
            <img :src="imgSrc">
        </div>
    </div>
</template>
<script>
import { eventBus } from "@/api/eventBus.js";
export default {
  data() {
    return {};
  },
  props: ["imgSrc"],
  methods: {
    hideImg(ev) {
      if (ev.target === ev.currentTarget) {
        //从绑定目标触发
        eventBus.$emit("hided", 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  padding-top: 8%;
  .image {
    max-width: 70%;
    height: 90%;
    display: inline-block;
    position: relative;
    span {
      position: absolute;
      top: -16px;
      right: -16px;
      display: block;
      width: 32px;
      height: 32px;
      text-align: center;
      background: rgba(0, 0, 0, 1);
      border: 2px solid rgba(255, 255, 255, 1);
      border-radius: 50%;
      line-height: 26px;
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
      cursor: pointer;
    }
    img {
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
