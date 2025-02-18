<template>
  <view class="full-width-height" :style="{ position: 'relative' }">
    <view v-if="status">
      <view>
        <text class="top-text">请您点击
          <text class="highlight-text">右上角</text>
        </text>
        <image :src="jiantou" class="arrow-icon" />
      </view>

      <view class="center-img">
        <image :src="img_url" class="img" />
      </view>

      <view class="center-img" style="top: 2.90rem;">
        <image :src="yhfk" class="img-small" />
      </view>

      <view class="bg-white-box">
        <view class="message-box">{{mess}}</view>
        <view class="divider"></view>
        <view v-if="comment" id="review_boxs" class="comment-box">
          <view id="comment1s"></view>
          <view id="comment2s"></view>
        </view>
      </view>
    </view>
    <view v-else>
      <image :src="textImg" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      jiantou: '../../static/pray/qiantong.png',
      yhfk: '../../static/pray/yhfk@2x.png',
      img_url: '../../static/pray/pengyouquan@2x.png',
      comment: true,
      status: true,
      mess: `本解签一共帮助了${this.randomNum(3000000, 6000000)}名用户，${this.randomNum(96, 99.5)}%的用户对结果非常满意`,
      num: 1,
      list: [
        {
          src: '../../static/xtx/1.jpg',
          name: '次日图捏',
          content: '保佑我以及家人身体健康，这次检查能一切顺利，开开心心，南无阿弥陀佛观世音菩萨！'
        },
        {
          src: '../../static/xtx/2.jpg',
          name: 'laneud',
          content: '南无大慈大悲广大灵感观世音菩萨摩诃萨！'
        },
        {
          src: '../../static/xtx/3.jpg',
          name: '开诶女聪明',
          content: '感恩顶礼南无大慈大悲观世音菩萨！'
        }
      ],
      timer: null,
      textImg: ''
    };
  },
  mounted() {
    this.roll(30);
    document.addEventListener('visibilitychange', this.handleVisiable);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    roll(count) {
      // Implement your rolling logic here.
    },
    handleVisiable() {
      // Implement your visibility change logic here.
    }
  }
};
</script>

<style scoped>
.top-text {
  position: absolute;
  top: 0.50rem;
  right: 0.72rem;
  color: #333333;
  font-size: 0.2rem;
  font-weight: bold;
}
.highlight-text {
  font-size: 0.26rem;
  color: #FF4500;
  font-weight: bold;
}
.arrow-icon {
  animation: bounce-up 1s infinite linear;
  width: 0.55rem;
  height: 0.57rem;
  position: absolute;
  top: 0.19rem;
  right: 0.12rem;
}
.center-img {
  position: absolute;
  top: 0.88rem;
  left: 0;
  width: 100%;
  text-align: center;
}
.img {
  width: 96%;
  height: auto;
}
.img-small {
  width: 96%;
  height: 0.46rem;
}
.bg-white-box {
  position: absolute;
  top: 3.5rem;
  left: 0;
  width: 96%;
  margin-left: 2%;
  height: 38%;
  border-radius: 0.09rem;
  border: 0.04rem solid rgba(255, 187, 86, 1);
  background-color: white;
}
.message-box {
  padding: 0.10rem 0.13rem 0.10rem 0.08rem;
  font-size: 0.15rem;
  font-weight: bold;
  color: rgba(255, 69, 0, 1);
  line-height: 0.21rem;
  text-align: center;
}
.divider {
  height: 0.10rem;
  background: rgba(232, 232, 232, 1);
}
.comment-box {
  width: 100%;
  pointer-events: none;
}
</style>
