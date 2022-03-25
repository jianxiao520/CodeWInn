<template>
  <el-card class="card">
    <img
      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      class="image"
    />
    <div style="padding: 14px">
      <div class="username">Jianxiao</div>
    </div>
    <div class="info-list">
      <div>
        <span>积分</span>
        <span>18</span>
      </div>
      <div>
        <span>提交数</span>
        <span>222</span>
      </div>
    </div>
  </el-card>
</template>

<style>
.info-list {
  display: flex;
  flex-direction: column;
  width: 75%;
}
.info-list > div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #545c64;
  margin-bottom: 5px;
  border-radius: 10px;
  color: aliceblue;
}
.info-list > div > span:first-child {
  font-size: 22px;
  font-weight: 800;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  border-radius: 50%;
  box-shadow: 1px 1px 6px 3px #fde1bd;
  width: 85%;
  margin: 0 auto;
  margin-top: 30px;
}
.el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.username {
  font-size: 45px;
  font-weight: 800;
}
.signature {
  color: rgb(182, 182, 182);
  font-size: 16px;
}

.third {
  background-color: #ffffff;
  width: 182px;
  height: 182px;
  border-radius: 50%;
  position: relative;
}

.second {
  background-color: #6ed4bf;
  width: 182px;
  height: 182px;
  border-radius: 50%;
  clip: rect(0, 91px, auto, 0);
  position: absolute;
}
.first {
  background-color: #ffffff;
  width: 182px;
  height: 182px;
  border-radius: 50%;
  clip: rect(0, auto, auto, 91px) ；;
}
.second {
  background-color: #6ed4bf;
  width: 182px;
  height: 182px;
  border-radius: 50%;
  clip: rect(0, 91px, auto, 0);
  position: absolute;
  transform: rotate(30deg);
}
.third * {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.mask > span {
  display: block;
  font-size: 44px;
  color: white;
  line-height: 150px;
}
</style>