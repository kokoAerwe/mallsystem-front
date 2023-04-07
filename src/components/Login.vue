<template>
  <div id="login">
    <h1>Login</h1>
    <div class="info">
      <div>

        <el-input placeholder="enter your account" v-model="account"></el-input>
      </div>
      <div>

        <el-input placeholder="enter your password" v-model="password" show-password></el-input>
      </div>
    </div>
    <div class="tool">
      <div class="type">
        <el-radio v-model="type" label="admin">administrator</el-radio>
        <el-radio v-model="type" label="user">user</el-radio>
      </div>
      <div class="password">
        <el-link @click="gotoRegist" type="primary">sign in</el-link>
        <el-link type="danger">forget your password?</el-link>
      </div>
      <div class="btn">
        <el-button style="width:500px;height: 40px;margin-top: 10px;" @click="login" type="primary">login</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  created() {
    this.isLogin()
  },
  data() {
    return {
      account: '',
      password: '',
      type: "user",
      loading: null,
    }
  },
  methods: {
    isLogin() {
      this.openLoading()
      this.$axios.post("/api/islogin")
        .then(res => {
          console.log(res)
          if (res.data.code == 200) {
            if (res.data.data.type == "admin") {
              this.$router.push("/admin/index")
            } else {
              this.$router.push("/")
            }
          }
          this.closeLoading()
        })
        .catch(err => {
          console.log(err)
          this.closeLoading()
        })
    },
    gotoRegist() {
      this.$router.push("/regist")
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
    login() {
      if (!this.account) {
        this.$message({
          message: 'Please enter your account number',
          type: 'warning'
        });
        return
      } else if (!this.password) {
        this.$message({
          message: 'Please enter your password',
          type: 'warning'
        });
        return
      }
      this.openLoading("Logging in...")
      this.$axios.post("/api/login", { account: this.account, password: this.password, type: this.type })
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            if (this.type == "admin") {
              this.$router.push("/admin/index")
            } else {
              this.$router.push("/")
            }
          } else {
            this.$message.error(res.data.data.info);
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          this.closeLoading()
        })
    }
  }
}

</script>
<style scoped="">
#login {
  width: 80%;
  height: 100%;
  margin: 100px auto;
}

#login h1 {
  width: 200px;
  margin: 10px auto;
}
#login .info {
  width: 60%;
  margin: 0 auto;
}

#login .info input {
  margin-top: 20px;
}
#login .tool{
  width: 50%;
  margin: 10px auto;
}
#login .tool .type{
  display: flex;
  justify-content: space-between;
}
#login .tool .password{
  display: flex;
  justify-content: space-between;
}
#login .tool .btn{
  display: flex;
  justify-content: space-around;
}

</style>
