<template>
    <div class="box" :style="'min-height:'+height+'px'">
        <div class="box_left">
            <div class="box_left_header"></div>
        </div>
        <div class="box_center" :style="'min-height:'+height+'px'">
            <Header/>
            <router-view></router-view>
        </div>
        <div class="box_right">
            <div class="box_right_header"></div>
        </div>
    </div>
</template>
<script>
   import Header from '@/components/common/header.vue'
    export default {
        data(){
            return{
                height:''
            }
        },
        created(){
            this.$set(this,"height",window.innerHeight)
        },
        components:{Header}
    }
</script>
<style lang="scss" scoped>
    .loginout{
        cursor: pointer;
    }
    .box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    .box_left{
        flex-grow: 1;
        flex-shrink: 1;
        .box_left_header{
            width: 100%;
            height: 80px;
            background:#f39926;
        }
    }
    .box_right{
        flex-grow: 1;
        flex-shrink: 1;
        .box_right_header{
            width: 100%;
            height: 80px;
            background:#f39926;
        }
    }
    .box_center{
        background:#F1F3F6;
        width: 1200px;
        height: 100%;
        flex-grow: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
</style>
