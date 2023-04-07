<template>
  <div id="receipt">
  	<el-table :data="receipts" style="width: 100%">

        <el-table-column label="Order Number" prop="orderNum">
        </el-table-column>
        <el-table-column label="Purchasing Time" prop="createTime">
        </el-table-column>
        <el-table-column label="Original Price" prop="cutoffValue">
        </el-table-column>
        <el-table-column label="Actual Payment" prop="payValue">
        </el-table-column>
        <el-table-column label="Goods" prop="goodsListName">
        </el-table-column>
      </el-table>
  	<el-empty v-show="receipts.length==0" description="no order"></el-empty>
  </div>
</template>
<script>
export default {
  name: 'Receipt',
  created() {
    this.getAllReceipt()
  },
  data() {
    return {
      loading: null,
      receipts: []
    }
  },
  methods: {
    openLoading(text = "the data is loading...") {
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
    getAllReceipt() {
      this.openLoading()
      this.$axios.get("/api/self/receipt")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.receipts = res.data.data.data
          }
        })
        .catch(err => {
          this.closeLoading()
        })
    }
  }
}

</script>
<style>
</style>
