<template>
  <el-card shadow="hover" class="mb-30">
    <div slot="header" class="clearfix">
      <i class="el-icon-edit"></i><span>所有题目</span>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        max-height="600px"
        stripe
      >
        <el-table-column prop="id" label="ID" sortable width="70">
        </el-table-column>
        <el-table-column label="题目" sortable width="380">
          <template slot-scope="scope">
            <router-link :to="'/answerPage/' + scope.row.id">{{
              scope.row.problem
            }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="peopelCount"
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
      <el-pagination
        background
        :page-sizes="[5, 10, 20]"
        :page-size="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="sizes, prev, pager, next"
        :total="total"
        style="padding-top: 30px"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<style scoped>
.clearfix {
  font-size: 28px;
}
</style>

<script>
import "@/assets/css/public.css";

// 用户状态模块
import { getAllProblem, getProblemCount } from "@/service/codeService";
export default {
  created() {
    // 查询总数，设置总条目数
    getProblemCount().then((res) => (this.total = res.data.message));
    // 查询详细列表
    this.Refresh();
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      total: 100,
      tableData: [],
    };
  },
  methods: {
    // 列表的最大页数发生改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.Refresh();
    },
    // 当前页面发生改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.Refresh();
    },
    // 刷新列表
    Refresh() {
      this.getProblemList(
        (this.currentPage - 1) * this.pageSize,
        this.pageSize
      );
    },
    // 获取全部题目接口
    getProblemList(skip, limit) {
      getAllProblem(skip, limit).then((res) => {
        this.tableData = [];
        let queryTableData = res.data.message;
        queryTableData.map((val) => {
          this.tableData.push({
            id: val.pid,
            problem: val.title,
            peopelCount: val.amountCompleted,
            difficulty: val.difficulty,
          });
        });
      });
    },
  },
};
</script>