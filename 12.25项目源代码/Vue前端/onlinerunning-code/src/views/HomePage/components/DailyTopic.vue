<template>
  <el-card shadow="hover" class="mb-30">
    <div slot="header" class="clearfix">
      <i class="el-icon-edit"></i><span>今日题目</span>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'id', order: 'descending' }"
        max-height="600px"
      >
        <el-table-column prop="pid" label="ID" sortable width="70">
        </el-table-column>
        <el-table-column prop="title" label="题目" sortable width="380">
          <template slot-scope="scope">
            <router-link :to="'/answerPage/' + scope.row.pid">{{
              scope.row.title
            }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="amountCompleted"
          label="挑战人数"
          sortable
          width="120"
        >
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" sortable>
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="
                scope.row.difficulty === '简单'
                  ? 'success'
                  : scope.row.difficulty === '中等'
                  ? 'warning'
                  : 'danger'
              "
              >{{ scope.row.difficulty }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<style scoped>
.clearfix {
  font-size: 28px;
}
</style>

<script>
// 公共样式
import "@/assets/css/public.css";
// 读取随机题目
import { getRandProblem } from "@/service/codeService.js";

export default {
  data() {
    return {
      RandNumber: 10,
      tableData: [],
    };
  },
  methods: {
    initRandProblem() {
      getRandProblem(this.RandNumber).then((res) => {
        this.tableData = res.data.message;
      });
    },
  },
  created() {
    // 读取随机题目
    this.initRandProblem();
  },
};
</script>