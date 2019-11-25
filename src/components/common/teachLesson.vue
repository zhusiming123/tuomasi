<template>
    <div class="teacherlesson_box">
        <Menu mode="horizontal" :active-name="urlName" @on-select="checkTab">
            <MenuItem name="/Topic">
                我的课表
            </MenuItem>
            <MenuItem name="/Topic/stuMsg">
                学情报告
            </MenuItem>
        </Menu>
        <div class="box_center_content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                urlName:'/Topic'
            }
        },
        methods:{
            checkTab(name){
                this.$set(this,"urlName",name)
                this.$router.push({'path':name})
            }
        },
        created:function(){
            this.$set(this,'urlName',this.$route.path)
        },
    }
</script>
<style lang="scss" scoped>
    .teacherlesson_box{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .box_center_content{
        padding:0 20px 0 20px;
    }
    .ivu-menu-light {
        background:none;
        margin:0 20px;
    }
    .ivu-menu-horizontal {
        height: 64px;
        line-height: 70px;
    }
    li{
        font-size: 18px;
    }
    .ivu-menu-horizontal.ivu-menu-light:after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background:rgba(230,230,230,1);
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
        color:#f39926;
        border-bottom: 3px solid #f39926;
        font-family:PingFangSC-Semibold;
    }
    .ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu {
        float: left;
        margin: 0 40px 0 0;
        padding: 0;
        position: relative;
        cursor: pointer;
        z-index: 3;
        transition: all .2s ease-in-out;
    }
    .ivu-menu-item{
        color:rgba(126,139,154,1);
    }
</style>
