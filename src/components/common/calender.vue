<template>
    <div class="calendar" :style="calenderTypeCheck?'':'margin-bottom:0'">
        <div class="title" @click='changecalenderType'>{{calenderTypeCheck?'今日待上':'全部课程'}}</div>
        <div class="left" v-show='calenderTypeCheck'>
            <ul>
                <li>
                    <p v-for='item in weekArr'>{{item}}</p>
                </li>
                <div>
                    <span v-for="(item,index) in date"><span @click="item.date>0&&item.date<=yearMonthNum[m-1]?checkDate(item,index):''" :class="item.state!=0?'checked':dateList[item.time]?dateList[item.time].state==1?'begin':'stop':''">{{item.date<=0?'':item.date>yearMonthNum[m-1]?'':item.num}}</span></span>
                </div>
            </ul>
        </div>
        <div class="right" v-show='calenderTypeCheck'>
            <div class="top">
                <p class="reduce" @click="reduce"></p>
                <span>{{year}}年{{month}}月&nbsp&nbsp{{weekArrTwo[week]}}</span>
                <p class="add" @click="add"></p>
            </div>
            <div :class="calenderType?'center':'center1'">{{day>=10?day:"0"+day}}</div>
            <div class="point">
                <span class="point_left"><span></span>有课日</span>
                <span class="point_right"><span class="none"></span>停课日</span>
            </div>
        </div>
        <div v-show='calenderTypeCheck' :class="calenderType?'checkBtn1':'checkBtn'" @click="checkBtn"></div>
    </div>
