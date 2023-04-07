<template>
  <div id="balance">
  	<div class="balance">Current Balance：{{balance}}</div>
  	<div><el-input v-model.number="money" placeholder="Please enter the amount to be charged to your account"></el-input></div>

    <div class="pay-type-list">
      <div class="pay-type-item">
        <input type="radio" name="type" value="微信支付" checked>
        <img  src="/static/weixin.png" alt>
        <span>WeChat</span>
      </div>
      <div class="pay-type-item">
        <input type="radio" name="type" value="支付宝支付">
        <img src="/static/zhifubao.png" alt>
        <span>Alipay</span>
      </div>
      <div class="pay-type-item">
        <input type="radio" name="type" value="建设银行">
        <img style="width: 120px;height: 60px;" src="/static/jianshe.png" alt>
      </div>
      <div class="pay-type-item">
        <input type="radio" name="type" value="农业银行">
        <img style="width: 120px;height: 60px;" src="/static/nongye.png" alt>
      </div>
      <div class="pay-type-item">
        <input type="radio" name="type" value="中国银行">
        <img style="width: 120px;height: 60px;" src="/static/zhongguo.png" alt>
      </div>
      <div class="pay-type-item">
        <input type="radio" name="type" value="交通银行">
        <img style="width: 120px;height: 60px;" src="/static/jiaotong.png" alt>
      </div>
    </div>

    <div><el-button type="primary" @click="topUp">submit</el-button></div>
  </div>
</template>
<script>
export default {
  name: 'Balance',
  created() {
  	this.getBalance()
  },
  data() {
    return {
      loading: null,
      balance:0,
      money:0
    }
  },
  methods: {
  	topUp(){
  		this.openLoading("Recharge in progress...")
  		this.$axios.post("/api/balance",{balance:this.money})
  		.then(res=>{
  			this.closeLoading()
  			if(res.data.code==200){
  				this.$message({
  					message:"be recharged successfully",
  					type:"success"
  				})
  				this.balance = this.balance + this.money
  				this.money = 0
  			}else{
  				this.$message({
  					message:res.data.data.info,
  					type:"warning"
  				})
  			}
  		})
  		.catch(err=>{
  			this.closeLoading()
  		})
  	},
    getBalance() {
      this.openLoading()
      this.$axios.get("/api/self")
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.balance = res.data.data.balance
          }
        })
        .catch(err => {
          this.closeLoading()
        })
    },
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
  }
}

</script>
<style scoped>
#balance {
  margin: 50px;
}


.pay-type-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.pay-type-item {
  background: #FFFFFF;
  border: 3px dotted #EEEEEE;
  margin: 20px;
  padding: 20px;
  width: 200px;
}

</style>
