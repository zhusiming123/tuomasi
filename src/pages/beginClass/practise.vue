<template>
  <div class="box_practise">
    <Practise v-if="practiseType==1" />
    <CountSingleProject v-if="practiseType==2" />
    <!-- <PractiseLoading v-if="practiseType==3"/> -->
    <practiseClassList v-if="practiseType==4" />
  </div>  
</template>
<script>
import {mapMutations,mapState} from "vuex";
import Practise from "@/components/beginClass/Practise/practise.vue";
import CountSingleProject from "@/components/beginClass/Practise/countSingleProject";
// import PractiseLoading from '@/components/beginClass/practiseLoading'
import practiseClassList from "@/components/beginClass/Practise/practiseClassList";
export default({
  components:{Practise,CountSingleProject,practiseClassList},
  computed:{
    ...mapState(["practiseType"])
  },
  created() {
    this.changeTabNum(1);
  },
  methods:{
    ...mapMutations(["changeTabNum"])
  }
});
</script>
<style lang="scss" scoped>
   .box_practise{
       height: 100%;
       width: 100%;
       padding:0;
   }
</style>
