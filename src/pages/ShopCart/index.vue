<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th4">单价（元）</div>
        <div class="cart-th5">数量</div>
        <div class="cart-th6">小计（元）</div>
        <div class="cart-th7">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input @change="updateChecked(cart,$event)" type="checkbox" name="chk_list" :checked="cart.isChecked==1">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <div>
                <a href="javascript:void(0)" class="mins"   @click.prevent="changeNum('minus',-1,cart)">-</a>
                <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="changeNum('change',$event.target.value*1,cart)">
                <a href="javascript:void(0)"  class="plus"  @click.prevent="changeNum('add',1,cart)" >+</a>
            </div>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.cartPrice*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet"  @click.prevent="deleteCartById(cart.skuId)">删除</a>
            <br>
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input  @change="updateAllCartChecked" class="chooseAll" type="checkbox" :checked="isAllChecked  && cartInfoList.length>0">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;"  @click.prevent="deleteAllCheckedCart">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade" >结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import throttle from 'lodash/throttle';
  export default {
    name: 'ShopCart',
    computed:{
      ...mapGetters('shopcart',['cartList']),
      cartInfoList(){
        return this.cartList.cartInfoList || [];
      },
      //计算购买产品总数量
      totalNum(){
        let sum=0;
        this.cartInfoList.forEach(item => {
          sum+=item.skuNum;
        });
        return sum;
      },
      //计算购买产品总价
      totalPrice(){
        let sum=0;
        this.cartInfoList.forEach(item => {
          sum+=item.skuNum*item.skuPrice;
        });
        return sum;
      },
      //判断底部复选框是否勾选，选中则全部商品都选中
      isAllChecked(){
        return this.cartInfoList.every((item)=>item.isChecked==1);
      }
    },
    mounted() {
      this.getData();
    },
    methods:{
      getData(){
        this.$store.dispatch('shopcart/getCartList');
      },
      
      changeNum:throttle(async function(type,value,cart){
        switch(type){
          case "add":
            value=1;
            break;
          case "minus":
            value=cart.skuNum>1?-1:0;
            break;
          case "change":
            if(isNaN(value) || value<1){
              value=0;
            }
            else{
              value=parseInt(value)-cart.skuNum;
            }
        }
        try{
            await this.$store.dispatch('detail/addOrUpdateShopCart',{skuId:cart.skuId,skuNum:value});
            this.getData();
        }catch(error){
          alert(error.message);
        }},500),
        //删除某一件商品
      async deleteCartById(skuId){
        try{
          await this.$store.dispatch("shopcart/deleteCartListBySkuId",skuId);
          this.getData();
        }catch(error){
          alert(error.message);
        }
      },
      //修改勾选状态
      async updateChecked(cart,event){
        let checked=event.target.checked?"1":"0";
        if(checked=='1'){
          cart.isChecked==1;
        }else{
          cart.isChecked==0;
        }
        console.log(checked);
        try{
          await this.$store.dispatch("shopcart/updateCheckedById",{skuId:cart.skuId,isChecked:checked});
          // this.getData();
        }catch(error){
          alert(error.message);
        }
      },
       //删除全部选中的产品
    async deleteAllCheckedCart() {
      try {
        //派发一个action
        await this.$store.dispatch("shopcart/deleteAllCheckedCart");
        //再发请求获取购物车列表
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改全部产品的选中状态
    async updateAllCartChecked(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        //派发action
        await this.$store.dispatch("shopcart/updateAllCartIsChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    }
       
      
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 5%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
          text-align: center;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6,
        .cart-th7 {
          width: 17.5%;
          text-align: center;
        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 17.5%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width:  17.5%;
              text-align: center;

          }

          .cart-list-con5 {
              width:  17.5%;
              text-align: center;
              div{
                width: 88px;
                margin:  0 auto;
                 .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
              &:hover{
                text-decoration: none;
              }
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 31.6px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
              &:hover{
                text-decoration: none;
              }
            }
              }
           
          }

          .cart-list-con6 {
            width:  17.5%;
              text-align: center;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width:  17.5%;
              text-align: center;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>