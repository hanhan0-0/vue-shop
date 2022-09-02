<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item) in list" :key="item.id">
        <img :src="item.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import swiper from 'swiper'

export default {
  name: "Carousel",
  props:['list'],
   watch:{
        list:{
            immediate:true,
            handler(){
                //只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
                if(this.list.length===0 ) return;
                this.$nextTick(()=>{
                        var mySwiper = new swiper ('.swiper-container', {
                            loop: true, // 循环模式选项
                            autoplay:true,
                            // 如果需要分页器
                            pagination: {
                            el: '.swiper-pagination',
                            clickable:true
                            },
                            
                            // 如果需要前进后退按钮
                            navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }
                    }) 
                })
            }
        }
    }
};
</script>

