<template>
  <div class="xylink">
    <router-view />
  </div>
</template>
<script>
import {mapMutations} from "vuex";
export default {
  created() {
    this.changeTabNum(7);
  },
  methods:{
    ...mapMutations(["changeTabNum"])
  }
};
</script>
<style lang="scss" scoped>
    .xylink{
        width: 100%;
        height: 100%;
    }
</style>
