<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props" v-if="props.row.childCategoryMenu">
        <el-table :data="props.row.childCategoryMenu" :show-header="false">
          <el-table-column type="expand">
            <template slot-scope="props" v-if="props.row.childCategoryMenu">
              <el-table :data="props.row.childCategoryMenu" :show-header="false">
                <el-table-column type="expand">
                  <template slot-scope="props" v-if="props.row.childCategoryMenu"></template>
                </el-table-column>
                <el-table-column prop="name"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="name"></el-table-column>
        </el-table>
      </template>
    </el-table-column>

    <el-table-column label="名称" prop="name"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '博客管理1111111111',
          childCategoryMenu: [
            {
              name: '分类管理1111111111111111',
              childCategoryMenu: [{ name: '标签管理1111111111111' }],
            },
            {
              name: '分类管理2',
            },
          ],
        },
        {
          name: '博客管理1',
          childCategoryMenu: [{ name: '标签管理1' }],
        },
        {
          name: '博客管理2',
        },
      ],
    }
  },
}
</script>

<style>
/* .el-table__expanded-cell {
  padding: 0 !important;
} */
</style>

