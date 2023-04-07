<template>
  <div id="personal">
    <el-descriptions title="User Information">
      <el-descriptions-item label="Username">{{ person.name }}</el-descriptions-item>
      <el-descriptions-item label="Age">{{ person.age }}</el-descriptions-item>
      <el-descriptions-item label="Account">{{ person.account }}</el-descriptions-item>
      <el-descriptions-item label="Balance">{{ person.balance }}</el-descriptions-item>
      <el-descriptions-item label="VIP">
        <el-tag size="small">{{ person.vip }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Delivery Address">1188 Wuzhong Dadao, Wuzhong District, Suzhou City, Jiangsu
        Province
      </el-descriptions-item>
    </el-descriptions>

    <el-button type="primary" @click="goOpen">Modify</el-button>

    <el-dialog
      title="Modify Personal Information"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form>
        <el-form-item label="Name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <el-button @click="dialogVisible = false">cancel</el-button>
      <el-button type="primary" @click="goSave">submit</el-button>
<!--      </span>-->
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: 'Personal',
  created() {
    this.getPersonal()
  },
  data() {
    return {
      loading: null,
      person: {},
      form: {
        name: "",
        age: ""
      },
      dialogVisible: false
    }
  },
  methods: {
    goOpen() {
      this.form.name = this.person.name;
      this.form.age = this.person.age;
      this.dialogVisible = true
    },
    goSave() {
      this.$axios.post("/api/user/update",{
        id:this.person._id,
        name:this.form.name,
        age:this.form.age,
      })
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.getPersonal()
          }
        })
        .catch(err => {
        })
    },
    getPersonal() {
      this.openLoading()
      this.$axios.get("/api/self")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.person = res.data.data
          }
        })
        .catch(err => {
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
<style scoped>
#personal {
  margin: 50px;
}
</style>