</template>
<script>  
    import {getDate} from '@/api/index'
    import {mapMutations, mapState, mapActions} from 'vuex'
    export default{
        data(){
            return{
                dateList:[],
                calenderType:false,
                weekArr: [ "周一", "周二", "周三", "周四", "周五", "周六","周日"],
                weekArrTwo:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                yearMonthNum:[],
                year:'',
                month:'',
                day:'',
                week:'',
                monthFirstDay:'',  //当前月份的第一天为周几
                column:'',
                date:[],
                m:'',
                columnNum:0
            }
        },
        computed:{
            ...mapState(['calenderTypeCheck'])
        },
        methods:{
            ...mapMutations(['getList']),
            ...mapActions(['changecalender']),
            changecalenderType(){
                this.getdate()
                this.checkYear()
                this.changecalender(this.year+'-'+this.month+'-'+(this.day>=10?this.day:'0'+this.day))
            },
            //收放日历
            checkBtn(){
                this.$set(this,'calenderType',!this.calenderType)
                this.checkYear()
            },
            //选中日期
            checkDate(item,index){
                this.$set(this,'date',this.date)
                this.$set(this,'day',item.date)
                this.$set(this,'week',item.date%7)
                // if( item.state==0 ){
                this.date.forEach(item=>{
                    item.state=0
                })
                this.date[index].state = 1
                this.getList({'num':1,'date':this.year+'-'+this.month+'-'+(this.day>=10?this.day:'0'+this.day)})
                // }else{
                //     this.date[index].state = 0
                // }
            },
            //增加月份
            add(){
                if( !this.calenderType ){
                    if( this.columnNum+1<this.column ){
                        this.$set(this,'columnNum',this.columnNum+1)
                    }else{
                        if( this.m==12 ){
                             this.$set(this,'year',this.year+1)
                            this.$set(this,'m',1)
                            this.$set(this,'month','01')
                        }else{
                            this.$set(this,'m',this.m+1)
                            this.$set(this,'month',this.m>=10?this.m:'0'+this.m)
                        }
                        this.$set(this,'columnNum',0)
                        this.$set(this,'day','1')
                        this.$set(this,'week',new Date(this.year+'-'+this.month+'-01').getDay()==0?6:new Date(this.year+'-'+this.month+'-01').getDay()-1)
                        this.$set(this,'monthFirstDay',new Date(this.year+'-'+this.month+'-01').getDay()==0?7:new Date(this.year+'-'+this.month+'-01').getDay())
                    }
                    this.checkYear()
                }else{
                    if( this.m==12 ){
                        this.$set(this,'year',this.year+1)
                        this.$set(this,'m',1)
                        this.$set(this,'month','01')
                    }else{
                        this.$set(this,'m',this.m+1)
                        this.$set(this,'month',this.m>=10?this.m:'0'+this.m)
                    }
                    this.$set(this,'day','1')
                    this.$set(this,'columnNum',0)
                    this.$set(this,'week',new Date(this.year+'-'+this.month+'-01').getDay()==0?6:new Date(this.year+'-'+this.month+'-01').getDay()-1)
                    this.$set(this,'monthFirstDay',new Date(this.year+'-'+this.month+'-01').getDay()==0?7:new Date(this.year+'-'+this.month+'-01').getDay())
                    this.checkYear()
                }
            },
            //减少月份
            reduce(){
                if( !this.calenderType ){
                    if( this.columnNum>0 ){
                        this.$set(this,'columnNum',this.columnNum-1)
                    }else{
                        if( this.m==1 ){
                            this.$set(this,'year',this.year-1)
                            this.$set(this,'m',12)
                            this.$set(this,'month',12)
                        }else{
                             this.$set(this,'m',this.m-1)
                            this.$set(this,'month',this.m>=10?this.m:'0'+this.m)
                        }   
                        this.$set(this,'day','1')
                        this.$set(this,'week',new Date(this.year+'-'+this.month+'-01').getDay()==0?6:new Date(this.year+'-'+this.month+'-01').getDay()-1)
                        this.$set(this,'monthFirstDay',new Date(this.year+'-'+this.month+'-01').getDay()==0?7:new Date(this.year+'-'+this.month+'-01').getDay())
                        let column = Math.ceil((this.yearMonthNum[this.m-1] + (this.monthFirstDay-1))/7)
                        this.$set(this,'columnNum',column-1)
                    }
                    this.checkYear()
                }else{
                    if( this.m==1 ){
                        this.$set(this,'year',this.year-1)
                        this.$set(this,'m',12)
                        this.$set(this,'month',12)
                    }else{
                        this.$set(this,'m',this.m-1)
                        this.$set(this,'month',this.m>=10?this.m:'0'+this.m)
                    }
                    this.$set(this,'day','1')
                    this.$set(this,'columnNum',0)
                    this.$set(this,'week',new Date(this.year+'-'+this.month+'-01').getDay()==0?6:new Date(this.year+'-'+this.month+'-01').getDay()-1)
                    this.$set(this,'monthFirstDay',new Date(this.year+'-'+this.month+'-01').getDay()==0?7:new Date(this.year+'-'+this.month+'-01').getDay())
                    this.checkYear()
                }
            },
            //当前天数
            getdate(){
                let t = new Date()
                let y = t.getFullYear()
                let m = parseInt(t.getMonth()+1)>=10?parseInt(t.getMonth()+1):'0'+parseInt(t.getMonth()+1)
                let d = t.getDate()
                let w = t.getDay()-1
                this.$set(this,'m',t.getMonth()+1)
                this.$set(this,'month',m)
                this.$set(this,'year',y)
                this.$set(this,'day',d)
                this.$set(this,'week',w)
                this.$set(this,'monthFirstDay',new Date(this.year+'-'+this.month+'-01').getDay()==0?7:new Date(this.year+'-'+this.month+'-01').getDay())
                this.$set(this,'columnNum',Math.ceil((this.monthFirstDay+d-1)/7-1))
            },
            //日历加载
            checkYear(){
                let t = new Date()
                let date = []
                //判断是否为闰年及当前月份多少天
                let yeartype = (this.year % 4 == 0) && (this.year % 100 != 0 || this.year % 400 == 0)
                if( yeartype ){
                    this.$set(this,'yearMonthNum',[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
                }else{
                    this.$set(this,'yearMonthNum',[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
                }
                let column = Math.ceil((this.yearMonthNum[this.m-1] + (this.monthFirstDay-1))/7)
                this.$set(this,'column',column)
                let currentDay = t.getDate()
                //计算天数
                if(this.m==t.getMonth()+1){
                    if( this.calenderType ){
                        for( let i=0 ; i<column ; i++ ){
                            for( let j=0 ; j<7 ; j++ ){
                                let json = {}
                                if( i*7+j-this.monthFirstDay+2==currentDay ){
                                    json.state = 1
                                }else{
                                    json.state = 0
                                }
                                json.date = i*7+j-this.monthFirstDay+2
                                json.num = i*7+j-this.monthFirstDay+2>=10?i*7+j-this.monthFirstDay+2:'0'+(i*7+j-this.monthFirstDay+2)
                                json.time = this.year+'-'+this.month+'-'+json.num
                                date.push(json)
                            }
                        }
                    }else{
                        for( let j=0 ; j<7 ; j++ ){
                            let json = {}
                            if( this.columnNum*7+j-this.monthFirstDay+2==currentDay ){
                                json.state = 1
                            }else{
                                json.state = 0
                            }
                            json.date = this.columnNum*7+j-this.monthFirstDay+2
                            json.num = this.columnNum*7+j-this.monthFirstDay+2>=10?this.columnNum*7+j-this.monthFirstDay+2:'0'+(this.columnNum*7+j-this.monthFirstDay+2)
                            json.time = this.year+'-'+this.month+'-'+json.num
                            date.push(json)
                        }
                    }
                }else{
                    if( this.calenderType ){
                        for( let i=0 ; i<column; i++ ){
                            for( let j=0 ; j<7 ; j++ ){
                                let json = {}
                                if(i*7+j-this.monthFirstDay+2==1){
                                    json.state = 1
                                    this.day = 1
                                    this.$set(this,'week',new Date(this.year+'-'+this.month+'-01').getDay()==0?6:new Date(this.year+'-'+this.month+'-01').getDay()-1)
                                }else{
                                    json.state = 0
                                }
                                json.date = i*7+j-this.monthFirstDay+2
                                json.num = i*7+j-this.monthFirstDay+2>=10?i*7+j-this.monthFirstDay+2:'0'+(i*7+j-this.monthFirstDay+2)
                                json.time = this.year+'-'+this.month+'-'+json.num
                                date.push(json)
                            }
                        }
                    }else{
                        for( let j=0 ; j<7 ; j++ ){
                            let json = {}
                            if(this.columnNum*7+j-this.monthFirstDay+2==1){
                                json.state = 1
                                this.day = 1
                                this.$set(this,'week',new Date(this.year+'-'+this.month+'-01').getDay()==0?6:new Date(this.year+'-'+this.month+'-01').getDay()-1)
                            }else{
                                json.state = 0
                            }
                            json.date = this.columnNum*7+j-this.monthFirstDay+2
                            json.num = this.columnNum*7+j-this.monthFirstDay+2>=10?this.columnNum*7+j-this.monthFirstDay+2:'0'+(this.columnNum*7+j-this.monthFirstDay+2)
                            json.time = this.year+'-'+this.month+'-'+json.num
                            date.push(json)
                        }
                    }
                }
                //获取课程详情
                getDate({'date':this.year+'-'+this.month}).then(
                    res=>{
                        this.$set(this,'dateList',res.data.data)
                        this.getList({'num':1,'date':this.year+'-'+this.month+'-'+(this.day>=10?this.day:'0'+this.day)})
                    }
                ).catch()           
                this.$set(this,'date',date)
            }
        },
        created(){
            this.getdate()
            this.checkYear()
        }
    }
</script>
<style lang="scss" scoped>
    .calendar{
        z-index: 10000;
        background: #fff;
        display: flex;
        flex-direction: row;
        box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
        border-radius:4px;
        margin-top: 92px;
        position: relative;
        margin-bottom: 40px;
        .checkBtn{
            position: absolute;
            bottom: -20px;
            left: 550px;
            width: 60px;
            height: 20px;
            background: url('./../../assets/image/up.png') no-repeat;
            background-position: center center;
            cursor: pointer;
             box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
        }
        .checkBtn1{
            position: absolute;
            bottom: -20px;
            left: 550px;
            width: 60px;
            height: 20px;
            background: url('./../../assets/image/to.png') no-repeat;
            background-position: center center;
            cursor: pointer;
             box-shadow:0px 2px 6px 0px rgba(205,212,225,0.2);
        }
        .title{
            cursor: pointer;
            font-size:16px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#f39926;
            background: url('./../../assets/image/today.png') no-repeat;
            background-position: center left;
            padding-left: 26px;
            position: absolute;
            top: -50px;
            right: 0;
        }
        .point{
            display: flex;
            flex-direction: row;
            justify-content:space-between;
            padding: 0 30px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(126,139,154,1);
            span{
                display: flex;
                flex-direction: row;
                align-items: center;
                span{
                    margin:0;
                    display: inline-block;
                    width:12px;
                    height:12px;
                    border:3px solid #f39926;
                    border-radius: 50%;
                    margin-right: 8px;
                }
                .none{
                    border:3px solid #999;
                }
            }
        }
        .left{
            padding:30px 30px 20px 30px;
            width: 910px;
        }
        .right{
            width: 289px;
            background: #fff;
            display: flex;
            flex-direction: column;
            border-left: 1px solid #E6E6E6;
            justify-content: space-between;
            padding: 30px 0;
            .top{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                font-size: 26px;
                align-items: center;
                span{
                    font-size:18px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
                p{
                    cursor: pointer;
                    width: 18px;
                    height: 18px;
                }
                .reduce{
                    background: url('./../../assets/image/calen_left.png') no-repeat;
                }
                .reduce:hover{
                    background: url('./../../assets/image/calen_right_hover.png') no-repeat;
                }
                .add{
                    background: url('./../../assets/image/calen_right.png') no-repeat;
                }
                .add:hover{
                    background: url('./../../assets/image/calen_left_hover.png') no-repeat;
                }
            }
            .center{
                text-align: center;
                font-size:140px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:#f39926;
                letter-spacing:5px;
                line-height:140px;
            }
            .center1{
                text-align: center;
                font-size:24px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:#f39926;
                line-height:24px;
            }
        }
        ul{
            width: 100%;
            display: flex;
            flex-direction: column;
            li{
                font-size:18px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(153,153,153,1);
                p{
                    width: 14.28%;
                    display: inline-block;
                    text-align: center;
                }
            }
            div{
                margin-top: 10px;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                span{
                    width: 14.28%;
                    height: 38px;
                    line-height: 38px;
                    margin-bottom: 10px;
                    display: inline-block;
                    text-align: center;
                    font-size:18px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    cursor: pointer;
                    span{
                        border-radius: 50%;
                        width:38px;
                        height:38px;
                        border:2px solid #fff;
                        line-height: 36px;
                        box-sizing: border-box;
                    }
                    .begin{
                        border-radius: 50%;
                        width:38px;
                        height:38px;
                        border:2px solid #f39926;
                        color: #f39926;
                    }
                    .stop{
                        border-radius: 50%;
                        width:38px;
                        height:38px;
                        border:2px solid #999;
                        color: #999;
                    }
                    .checked{
                        background: #f39926;
                        color: #fff;
                    }
                }
                // .checked{
                //     background: #ccc;
                //     color: #fff;
                // }
            }
        }
    }
</style>
