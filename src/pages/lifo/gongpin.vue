<template>
  <div class="bg" :style="bg">
    <!-- 选择的贡品 -->
    <div class="result">
      <uni-row :gutter="2" v-if="selector">
        <uni-col :span="8">
          <view class="block">
            <text class="demonstration">{{ ra }}</text>
            <image style="width: 106px; height: 102px" :src="rau" v-show="ras"></image>
          </view>
        </uni-col>
        <uni-col :span="8">
          <view class="block">
            <text class="demonstration">{{ rb }}</text>
            <image style="width: 106px; height: 102px" :src="rbu" v-show="rbs"></image>
          </view>
        </uni-col>
        <uni-col :span="8">
          <view class="block">
            <text class="demonstration">{{ rc }}</text>
            <image style="width: 106px; height: 102px" :src="rcu" v-show="rcs"></image>
          </view>
        </uni-col>
      </uni-row>
      <view v-else>
        <view style="font-size: 22px; text-align: center">您已上供了{{incense}}次了</view>
      </view>
      <view v-else>
        <view style="font-size: 22px; text-align: center">请选择三样贡品</view>
      </view>
    </div>
    <div class="gongpin">
      <!-- 第一部分 -->
      <uni-row class="demo-imag">
        <uni-col :span="8" v-for="c in fits" :key="c.id" >
          <view class="block">
            <text class="demonstration">{{ c.name }}</text>
            <image class="image" :src="c.url" :fit="c.name" @click="getval(0, c)"></image>
          </view>
        </uni-col>
      </uni-row>

      <!-- 第二部分 -->
      <uni-row class="jos">
        <uni-col :span="8" v-for="j in joss" :key="j.id" >
          <view class="block">
            <text class="demonstration">{{ j.name }}</text>
            <image class="image" :src="j.url" :j="j.name" @click="getval(1, j)"></image>
          </view>
        </uni-col>
      </uni-row>

      <!-- 第三部分 -->
      <uni-row class="frui">
        <uni-col :span="8" v-for="j in fruit" :key="j.id">
          <view class="block">
            <text class="demonstration">{{ j.name }}</text>
            <image class="image" :src="j.url" :j="j.name"  @click="getval(2, j)"></image>
          </view>
        </uni-col>
      </uni-row>
    </div>

    <!-- 确认贡品 -->
 
    <div class="sure">
      <button type="danger" @click="drawer" style="margin-left: 20%;width: 60%">确认贡品</button>
    </div>
    <div style="position: absolute;left: 0;width: 100%;text-align: center">
      <img @click="reward" style="width: 1.87rem;height: 0.48rem;" :src="ds">
    </div>
    <div class="pay" v-show="paymoney">
      <img src="@/static/lifo/hongbao.png" class="image-gf" />
      <div class="money">
        <span>免费供奉</span>
        <br />
        <br />
        <br />
        <span>供奉数量</span>
        <input v-model="input" style="width:18%;font-size: 22px;"></input>
        <br />
        <br />
        <br />
        <button class="gongfeng-btn" type="default" @click="surepay()">确认供奉</button>
        <br />
        <br />
        <button class="gongfeng-btn" type="default" @click="exit">取消</button>
      </div>
    </div>
    <!-- 确认贡品 -->
  </div>
</template>
<script>
import { setStorage, getStorage, removeStorage } from "@/utils/storage";
import {addIncenseCount,getIncenseCount} from "@/api/system";
export default {
  name: "selectf",
  data() {
    return {
      bg: {
        backgroundImage: "url(" + require("@/static/lifo/bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      ds:  "url(" + require("@/static/pray/reward.png") + ")",
      direction: "btt",
      input: 1,
      incense: 0,
      ras: false,
      rbs: false,
      rcs: false,
      selector: false,
      paymoney: false,
      ra: "",
      rb: "",
      rc: "",
      rau: "",
      rbu: "",
      rcu: "",
      fits: [
        {id:0, name: "百合花", url: require("@/static/lifo/baihe.jpg") },
        {id:1, name: "金菊花", url: require("@/static/lifo/jinju.jpg") },
        {id:2, name: "聚荷花", url: require("@/static/lifo/hehua.jpg") }
      ],
      joss: [
        {id:0, name: "祈福香", url: require("@/static/lifo/qifux.jpg") },
        {id:1, name: "健康香", url: require("@/static/lifo/jiankx.jpg") },
        {id:2, name: "财富香", url: require("@/static/lifo/caifux.jpg") }
      ],
      fruit: [
        {id:0, name: "苹果", url: require("@/static/lifo/apple.jpg") },
        {id:1, name: "蟠桃", url: require("@/static/lifo/pantao.jpg") },
        {id:2, name: "金橙", url: require("@/static/lifo/jincheng.jpg") }
      ]
    };
  },
  methods: {
    getval: function(i, params) {
      this.selector = true;
      if (i == 0) {
        this.ras = true;
        this.ra = params.name;
        this.rau = params.url;
      }
      if (i == 1) {
        this.rbs = true;
        this.rb = params.name;
        this.rbu = params.url;
      }
      if (i == 2) {
        this.rcs = true;
        this.rc = params.name;
        this.rcu = params.url;
      }
    },
    drawer: function() {
      this.paymoney=true;
    },
     exit:function(){
      this.paymoney=false;
     },
     surepay:function(){
       this.addUserIncenseCount();
       //把三个参数存储起来
       uni.showToast({
         title: '供奉成功',
         icon: 'none'
       })
       // window.localStorage.setItem("flower", this.rau)
       setStorage({ name: "flower", content: this.rau });
       // window.localStorage.setItem("xiang", this.rbu)
       setStorage({ name: "xiang", content: this.rbu });
       // window.localStorage.setItem("friut", this.rcu)
       setStorage({ name: "friut", content: this.rcu });
       //等待2秒
        setTimeout(() => {
          this.paymoney = false;
          //跳转回lifo页面
          uni.reLaunch({
            url: '/pages/lifo/lifo'
          });
        }, 2000);
    },
    //获取用户供奉的数量
    getUserIncenseCount: function (){
        getIncenseCount().then(res => {
          if (res && res.code == 200) {
            this.incense = res.data.count;
          }
        })
    },
    //增加用户供奉的数量
    addUserIncenseCount: function (){
      addIncenseCount().then(res => {
        this.incense = this.incense + 1;
      })
    },
    reward() {
      window.location.href = `../reward/index.html`
    }

  },
  onLoad(query) {
    this.getUserIncenseCount();
  },
  mounted() {}
};
</script>
<style scoped>
.sure {
  position: absolute;
  bottom: 6%;
  left: 17%;
  right: 17%;
}
.gongfeng-btn {
  width: 138px;
  left: -15%;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
}
.money {
  padding: 14px;
  font-size: 22px;
  position: absolute;
  bottom: 16%;
  left: 16%;
  color: white;
}
.pay {
  left: 5%;
  width: 90%;
  height: 73%;
  position: absolute;
  bottom: 8%;
}
.gongpin {
  //display: flex;
  //flex-direction: column;
  position: absolute;
  left: 4%;
  top: 40%;
  width: 100%;
}
.image {
  width: 106px;
  height: 102px;
  display: flex;
  //margin-top: -1%;
}
.result {
  position: absolute;
  left: 10%;
  top: 13%;
  width: 80%;
}
.block {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
}
.image-gf{
  width: 100%;
  height: 100%;
}
.bg {
  width: 100%;
  height: 800px;
}
</style>