<template>
    <div class="toast">{{errorTxt}}</div>
</template>
<script>
    import {mapState} from 'vuex'
    export default({
        computed:{
            ...mapState(['errorTxt'])
        }
    })
</script>
<style lang="scss" scoped>
    .toast{
        padding: 30px;
        background:rgba(0,0,0,0.7);
        box-shadow:0px 4px 30px 0px rgba(174,183,198,0.5);
        border-radius:10px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
        position: fixed;
        top: 50%;
        margin-top: -40px;
        left: center;
        z-index: 10000000;
    }
</style>
