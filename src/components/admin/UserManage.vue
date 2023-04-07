<template>
  <div id="user-manage">
    <!-- 表格开始 -->
    <el-table :data="tableData" border style="width: 100%">
<!--      <el-table-column fixed prop="createTime" label="createTime" width="150">-->
<!--      </el-table-column>-->
      <el-table-column prop="account" label="Account" width="120">
      </el-table-column>
      <el-table-column prop="name" label="Name" width="120">
      </el-table-column>
      <el-table-column prop="age" label="Age" width="120">
      </el-table-column>
      <el-table-column prop="balance" label="Balance" width="120">
      </el-table-column>
<!--      <el-table-column prop="idCard" label="🆔" width="300">-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="gender" label="gender" width="120">-->
<!--      </el-table-column>-->
      <el-table-column prop="vip" label="VIP" width="120">
      </el-table-column>
<!--      <el-table-column fixed prop="loginTime" label="loginTime" width="150">-->
<!--      </el-table-column>-->
      <el-table-column fixed prop="logoutTime" label="Logout Time" width="150">
      </el-table-column>
      <el-table-column fixed="right" label="Operate" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small">lock</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
    <!-- 分页开始 -->
    <el-pagination layout="prev, pager, next" @current-change="currentPageChange" :page-size="nums" :total="userTotal">
    </el-pagination>
    <span>A total of {{userTotal}} data </span>
    <!-- 分页结束 -->
  </div>
</template>
<script>
export default {
  name: 'UserManage',
  created() {
    this.getUserTotal()
    this.getPageData(1)
  },
  data() {
    return {
      userTotal: 30,
      nums: 15,
      loading: null,
      tableData: []
    }
  },
  methods: {
    openLoading(text = "loading...") {
      this.loading = this.$loading({
        lock: true,
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    closeLoading() {
      if (this.loading) {
        this.loading.close()
      }
    },
    deleteUser(row) {
      var id = row._id
      this.openLoading("deleting...")
      this.$axios.delete("/api/user/delete",{data:{
        id:id
      }})
      .then(res=>{
        this.closeLoading()
        console.log(res)
        if(res.data.code == 200){
          this.getUserTotal()
          this.getPageData(1)


        }else{
          this.$message({
            message:"fail to delete",
            type:"warning"
          })
        }
      })
      .catch(err=>{
        this.closeLoading()
        console.log(err)
      })
    },
    currentPageChange(page) {
      console.log(page)
      this.getPageData(page)
    },
    getUserTotal() {
      this.openLoading("the data is loading...")
      this.$axios.get("/api/users")
        .then(res => {
          this.closeLoading()
          console.log(res)
          if (res.data.code == 200) {
            this.userTotal = res.data.data.nums
          }
        })
        .catch(err => {
          this.closeLoading()
          console.log(err)
        })
    },
    getPageData(pageNum) {
      this.openLoading("the data is loading...")
      this.$axios.post("/api/users", {
          start: (pageNum - 1) + 1,
          nums: 15
        })
        .then(res => {
          this.closeLoading()
          console.log(res.data.data)
          if (res.data.code == 200) {
            this.tableData = res.data.data.data

          }
        })
        .catch(err => {
          this.closeLoading()
          console.log(err)
        })
    },
  }
}

</script>
<style>
</style>
