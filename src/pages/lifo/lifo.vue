<template>
  <div class="bg" :style="bg">
<!--    <el-carousel :autoplay="false" class="d_jump">-->
<!--      <el-carousel-item v-for="item in imgList" :key="item.id">-->
<!--        <el-row>-->
<!--          <el-col :span="24">-->
<!--            {{ item.name }}-->
<!--            <img ref="imgHeight" :src="item.idView" class="img"/>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->
    <view class="d_jump">
      <!-- Swiper 轮播组件 -->
      <swiper
          :autoplay="false"
          indicator-dots
          circular
          style="height: 90%;"
          interval="3000"
      >
        <swiper-item
            v-for="item in imgList"
            :key="item.id"
        >
          <view class="swiper-content">
            <!-- 显示图片名称 -->
            <view class="name">{{ item.name }}</view>
            <!-- 显示图片 -->
            <image
                ref="imgHeight"
                :src="item.idView"
                class="img"
                mode="aspectFit"
            />
          </view>
        </swiper-item>
      </swiper>
      <view class="button-group">
        <navigator url="/pages/lifo/gongpin" hover-class="navigator-hover">
          <button type="default" class="button-gf">供花供佛</button>
        </navigator>
        <!-- pages/lifo/fangsheng --->
        <navigator url="/pages/lifo/fangsheng" hover-class="navigator-hover">
          <button type="default" class="button-gf">放生</button>
        </navigator>
      </view>
    </view>
    <!-- 空的瓶子 -->
    <div class="xx">
      <img :src="rau" style="width:30%"/>
    </div>
    <div class="xy">
      <img :src="rbu" style="width:30%"/>
    </div>
    <div class="xz">
      <img :src="rcu" style="width:30%"/>
    </div>
    <!-- 空的瓶子 -->
<!--    <el-button-group>-->
<!--      <a href="/selectf">-->
<!--        <el-button type="primary">供花供佛</el-button>-->
<!--      </a>-->
<!--    </el-button-group>-->

  </div>
</template>
<script>

export default {
  data() {
    return {
      bg: {
        backgroundImage: "url(/static/lifo/bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      rau: '/static/lifo/default-vase.jpg', rbu: '/static/lifo/default-plate.jpg', rcu: '/static/lifo/default-burner.jpg',
      imgHeight: "",
      imgList: [
        {id: 0, name: '南无释迦牟尼佛', idView: require('@/static/lifo/shijia.jpg')},
        {id: 1, name: '南无毗卢遮那佛', idView: require('@/static/lifo/luze.jpg')},
        {id: 2, name: '南无消灾延寿药师佛', idView: require('@/static/lifo/shouyao.jpg')},
        {id: 3, name: '南无阿弥陀佛', idView: require('@/static/lifo/emi.jpg')},
        {id: 4, name: '南无普贤菩萨', idView: require('@/static/lifo/puxian.jpg')},
        {id: 5, name: '南无观世音菩萨', idView: require('@/static/lifo/guanyin.jpg')},
        {id: 6, name: '南无千手千眼观世音菩萨', idView: require('@/static/lifo/qianshou.jpg')},
        {id: 7, name: '多宝如来', idView: require('@/static/lifo/rulai.jpg')},
        {id: 8, name: '准提菩萨', idView: require('@/static/lifo/zhunti.jpg')}
      ]
    };
    that.imgHeight = "400px";
    window.onresize = function temp() {
      // 通过点语法获取img的height属性值
      that.imgHeight = `${that.$refs.imgHeight["0"].height}px`;
    };
  },
  methods: {},
  mounted() {
    var rau = window.localStorage.getItem("flower");
    var rbu = window.localStorage.getItem("xiang");
    var rcu = window.localStorage.getItem("friut");
    // alert(rau);
    if (rau == '' || rau == null || rau == undefined) {

    } else {
      this.rau = rau
      this.rbu = rbu
      this.rcu = rcu
    }

  }
};
</script>
<style scoped>
.image {
  width: 50%;
  height: 50%;
}
.button-group{
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}
.xx {
  position: absolute;
  bottom: 15%;
  left: 19%;
  width: 45%;
}

.xy {
  position: absolute;
  bottom: 15%;
  left: 42%;
  width: 45%;
}

.xz {
  position: absolute;
  bottom: 15%;
  left: 67%;
  width: 45%;
}

.swiper-content {
  //display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.name {
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
}
.img {
  width: 100%;
  height: 500px;
  border-radius: 10px;
  object-fit: cover;
}

.el-carousel__item {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  height: 500px;
  margin: 0;
}
.button-gf{
  width: 120px;
  height: 40px;
  //background-color: #ff0000;
  //color: white;
  border: none;
  border-radius: 5px;
}
.bg {
  //height: 600px;
  width: 100%;
  color: white;
}

.d_jump {
  height: 100%;
  width: 100%;
  //overflow: hidden;
  display: block;
}
</style>
 
 