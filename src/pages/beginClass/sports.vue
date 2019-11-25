<template>
  <div class="box_sports">
    <SportsPackage v-if="sportsType==1" />
    <SportsPK v-if="sportsType==2" />
    <PKrankList v-if="sportsType==3" />
    <CountMoney v-if="sportsType==4" />
    <RankingList v-if="sportsType==5" />
    <PKloading v-if="sportsType==6" />
    <ThreeCount v-if="sportsType==7" />
  </div>  
</template>
<script>
import {mapMutations} from "vuex";
import SportsPK from "@/components/beginClass/sports/sportsPK";
import SportsPackage from "@/components/beginClass/sports/sportsPackage";
import PKrankList from "@/components/beginClass/sports/PKrankList";
import CountMoney from "@/components/beginClass/sports/countMoney";
import RankingList from "@/components/beginClass/sports/rankingList";
import PKloading from "@/components/beginClass/sports/PKloading";
import ThreeCount from "@/components/beginClass/sports/threeCount";
import {mapState} from "vuex";
export default({
  data(){
    return{};
  },
  components:{SportsPK,SportsPackage,PKrankList,CountMoney,RankingList,PKloading,ThreeCount},
  computed:{
    ...mapState(["sportsType"])
  },
  methods:{
    ...mapMutations(["changeTabNum"])
  },
  created() {
    this.changeTabNum(2);
  },
});
</script>
<style lang="scss" scoped>
    .box_sports{
        padding: 0;
    }
</style>
