<template>
  <div>
    <el-card shadow="always">
      <el-result
        icon="error"
        title="404"
        subTitle="页面不存在或者正在建设中..."
      >
        <template slot="extra">
          <el-button type="primary" size="medium" @click="$router.push('/')"
            >返回</el-button
          >
        </template>
      </el-result>
    </el-card>
  </div>
</template>