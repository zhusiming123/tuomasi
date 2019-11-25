<template>
  <div class="box">
    <BackUplate v-if="backStepsType==1" />
    <BackProjectLoading v-if="backStepsType==2" />
    <BackProjectCount v-if="backStepsType==3" />
  </div>
</template>
<script>
import {mapState,mapMutations} from "vuex";
import BackUplate from "@/components/beginClass/backUpload/backUplate";
import BackProjectLoading from "@/components/beginClass/backUpload/backProjectLoading";
import BackProjectCount from "@/components/beginClass/backUpload/backProjectCount";
export default({
  components:{BackUplate,BackProjectCount,BackProjectLoading},
  computed:{
    ...mapState(["backStepsType"])
  },
  methods:{
    ...mapMutations(["changeTabNum"])
  },
  created() {
    this.changeTabNum(4);
  }
});
</script>
<style lang="scss" scoped>
   
</style>