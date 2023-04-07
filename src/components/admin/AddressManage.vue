<template>
  <div id="address-manage">
    <div class="left">
      <!-- 地址展示开始 -->
      <el-table :data="tableData" style="width: 100%" max-height="500">
        <el-table-column prop="province" label="Province" width="120">
        </el-table-column>
        <el-table-column prop="town" label="City" width="120">
        </el-table-column>
        <el-table-column prop="county" label="District" width="120">
        </el-table-column>
        <el-table-column prop="detail" label="Detail" width="300">
        </el-table-column>
        <el-table-column label="Operate" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 地址展示结束 -->
    </div>
    <div class="right">
      <span>Please select an address：</span>
      <Address @getAddressFromChild="setAddress"></Address>
      <span>
        <el-input v-model="addressFrom.detail" placeholder="Detail"></el-input>
      </span>
      <span>
        <el-button type="primary" @click="addAddress">add</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import Address from "../utils/Address.vue"
export default {
  name: 'AddressManage',
  data() {
    return {
      addressFrom: {
        province: '',
        town: '',
        county: '',
        detail: ''
      },
      loading: null,
      tableData: [{
        province: 'Zhejiang ',
        town: 'Zhengzhou ',
        county: 'Qiantang ',
        detail: "318 Poplar Street"
      }]
    }
  },
  created() {
    this.getAllAddress()
  },
  components: { Address },
  methods: {
    setAddress(address) {
      this.addressFrom["province"] = address[0]
      this.addressFrom["town"] = address[1]
      this.addressFrom["county"] = address[2]
    },
    addAddress() {
      if (this.addressFrom.detail.length == 0 || this.addressFrom.province.length == 0) {
        this.$message({
          message: "Please complete the information",
          type: "warning",
        })
        return
      }
      this.openLoading("Adding an address...")
      this.$axios.post("/api/address/add", this.addressFrom)
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.tableData.unshift(this.addressFrom)
            this.addressFrom = {
              province: '',
              town: '',
              county: '',
              detail: ''
            }
          } else {
            this.$message.error(res.data.data.info)

          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("fail to add")
        })
    },
    deleteRow(index, rows) {
      var id = rows[index]._id
      this.openLoading("deleting...")
      this.$axios.delete("/api/address/delete", {
          data: {
            id: id
          }
        })
        .then(res => {
        	this.closeLoading()
          if (res.data.code == 200) {
            rows.splice(index, 1);

          }else{
          	this.$message.error("fail to delete")
          }
        })
        .catch(err=>{
        	this.closeLoading()
        	this.$message.error("fail to delete")
        })
    },
    getAllAddress() {
      this.openLoading("Address information loading...")
      this.$axios.get("/api/address")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.tableData = res.data.data.data
          } else {
            this.$message.error("fail to get")

          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("fail to get")
        })
    },
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
  }
}

</script>
<style scoped="">
#address-manage {
  width: 100%;
  display: flex;
  justify-items: center;
}

#address-manage .left {
  width: 70%;
  margin: 10px;
}

#address-manage .right {
  width: 30%;
  margin: 10px;
}

#address-manage .right span {
  font-size: 18px;
  color: gray;
}

</style>
