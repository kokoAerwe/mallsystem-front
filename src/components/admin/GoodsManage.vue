<template>
  <div id="goods-manage">
    <div class="left">
      <!-- 商品展示开始 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="product name:">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="inventory:">
                <span>{{ props.row.contains }}</span>
              </el-form-item>
              <el-form-item label="product ID:">
                <span>{{ props.row._id }}</span>
              </el-form-item>
              <el-form-item label="buytimes:">
                <span>{{ props.row.buyTimes }}</span>
              </el-form-item>
              <el-form-item label="goodstype:">
                <span>{{ props.row.goodsType_id }}</span>
              </el-form-item>
              <el-form-item label="origin price:">
                <span>{{ props.row.originPrice }}</span>
              </el-form-item>
              <el-form-item label="sell price:">
                <span>{{ props.row.sellPrice }}</span>
              </el-form-item>
              <el-form-item label="production address:">
                <span>{{ props.row.createAddress_id }}</span>
              </el-form-item>
              <el-form-item label="ship address:">
                <span>{{ props.row.sendAddress_id }}</span>
              </el-form-item>
              <el-form-item label="production time:">
                <span>{{ props.row.produceTime }}</span>
              </el-form-item>
              <el-form-item label="expiration time:">
                <span>{{ props.row.expireTime }}</span>
              </el-form-item>
              <el-form-item label="like times:">
                <span>{{ props.row.likeTimes }}</span>
              </el-form-item>
              <el-form-item label="look times:">
                <span>{{ props.row.lookTimes }}</span>
              </el-form-item>
              <el-form-item label="product details:">
                <span>{{ props.row.intro }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="Product ID" prop="_id">
        </el-table-column>
        <el-table-column label="Name" prop="name">
        </el-table-column>
        <el-table-column label="Details" prop="intro">
        </el-table-column>
        <el-table-column fixed="right" label="Operate" width="200">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="goDelete(scope.row)">delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 商品展示结束 -->
      <!-- 分页开始 -->
      <el-pagination layout="prev, pager, next" @current-change="currentPageChange" :page-size="nums"
                     :total="goodsTotal">
      </el-pagination>
      <span>A total of {{ goodsTotal }} data</span>
      <!-- 分页结束 -->
    </div>
    <el-divider direction="vertical"></el-divider>
    <div class="right">
      <!-- 添加商品表单开始 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-upload action="/api/img/add" list-type="picture-card"
                   :file-list="form.fileList"
                   :limit="1"
                   :on-remove="handleRemove"
                   :on-change="handleChange">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-form-item label="orig price">
          <el-input v-model="form.originPrice"></el-input>
        </el-form-item>
        <el-form-item label="sell price">
          <el-input v-model="form.sellPrice"></el-input>
        </el-form-item>
        <el-form-item label="inventory" prop="contains" :rules="[
      { required: true, message: 'Inventory cannot be empty'},
      { type: 'number', message: 'Inventory must be numerical'}
    ]">
          <el-input v-model.number="form.contains"></el-input>
        </el-form-item>
        <el-form-item label="label">
          <el-select v-model="form.goodsType" placeholder="commodity classification">
            <el-option v-for="(tag,index) of tags" :key="index" :label="tag.name" :value="tag._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="address1">
          <el-select v-model="form.createAddress" placeholder="Select a production address">
            <el-option v-for="(address,index) of addresses" :key="index"
                       :label="address.province+address.town+address.county+address.detail"
                       :value="address._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="address2">
          <el-select v-model="form.sendAddress" placeholder="Select a shipping address">
            <el-option v-for="(address,index) of addresses" :key="index"
                       :label="address.province+address.town+address.county+address.detail"
                       :value="address._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="validity">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="product date" v-model="form.produceTime"
                            format="yyyy . MM . dd ."
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="expiration date" v-model="form.expireTime"
                            format="yyyy . MM . dd ."
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="immediate delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="details">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGoods">add</el-button>
        </el-form-item>
      </el-form>
      <!-- 添加商品表单结束 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsManage',
  created() {
    this.getAllTags()
    this.getAllAddress()
    this.getGoodsTotal()
    this.getPageData(1)

  },
  data() {
    return {
      addresses: [],
      tags: [],
      nums: 15,
      goodsTotal: 0,
      form: {
        intro: '',
        sellPrice: null,
        originPrice: null,
        contains: null,
        expireTime: '',
        produceTime: '',
        sendAddress: null,
        createAddress: null,
        goodsType: null,
        name: '',
        fileList:  []

      },
      tableData: []
    }
  },
  methods: {
    goDelete(row){
      var id = row._id
      this.openLoading("deleting...")
      this.$axios.delete("/api/goods/delete",{data:{
          id:id
        }})
        .then(res=>{
          this.closeLoading()
          console.log(res)
          if(res.data.code == 200){
            this.getAllTags()
            this.getAllAddress()
            this.getGoodsTotal()
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.fileList = fileList;
    },
    handleChange(file, fileList) {
      this.form.fileList = fileList;
    },
    // 获取商品总数
    getGoodsTotal() {
      this.$axios.get("/api/goods")
        .then(res => {
          if (res.data.code == 200) {
            this.goodsTotal = res.data.data.nums
          }
        })
        .catch(err => {

        })
    },
    // 获取某页的数据 @pageNum 第几页
    getPageData(pageNum) {
      console.log("zhongguo ")
      this.openLoading("data is loading...")
      this.$axios.post("/api/goods", {
        start: (pageNum - 1) + 1,
        nums: this.nums
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
    getAllTags() {
      this.openLoading("data is loading...")
      this.$axios.get("/api/goods/type")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.tags = res.data.data.data
          }
        })
        .catch(err => {
          this.closeLoading()
        })
    },
    getAllAddress() {
      this.openLoading("address is loading...")
      this.$axios.get("/api/address")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.addresses = res.data.data.data
          }
        })
        .catch(err => {
          this.closeLoading()
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
    currentPageChange(pageNum) {
      this.getPageData(pageNum)
    },
    formatDate(date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      return year + (month < 10 ? "-0" : "-") + month + (day < 10 ? "-0" : "-") + day
    },
    addGoods() {
      // var formData = new FormData()
      // for (var key in this.form) {
      //   if (key == "expireTime" || key == "produceTime") {
      //     this.form[key] = this.formatDate(this.form[key])
      //   }
      //   formData.append(key, this.form[key])
      // }
      // formData.append("fileList", this.fileList)
      this.openLoading("goods is adding...")
      this.$axios.post("/api/goods/add", this.form)
        .then(res => {
          this.closeLoading()
          console.log(res)
          if (res.data.code == 200) {
            this.form = {
              intro: '',
              sellPrice: null,
              originPrice: null,
              contains: null,
              expireTime: '',
              produceTime: '',
              sendAddress: null,
              createAddress: null,
              goodsType: null,
              name: '',
              fileList: []

            }
          } else {
            this.form.expireTime = null
            this.form.produceTime = null
          }
        })
        .catch(err => {
          this.closeLoading()
          this.form.expireTime = null
          this.form.produceTime = null
          console.log(err)
        })
    }
  }
}

</script>
<style scoped>
#goods-manage {
  width: 100%;
  display: flex;
  justify-items: center;
}

#goods-manage .left {
  width: 50%;
  margin: 20px;
}

#goods-manage .right {
  width: 50%;
  margin: 20px;
}

#goods-manage .demo-table-expand {
  font-size: 0;
}

#goods-manage .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

#goods-manage .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
