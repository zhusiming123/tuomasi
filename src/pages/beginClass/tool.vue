<template>
  <div class="tool_box">
    <router-view />
  </div>
</template>
<script>
import {mapMutations} from "vuex";
export default {
  computed:{
         
  },
  created() {
    this.changeTabNum(6);
  },
  methods:{
    ...mapMutations(["changeTabNum"])
  }
};
</script>
<style lang="scss" scoped>
    .tool_box{
        width: 100%;
        height: 100%;
    }
</style>
