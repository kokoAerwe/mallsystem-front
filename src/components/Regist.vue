<template>
  <div id="regist">
    <h1>Sign in</h1>
    <div class="info">
      <div>
        <el-input placeholder="enter your phone number" v-model="account"></el-input>
      </div>
      <div>
        <el-input placeholder="enter your password" v-model="password" show-password></el-input>
      </div>
    </div>
    <div class="btn">
      <el-button style="width:100%;height: 40px;margin-top: 10px;" @click="regist" type="primary">sign in</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Regist',
  data() {
    return {
      account: '',
      password: '',
      loading: null,
    }
  },
  methods: {
    regist() {
      if (!this.account) {
        this.$message({
          message: 'enter your phone number',
          type: 'warning'
        });
        return
      } else if (!this.password) {
        this.$message({
          message: 'enter your password',
          type: 'warning'
        });
        return
      }
      this.openLoading("registering...")
      this.$axios.post("/api/regist", {
          account: this.account,
          password: this.password,
        })
        .then(res => {
          this.closeLoading()
          console.log(res)
          if (res.data.code == 200) {
            this.$router.push("/")
          } else {
            this.$message.error(res.data.data.info)
          }
        })
        .catch(err => {
          this.closeLoading()
          console.log(err)
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
#regist {
  width: 80%;
  height: 100%;
  margin: 100px auto;
}

#regist h1 {
  width: 200px;
  margin: 10px auto;
}

#regist .info {
  width: 60%;
  margin: 0 auto;
}
#regist .btn{
  width: 60%;
  margin: 0 auto;
}

#regist .info input {
  margin-top: 20px;
}

</style>
