<template>
  <div id="court">
    <el-row>
      <el-col :span="8" v-for="(good, index) in goods" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="good.image|imageFliter" class="image">
          <div style="padding: 14px;">
            <span>{{good.name}}</span>
            <div class="bottom clearfix">
              <span>originPrice：<del>{{good.originPrice}}</del></span>
              <span>sellPrice：{{good.sellPrice}}</span>
              <el-button type="text" class="button" @click="removeCourt(good)">remove</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="btn">
      <el-button type="primary" @click="buy">submit</el-button>
    </div>
    <!-- 地址弹出框开始 -->
    <el-dialog width="80%" title="Receiver Address" :visible.sync="dialogFormVisible">
      <el-form :model="addressFrom">
        <span>Please Select an Address：</span>
        <Address @getAddressFromChild="setAddress"></Address>
        <span>
          <el-input v-model="addressFrom.detail" placeholder="detailed address"></el-input>
        </span>
        <span>
          <el-button type="primary" @click="addAddress">add</el-button>
        </span>
        <el-form-item label="Select Address" :label-width="formLabelWidth">
          <el-select v-model="sendAddress" placeholder="select a delivery area">
            <el-option v-for="(a,index) of address" :key="index" :label="a.province+a.town+a.county+a.detail" :value="index" ></el-option>

          </el-select>
        </el-form-item>
      </el-form>



      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">cancel</el-button>
        <el-button type="primary" @click="realBuy">submit</el-button>
      </div>
    </el-dialog>
    <!-- 地址弹出框结束 -->
  </div>
</template>
<script>
import Address from "../utils/Address.vue"

export default {
  name: 'Court',
  components: { Address },

  created() {
    this.initGoodsList()

  },
  data() {
    return {
      sendAddress:null,
      formLabelWidth: "120px",
      loading: null,
      goods: [],
      address: [],
      dialogFormVisible: false,
      addressFrom:{
        province: '',
        town: '',
        county: '',
        detail: ''
      }
    }
  },
  methods: {
    addAddress() {
      if (this.addressFrom.detail.length == 0 || this.addressFrom.province.length == 0) {
        this.$message({
          message: "Please complete the information",
          type: "warning",
        })
        return
      }
      this.openLoading("Adding an address...")
      this.$axios.post("/api/self/address/add", this.addressFrom)
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.$message({
              message:"successfully added",
              type:"success"
            })
            this.address.unshift(this.addressFrom)
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
          console.log(err)
          this.closeLoading()
          this.$message.error("fail to add")
        })
    },
    setAddress(address) {
      this.addressFrom["province"] = address[0]
      this.addressFrom["town"] = address[1]
      this.addressFrom["county"] = address[2]
    },
    removeCourt(goods) {
      this.openLoading("removing...")
      this.$axios.post("/api/remove/goods/from/court", { goodsId: goods._id })
        .then(res => {
          this.closeLoading()
          console.log(res)
          if (res.data.code == 200) {
            this.goods.splice(this.goods.indexOf(goods), 1);
          }
        }).catch(err => {
          this.closeLoading()
        })
    },
    buy() {
      this.openLoading()
      this.$axios.get("/api/self/address")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            console.log(res.data.data)
            this.address = res.data.data.address
            this.dialogFormVisible = true
          }
        })
        .catch(err => {
          this.closeLoading()
        })
    },
    realBuy() {
      this.dialogFormVisible = false
      this.openLoading("Submiting the order...")
      var payValue = 0.0
      var goodsList = []
      this.goods.forEach(good => {
        payValue = payValue + good.sellPrice
        goodsList.unshift({
          id: good._id,
          number: 1
        })
      })
      this.$axios.post("/api/buy/goods", {
        payValue: payValue,
        goodsList: goodsList,
        cutoffValue: payValue
      }).then(res => {
        this.closeLoading()
        if (res.data.code == 200) {
          this.$message({
            message: "purchase succeeds！",
            type: "success"
          })
          this.goods = []
        } else {
          this.$message({
            message: res.data.data.info,
            type: "warning"
          })
        }
      }).catch(err => {
        this.closeLoading()
      })
    },
    initGoodsList() {
      this.openLoading()
      this.$axios.get("/api/self/court")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.goods = res.data.data.data
          }
        }).catch(err => {
          this.closeLoading()
        })
    },
    openLoading(text = "data is loading...") {
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
#court {
  margin: 25px;
}

#court .btn {
  float: right;
  margin: 50px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 50%;
  height: 256px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}


</style>
