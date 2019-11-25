<template>
    <div class="rank">
        <h1>{{!id?'优秀榜单':'班级榜单'}}</h1>
        <ul class="tab" v-if="id">
            <li :class="state==1?'checked':''" @click="select(1)">做对</li>
            <li :class="state==0?'checked':''" @click="select(0)">做错</li>
            <li :class="state==3?'checked':''" @click="select(3)">未做</li>
        </ul>
        <div class="list" v-if="List.length">
            <ul>
                <li v-if="index<5" v-for="(item,index) in List">
                    <span class="icon" :class="state==0||state==3?'icon-false':index==0?'icon-list-1':index==1?'icon-list-2':index==2?'icon-list-3':'icon-true'">{{state==1&&index>2?index+1:''}}</span>
                    <div>
                        <span class="name">{{item.name}}</span>
                        <span class="school">{{item.school.schoolName}}</span>
                    </div>
                </li>
            </ul>
            <ul>
                <li v-if="index>=5" v-for="(item,index) in List">
                    <span class="icon" :class="state==0||state==3?'icon-false':'icon-true'">{{state==1?index+1:''}}</span>
                    <div>
                        <span class="name">{{item.name}}</span>
                        <span class="school">{{item.school.schoolName}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="noStudent" v-if="!List.length">
            <img src="@/assets/image/null.png" alt=""/>
            <p>暂无学员信息~</p>
        </div>
    </div>
</template>
<script>
    import {mapMutations, mapState} from 'vuex'
    import {ranking} from '@/api/index'
    export default{
        props:{
            questionId:'',
            type:''
        },
        data(){
            return{
                List:[],
                id:'',
                state:1
            }
        },
        created(){
            if( this.$props.type == 2 ){
                this.getList(this.$props.questionId)
            }else{
                if(this.$store.state.practiseMsg.orderClasses){
                    this.List = this.$store.state.practiseMsg.students
                }
            }
        },
        computed:{
            ...mapState(['practiseMsg'])
        },
        methods:{
            getList(questionId,classId,resultState){
                ranking({'questionId':questionId,'classId':classId,'resultState':resultState}).then(res=>{
                    this.List = res.data.data
                })
            },
            changeType(id){
                this.id = id
                this.getList(this.$props.questionId,this.id,this.state)
            },
            select(num){
                this.state = num
                this.getList(this.$props.questionId,this.id,this.state)
            }
        },
        watch:{
            practiseMsg:function(){
                this.List = this.$store.state.practiseMsg.students
            }
        }
    }
</script>
<style lang="scss" scoped>
    .rank{
        display: flex;
        flex-direction: column;
        margin:40px 0 26px 0;
        .noStudent{
            display: block;
            padding: 60px 0 60px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            p{
                font-size:20px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(126,139,154,1);
                margin-top: 15px;
            }
        }
        h1{
            font-size: 18px;
        }
        .tab{
            display: flex;
            flex-direction: row;
            margin-top: 20px;
            li{
                display: inline-block;
                width: 64px;
                height: 30px;
                border: 1px solid #f39926;
                border-radius: 16px;
                text-align: center;
                line-height: 30px;
                color: #f39926;
                margin-right: 20px;
                cursor: pointer;
            }
            .checked{
                display: inline-block;
                width: 64px;
                height: 30px;
                border-radius: 16px;
                text-align: center;
                line-height: 30px;
                 border: 1px solid #f39926;
                 background: #f39926;
                 color: #fff;
                 margin-right: 20px;
                 box-shadow:0px 2px 4px 0px rgba(164,196,236,1);
            }
        }
        div{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            ul{
                display: flex;
                flex-direction: column;
                width: 446px;
                margin-top: 20px;
                li{
                    display: flex;
                    flex-direction: row;
                    width: 446px;
                    div{
                        display: flex;
                        flex-direction: column;
                        span{
                            width: 372px;
                            font-size:18px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:rgba(126,139,154,1);
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            -webkit-line-clamp:1;
                            overflow:hidden;
                        }
                        .name{
                            font-size:24px;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:rgba(51,51,51,1);
                            letter-spacing:2px;
                        }
                        .school{
                            margin-bottom: 24px;
                        }
                    }
                    .icon{
                        width: 64px;
                        height: 64px;
                        display: inline-block;
                        margin-right: 10px;
                        text-align: center;
                        line-height: 64px;
                        font-size:22px;
                        font-family:PingFangSC-Medium;
                        font-weight:500;
                        color:rgba(255,89,33,1);
                    }
                    .icon-false{
                        background:url('./../../assets/image/list-error.png') no-repeat; 
                        background-size:64px 64px; 
                        background-position: center;
                    }
                    .icon-list-1{
                        background:url('./../../assets/image/list-1.png') no-repeat; 
                        background-size:64px 64px; 
                        background-position: center;
                    }
                    .icon-list-2{
                        background:url('./../../assets/image/list-2.png') no-repeat; 
                        background-size:64px 64px; 
                        background-position: center;
                    }
                    .icon-list-3{
                        background:url('./../../assets/image/list-3.png') no-repeat; 
                        background-size:64px 64px; 
                        background-position: center;
                    }
                    .icon-true{
                        background:url('./../../assets/image/icon_star.png') no-repeat; 
                        background-size:64px 64px; 
                        background-position: center;
                    }
                }
            }
        }
    }
</style>

