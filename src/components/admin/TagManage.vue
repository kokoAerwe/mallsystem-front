<template>
  <div id="tag-manage">
    <div class="left">
      <el-tag v-for="tag in tags" :key="tag.name" closable @close="handleClose(tag)">
        {{tag.name}}
      </el-tag>
    </div>
    <el-divider direction="vertical"></el-divider>
    <div class="right">
      <el-form label-width="80px">
        <el-form-item label="tagName">
          <el-input v-model="tagName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTag">create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TagManage',
  created() {
    this.getAllTags()
  },
  data() {
    return {
      tagName: "",
      loading: null,
      tags: []
    }
  },
  methods: {
    getAllTags() {
      this.openLoading("the data is loading...")
      this.$axios.get("/api/goods/type")
        .then(res => {
          this.closeLoading()
          console.log(res.data.data.data)
          if (res.data.code == 200) {
            this.tags = res.data.data.data
          } else {
            this.$message.error("Data load failed")

          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("Data load failed")
        })
    },
    handleClose(tag) {
      this.openLoading("Deleting the label...")
      this.$axios.delete("/api/goods/type/delete", {
          data: {
            id: tag._id
          }
        })
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.tags.splice(this.tags.indexOf(tag), 1);

          } else {
            this.$message.error("delete failed")

          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("delete failed")

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
    addTag() {
      if (this.tagName.length == 0) {
        this.$message({
          message: "The tag is not empty",
          type: "warning"
        })
        return
      }
      this.openLoading("adding...")
      this.$axios.post("/api/goods/type/add", {
          name: this.tagName
        })
        .then(res => {
          this.closeLoading()
          console.log(res)
          if (res.data.code == 200) {
            console.log(this.form)
            this.tags.unshift({
              name: this.tagName,
            })
            this.tagName = ""
          } else {
            this.$message.error(res.data.data.info)
          }
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error("add failed")
          console.log(err)
        })
    }
  }
}

</script>
<style scoped="">
#tag-manage {
  width: 100%;
  display: flex;
  justify-items: center;
  height: 100%;
}

#tag-manage .left {
  width: 50%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}

#tag-manage .left span {
  margin: 5px 5px;
}

#tag-manage .right {
  width: 50%;
  padding: 10px;
  height: 100%;
}

</style>
