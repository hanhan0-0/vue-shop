<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button> 
    <button  v-if="1<startAndEnd.start" @click="$emit('getPageNo',1)">1</button>
    <button v-if="2<startAndEnd.start">···</button>

    <button v-for="(page,index) in startAndEnd.end" :key="index" v-show="page>=startAndEnd.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>

    
    <button  v-if="totalPage-1>startAndEnd.end">···</button>
    <button  v-if="totalPage>startAndEnd.end" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:["pageNo","pageSize","total","continues"],
    computed:{
        totalPage(){
            return Math.ceil(this.total/this.pageSize);
        },
        startAndEnd(){
            const {continues,pageNo,totalPage} =this;
            let start=0,end=0;
            if(continues>=totalPage){
                start=1;
                end=totalPage;
            }else{
                start=pageNo-Math.floor(continues/2);
                end=pageNo+Math.floor(continues/2);
                if(start<1){
                    start=1;
                    end=continues;
                }
                if(end>totalPage){
                    end=totalPage;
                    start=totalPage-continues+1;
                }
            }
            return {start,end};
        },
    }

  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #e1251b;
        color: #fff;
      }
    }
  }
</style>
