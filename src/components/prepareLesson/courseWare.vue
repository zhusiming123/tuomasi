<template>
<div>
    <ul v-if="teacheDocument==3||teacheDocument==7||teacheDocument==8">
        <li :class="typeNum==1?'active':''" @click="check(1)">试卷</li>
        <li :class="typeNum==2?'active':''" @click="check(2)">答案</li>
    </ul>
    <div class="null" v-if="defaultType">
        <img src="./../../assets/image/course_null.png" alt=""/>
        <span>暂无相关课件资料～</span>
    </div>
    <iframe v-if='!defaultType' :src='showUrl'  frameborder='0' border="0" marginwidth='0' marginheight='0' scrolling="no" runat="server" allowtransparency=”yes”></iframe>
</div>
</template>
<script>
    import {getCourseDetail} from '@/api/index'
    import { mapState,mapGetters } from "vuex";
    export default{
        data(){
            return{
                msg:{},
                showUrl:'',
                typeNum:1,
                defaultType:false
            }
        },
        computed:{
            teacheDocument(){
                return this.$store.state.teacheDocument
            }
        },
        created(){
            getCourseDetail(window.sessionStorage.getItem('lessonId')).then(
                res=>{
                    if( res.data.errno==200 ){
                        if( res.data.data.preClassTest.paperShowUrl ){
                            this.$store.state.preClassTest = true
                        }else{
                             this.$store.state.preClassTest = false
                        }
                        if( res.data.data.midTermTest.paperShowUrl ){
                            this.$store.state.midTermTest = true
                        }else{
                             this.$store.state.midTermTest = false
                        }
                        if( res.data.data.endTermTest.paperShowUrl ){
                            this.$store.state.endTermTest = true
                        }else{
                             this.$store.state.endTermTest = false
                        }
                        this.$set(this,'msg',res.data.data)
                        if( this.msg.teachCourseware.showUrl ){
                            this.$set(this,'defaultType',false)
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+encodeURIComponent(res.data.data.teachCourseware.showUrl))
                        }else{
                            this.$set(this,'defaultType',true)
                        }
                    }
                }
            )
        },
        watch:{
            teacheDocument:function(){
                 if( this.$store.state.teacheDocument==1 ){
                    if( this.msg.teachCourseware.showUrl ){
                        this.$set(this,'defaultType',false)
                        this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.teachCourseware.showUrl)
                    }else{
                        this.$set(this,'defaultType',true)
                    }
                }else if( this.$store.state.teacheDocument==2){
                    if( this.msg.stuHandout.showUrl ){
                        this.$set(this,'defaultType',false)
                         this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.stuHandout.showUrl)
                    }else{
                        this.$set(this,'defaultType',true)
                    }
                }else if( this.$store.state.teacheDocument==3){
                     if( this.msg.preClassTest.paperShowUrl ){
                        this.$set(this,'defaultType',false)
                        if( this.typeNum==1 ){
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.preClassTest.paperShowUrl)
                        }else{
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.preClassTest.paperShowAnswerUrl)
                        }
                    }else{
                        this.$set(this,'defaultType',true)
                    }
                }else if( this.$store.state.teacheDocument==4){
                    if(this.msg.teachCase.showUrl ){
                        this.$set(this,'defaultType',false)
                        this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.teachCase.showUrl)
                    }else{
                        this.$set(this,'defaultType',true)
                    }
                }else if(this.$store.state.teacheDocument==7){
                    if(this.msg.midTermTest.paperShowUrl ){
                        this.$set(this,'defaultType',false)
                        if( this.typeNum==1 ){
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.midTermTest.paperShowUrl)
                        }else{
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.midTermTest.paperShowAnswerUrl)
                        }
                    }else{
                        this.$set(this,'defaultType',true)
                    }
                }else if(this.$store.state.teacheDocument==8){
                    if(this.msg.endTermTest.paperShowUrl ){
                        this.$set(this,'defaultType',false)
                        if( this.typeNum==1 ){
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.endTermTest.paperShowUrl)
                        }else{
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.endTermTest.paperShowAnswerUrl)
                        }
                    }else{
                        this.$set(this,'defaultType',true)
                    }
                }
            },
        },
        methods:{
            check(num){
                switch(this.$store.state.teacheDocument){
                    case 3: 
                        if( num==1 ){
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.preClassTest.paperShowUrl)
                        }else{
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.preClassTest.paperShowAnswerUrl)
                        }
                    ; break;
                    case 7: 
                        if( num==1 ){
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.midTermTest.paperShowUrl)
                        }else{
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.midTermTest.paperShowAnswerUrl)
                        } 
                    ; break;
                    case 8: 
                        if( num==1 ){
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.endTermTest.paperShowUrl)
                        }else{
                            this.$set(this,'showUrl','http://ow365.cn/?i=16735&furl='+this.msg.endTermTest.paperShowAnswerUrl)
                        } 
                     ; break;
                }
                this.$set(this,'typeNum',num)
            }
        },
        mounted(){
           
        }
    }
</script>
<style lang="scss" scoped>
    iframe{
        width:100%;
        height: 1000px;
    }
    .null{
        width:100%;
        height: 1000px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 150px;
        span{
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(126,139,154,1);
            margin-top: 20px;
        }
    }
    ul{
        display: flex;
        flex-direction: row;
        border-radius: 2px;
        overflow: hidden;
        margin-bottom: 20px;
        li{
            padding: 8px 20px;
            border:1px solid rgba(230,230,230,1);
            font-size:12px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#f39926;
            font-weight: bold;
            cursor: pointer;
        }
        .active{
            background: #f39926;
            border:1px solid #f39926;
           color: #fff;
        }
    }
</style>
