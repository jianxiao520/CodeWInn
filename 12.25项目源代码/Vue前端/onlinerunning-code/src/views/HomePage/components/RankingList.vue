<template>
  <el-card shadow="hover" class="mb-30">
    <div slot="header" class="clearfix">
      <i class="el-icon-trophy"></i><span>排行榜</span>
    </div>
    <ul class="ul-defult">
      <li class="list-li" v-for="userList in userLists" :key="userList.name">
        <div class="cell">
          <img :src="userList.Avatar" alt="" />
          <div class="td-info">
            <a href="#" title="lxn">{{ userList.name }}</a>
            <br />
            <span class="text-small">{{ userList.autograph }}</span>
          </div>
        </div>

        <div class="info">
          <span class="score">{{ userList.score }}</span>
        </div>
      </li>
    </ul>
  </el-card>
</template>

<style scoped>
.clearfix {
  font-size: 28px;
}
.list-li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 10px;
  border-bottom: 1px solid #f1f3f6;
}
.list-li:hover {
  background-color: #f1f3f6;
}
.list-li img {
  border-radius: 50%;
  height: 70px;
}

.cell {
  display: flex;
}
.info {
  text-align: center;
  border: 3px solid #ffd04b;
  background-color: white;
  border-radius: 50%;
  line-height: 48px;
  height: 48px;
  width: 48px;
  color: #e7b423;
  cursor: pointer;
  transition: 0.5s all;
}
.score {
  font-weight: 700;
  font-size: 22px;
}

.info:hover {
  background-color: #ffd04b;
  color: white;
}

.td-info {
  padding-left: 10px;
  padding-top: 10px;
}

a {
  color: #f29109;
  font-weight: 800;
}
</style>

<style>
.el-card__body {
  padding-top: 10px;
}
</style>

<script>
import "@/assets/css/public.css";
export default {
  data() {
    return {
      userLists: [
        {
          name: "冰冰宝贝",
          autograph: "天噜啦，我登榜首啦～",
          Avatar: "https://www.xoj.red/static/img/avatars/CaiHangLin.jpg",
          score: 291,
        },
        {
          name: "hhh",
          autograph: "bbb",
          Avatar: "https://www.xoj.red/static/img/avatars/3.jpg",
          score: 244,
        },{
          name: "hhbb",
          autograph: "love",
          Avatar: "https://www.xoj.red/static/img/avatars/hicc0305.jpg",
          score: 224,
        },
      ],
    };
  },
};
</script>