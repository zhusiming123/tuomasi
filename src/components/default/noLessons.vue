<template>
     <div class="box_noLessons">
        <img src="./../../assets/image/defined3.png" alt="缺省图"/>
        <span>暂无学情报告~</span>
     </div>
</template>
<script>
    export default({
        methods:{
        },
        created() {
        },
    })
</script>
<style lang="scss" scoped>
    .box_noLessons{
        display: flex;
        flex-direction:column;
        align-items: center;
        img{
            width: 200px;
            height: 200px;
            margin-top: 96px;
            margin-bottom: 20px;
        }
        span{
            font-size:20px;
            color:rgba(126,139,154,1);
            line-height:28px;
        }
        p{
            width:97px;
            height:36px;
            background:rgba(71,139,225,1);
            border-radius:18px;
            line-height: 36px;
            font-size: 14px;
            color:#fff;
            text-align: center;
            margin-top:27px;
        }
    }
</style>
