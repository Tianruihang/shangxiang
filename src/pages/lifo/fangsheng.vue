<template>
  <div class="bg" :style ="bg">
<!--<el-button type="warning" plain  class="btn" @click="dialogVisible = true">意念放生</el-button>-->
<!--<el-dialog-->
<!--  title="善有善报"-->
<!--  :visible.sync="dialogVisible"-->
<!--  width="100%"-->
<!--  :before-close="handleClose">-->
<!--  <span>每天坚持放生，心诚则灵，感恩随喜功德</span>-->
<!--  <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="otherkinds()">选择放生种类</el-button>-->
<!--  </span>-->
<!--</el-dialog>-->
    <button class="btn" @click="openPopup">意念放生</button>

    <!-- 弹窗内容 -->
    <uni-popup ref="popup" type="center" :mask-click="false">
      <view class="popup-content">
        <view class="yu" v-if="kindsyu">
          <img src="@/static/lifo/nq.png" class="img" @click="fs('@/static/lifo/nq.png')"/>
          <img src="@/static/lifo/cy.png" class="img" @click="fs('@/static/lifo/cy.png')"/>
          <img src="@/static/lifo/jy.jpg" class="img" @click="fs('@/static/lifo/jy.png')"/>
          <img src="@/static/lifo/bl.png" class="img" @click="fs('@/static/lifo/bl.png')"/>
          <img src="@/static/lifo/jiayu.jpg" class="img" @click="fs('@/static/lifo/jiayu.png')"/>
          <img src="@/static/lifo/wg.png" class="img" @click="fs('@/static/lifo/wg.png')"/>
        </view>
        <view class="popup-header">善有善报</view>
        <view class="popup-body">每天坚持放生，心诚则灵，感恩随喜功德 <br /> 请选择图片放生种类</view>


      </view>
      <view class="popup-footer">
        <button @click="closePopup" class="cancel-button">取 消</button>
      </view>
    </uni-popup>
<!-- 鱼的种类 -->

 
<!-- 鱼的种类 -->
<!-- 放生鱼的付款页面 -->
<div class="pay" v-if="pay" :style ="bg">
<img :src="getMyImg(myimg)" class="selectImg"/>
<br><br>
<span style="margin-right:3vh">放生数量</span><el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="放生数量"></el-input-number>
<br><br>
<button type="default" style="font-size:16px;" @click="submitFangsheng" >确认</button>
</div>
<!-- 放生鱼的付款页面 -->
  </div>
</template>
<script>
export default {
   name: 'fash',
  data() {
    return {
        bg: {
         backgroundImage: "url(" + require("@/static/lifo/fash2.jpg") + ")",
         backgroundRepeat: "repeat",
         backgroundSize: "100% 100%",
   },
    num: 1,
    myimg:'',
    dialogVisible: false,
    kindsyu:false,
    pay:false,
    };
  },
   methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       handleChange(value) {
        console.log(value);
      },
     getMyImg:function (params) {
       return params.replace(/^@\/static/, "/static");
     },
    otherkinds:function () {
      this.dialogVisible = false;
      //打开一个新的弹框
      this.kindsyu=true;
    },
     openPopup() {
       this.$refs.popup.open();
       //打开一个新的弹框
       this.kindsyu=true;
     },
     closePopup() {
       this.$refs.popup.close();
     },
     submitFangsheng:function () {
       uni.showToast({
         title: '放生成功,功德无量',
         icon: 'none'
       })
       this.pay=false;
     },
    returns:function() {
       this.pay=false;
       this.kindsyu=true;
    },
    fs:function(params) {
      //关闭鱼种类窗口，打开一个新的窗口
       this.kindsyu=false;
      this.$refs.popup.close();
       this.pay=true;
       this.myimg=params
      //关闭鱼种类窗口，打开一个新的窗口
    }
  },
  mounted() {
 
  }
};
</script>
<style scoped>
.img{
  width: 16vh;
  height: 17vh;
  margin-left: -2%;
}
.selectImg{
  width: 30vh;
  height: 30vh;
  margin-left: 20%;
}
.pay{
  position: absolute;
  top:10vh;
  width:90%;
  height:55%;
  left: 5%;
  font-size:16px;
background-color: azure;
}
.yu{
  position: absolute;
  //height:85vh;
  background-color: azure;
  top:17vh;
  margin: 10% 14% 5% 6%;
  display: flex; /* 使用 flex 布局 */
  flex-wrap: wrap;
}
.bg{
  width:100%;
  height:100vh;
  margin-top:-5%;
}
.btn{
  font-size:22px;
  margin-top: 100%;
}

/* 弹窗样式 */
.popup-content {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.popup-header {
  padding-left: 40%;
  padding-top: 5%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #eee;
  margin-top: 10%;
}

.popup-body {
  padding: 20px;
  text-align: center;
  font-size: 16px;
}

.popup-footer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  border-top: 1px solid #eee;
  margin-top: 90%;
}

.cancel-button {

  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  color: #333;
  margin-top: 60%;
}

.confirm-button {
  padding: 10px 20px;
  background-color: #007aff;
  border: none;
  border-radius: 5px;
  color: #fff;
}
</style>