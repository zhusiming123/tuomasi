<template>
     <div class="box_interError">
        <img src="./../../assets/image/404-1.jpg" alt="缺省图"/>
        <span>网络异常，请稍后刷新一下再试～</span>
        <p @click="refresh">刷新</p>
     </div>
</template>
<script>
    export default({
        methods:{
            refresh(){
                this.$router.go()
            }
        },
        created() {
            
        },
    })
</script>
<style lang="scss" scoped>
    .box_interError{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction:column;
        align-items: center;
        position: fixed;
        background: #fbfbfc;
        top:0;
        left: 0;
        z-index: 100000000;
        img{
            width: 660px;
            height: 320px;
            margin-top: 209px;
            margin-bottom: 20px;
        }
        span{
            font-size:24px;
            font-family:PingFangSC-Regular;
            color:rgba(126,139,154,1);
        }
        p{
            width:124px;
            height:44px;
            background:#f39926;
            border-radius:26px;
            font-size:18px;
            font-family:PingFangSC-Medium;
            color:rgba(255,255,255,1);
            text-align: center;
            line-height: 44px;
            margin-top: 20px;
            cursor: pointer;
        }
    }
</style>
