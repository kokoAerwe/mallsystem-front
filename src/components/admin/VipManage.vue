<template>
  <div id="vip-manage">
    <div class="left">{{vipItems}}
    <div class="left">
      <el-tag v-for="vip in vips" :key="vip.name" closable @close="handleClose(vip)">
        {{vip.name}}
      </el-tag>
    </div></div>
    <div class="right">
      <el-form label-width="80px">
        <el-form-item label="VIP">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="VIP Level">
          <el-input v-model.number="level"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addVip">create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VipManage',
  created() {
    this.getAllVipItems()
  },
  data() {
    return {
      loading: null,
      vips: [],
      name: '',
      level: 0

    }
  },
  methods: {
    addVip() {
      this.openLoading("VIP is adding...")
      this.$axios.post("/api/vip/add", {
        name: this.name,
        level: this.level
      }).then(res => {
        this.closeLoading()
        if (res.data.code == 200) {
        	this.vips.unshift({
              name: this.name,
            })
            this.name = ""
            this.level = 0
          this.$message({
            message: "successfully added",
            type: "success"
          })
        } else {
          this.$message.error(res.data.data.info)
        }
      }).catch(err => {
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
    getAllVipItems() {
      this.openLoading("VIP data is loading...")
      this.$axios.get("/api/vip")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.vips = res.data.data.data
          }
        }).catch(err => {
          this.closeLoading()
        })
    },
    handleClose(vip) {
      this.openLoading("VIP is deleting...")
      this.$axios.delete("/api/vip/delete", {
          data: {
            id: vip._id
          }
        })
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.vips.splice(this.vips.indexOf(vip), 1);

          } else {
            this.$message.error("fail to delete")

          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("fail to delete")

        })
    },
  }
}

</script>
<style scoped>
#vip-manage {
  width: 100%;
  display: flex;
  margin: 10px;
  justify-items: center;
}

#vip-manage .left {
  margin: 5px;
  width: 50%;
}

#vip-manage .right {
  margin: 5px;
  width: 50%;
}

</style>
