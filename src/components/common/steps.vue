<template>
    <div class="box_steps">
        <ul>
            <div :class="stepNum>=1?'check':''">
                <li>
                    <span>1</span>
                </li>
                <p>身份验证</p>
            </div>
            <div :class="stepNum>=2?'check':''">
                <li>
                    <span>2</span>
                </li>
                <p>设置新密码</p>
            </div>
            <div :class="stepNum>=3?'check':''">
                <li>
                    <span>3</span>
                </li>
                <p>完成</p>
            </div>
        </ul>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default({
        computed:{
            ...mapState(['stepNum'])
        }
    })
</script>
<style lang="scss" scoped>
       .box_steps{
            width:1200px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            ul{
                margin-top: 69px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                background: #BFBFBF;
                height: 5px;
                border-radius: 4px;
                div{
                    width: 226px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 62px;
                    p{
                        margin-top: 22px;
                        font-size:16px;
                        color:#7E8B9A;
                        font-family:PingFangSC-Medium;
                    }
                    li{
                        display: inline-block;
                        width: 226px;
                        height: 5px;
                        background: #BFBFBF;
                        border-radius:4px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-around;
                        span{
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                            background: #BFBFBF;
                            text-align: center;
                            line-height: 30px;
                            color: #fff;
                            font-size:18px;
                            border-radius: 50%;
                            font-family:PingFangSC-Medium;
                        }
                    }
                }
                .check{
                    li{
                        background: #f39926;
                    }
                    span{
                        background: #f39926;
                    }
                    p{
                        color: #f39926;
                    }
                }
                
            }
        }
</style>
