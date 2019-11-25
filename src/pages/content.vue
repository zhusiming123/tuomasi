<template>
    <div>
        <Row v-for="(item,index) in msg" :key='index'>
            <Col span='24'>{{item.courseName}}</Col>
        </Row>
    </div>
</template>
<script>
    import {requestHURUYANG} from './../api/index'
    import { mapState } from 'vuex';
    export default{
        data(){
            return{}
        },
        computed:{
            ...mapState(['msg'])
        },
        props:['m'],
        created(){
            
        },

    }
</script>
<style scoped>
    .ivu-col{
        height:50px
    }
</style>
