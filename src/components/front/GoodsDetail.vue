<template>
  <div >
    <div id="goods-detail">
      <div class="left">
        <img :src="goods.image" alt="">
        <div class="bottom">
          <span class="like">{{goods.likeTimes}} <i class="el-icon-star-on"></i></span>
          <span class="look">{{goods.lookTimes}} <i class="el-icon-s-opportunity"></i></span>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <span class="logo">Collector's shop</span>
          <span class="name">{{goods.name}}</span>
          <span class="container">Inventory：{{goods.contains}}</span>
        </div>
        <div class="price">
          <div class="title">
            <i class="el-icon-alarm-clock"></i>
            <span class="time">Promotion</span>
          </div>
          <div class="origin">Origin Price：<del>{{goods.originPrice}}RMB</del></div>
          <div class="sell">Sell Price：{{goods.sellPrice}}RMB</div>
        </div>
        <div class="address">
          <div class="produce">Create Address：{{goods.createAddress_id}}</div>
          <div class="send">Send Address：{{goods.sendAddress_id}}</div>
        </div>
        <p class="intro">{{goods.intro}}</p>
        <div class="bottom">
          <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="goods.contains"></el-input-number>
          <span class="court" @click="addCourt">addCourt</span>
        </div>
      </div>
    </div>

      <div>
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
          <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
          <div class="reply-info" >
            <div
              tabindex="0"
              contenteditable="true"
              id="replyInput"
              spellcheck="false"
              placeholder="Enter a comment..."
              class="reply-input"
              @focus="showReplyBtn"
              @input="onDivInput($event)"
            >
            </div>
          </div>
          <div class="reply-btn-box" v-show="btnShow">
            <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">reply</el-button>
          </div>
        </div>
        <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
          <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
          <div class="author-info">
            <span class="author-name">{{item.name}}</span>
            <span class="author-time">{{item.time}}</span>
          </div>
          <div class="icon-btn">
            <span @click="showReplyInput(i,item.name,item.id)"><i class="iconfont el-icon-s-comment"></i>{{item.commentNum}}</span>
            <i class="iconfont el-icon-caret-top"></i>{{item.like}}
          </div>
          <div class="talk-box">
            <p>
              <span class="reply">{{item.comment}}</span>
            </p>
          </div>
          <div class="reply-box">
            <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
              <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
              <div class="author-info">
                <span class="author-name">{{reply.from}}</span>
                <span class="author-time">{{reply.time}}</span>
              </div>
              <div class="icon-btn">
                <span @click="showReplyInput(i,reply.from,reply.id)"><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span>
                <i class="iconfont el-icon-caret-top"></i>{{reply.like}}
              </div>
              <div class="talk-box">
                <p>
                  <span>reply to {{reply.to}}:</span>
                  <span class="reply">{{reply.comment}}</span>
                </p>
              </div>
              <div class="reply-box">

              </div>
            </div>
          </div>
          <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
            <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
            <div class="reply-info" >
              <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="Enter a comment..."   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>
            </div>
            <div class=" reply-btn-box">
              <el-button class="reply-btn" size="medium" @click="sendCommentReply(i,j)" type="primary">reply</el-button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
  name: 'GoodsDetail',
  created() {
    var _id = this.$route.params._id
    this.detail(_id)
  },
  data() {
    return {
      num: 0,
      loading: null,
      goods: {},
      btnShow: false,
      index:'0',
      replyComment:'',
      myName:'Lana',
      myHeader:'/static/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
      myId:19870621,
      to:'',
      toId:-1,
      comments:[
        {
          name:'Lana',
          id:19870621,
          headImg:'/static/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
          comment:'These shoes are comfortable to wear and can be worn with all types of clothes.',
          time:'2019/9/16 18:43',
          commentNum:2,
          like:15,
          inputShow:false,
          reply:[
            {
              from:'Taylor',
              fromId:19891221,
              fromHeadImg:'/static/H94c78935ffa64e7e977544d19ecebf06L.jpg',
              to:'Lana',
              toId:19870621,
              comment:'I couldn\'t agree more.',
              time:'2019/9/16 18:43',
              commentNum:1,
              like:15,
              inputShow:false
            },
            {
              from:'Ariana',
              fromId:1123,
              fromHeadImg:'/static/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
              to:'Lana',
              toId:19870621,
              comment:'I don\'t think it goes well with dresses.',
              time:'2019/9/16 18:43',
              commentNum:0,
              like:5,
              inputShow:false

            }
          ]
        },
        {
          name:'Taylor',
          id:19891221,
          headImg:'/static/H94c78935ffa64e7e977544d19ecebf06L.jpg',
          comment:'I wore them for a while and found the quality of these shoes was not good.',
          time:'2019/9/16 18:43',
          commentNum:1,
          like:5,
          inputShow:false,
          reply:[
            {
              from:'Lana',
              fromId:19870621,
              fromHeadImg:'/static/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
              to:'Taylor',
              toId:19891221,
              comment:'I also think the shoes are of bad quality. They broke after I wore them for a week!',
              time:'2019/9/16 18:43',
              commentNum:25,
              like:5,
              inputShow:false

            }
          ]
        },
        {
          name:'Tina',
          id:20190830,
          headImg:'/static/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
          comment:'These shoes are great! I like them very much!!!',
          time:'2019/9/16 18:43',
          commentNum:0,
          like:5,
          inputShow:false,
          reply:[]
        },
      ]

    }
  },
  directives: {clickoutside},
  methods: {
    inputFocus(){
      var replyInput = document.getElementById('replyInput');
      replyInput.style.padding= "8px 8px"
      replyInput.style.border ="2px solid blue"
      replyInput.focus()
    },
    showReplyBtn(){
      this.btnShow = true
    },
    hideReplyBtn(){
      this.btnShow = false
      replyInput.style.padding= "10px"
      replyInput.style.border ="none"
    },
    showReplyInput(i,name,id){
      this.comments[this.index].inputShow = false
      this.index =i
      this.comments[i].inputShow = true
      this.to = name
      this.toId = id
    },
    _inputShow(i){
      return this.comments[i].inputShow
    },
    sendComment(){
      if(!this.replyComment){
        this.$message({
          showClose: true,
          type:'warning',
          message:'Comments cannot be empty'
        })
      }else{
        let a ={}
        let input =  document.getElementById('replyInput')
        let timeNow = new Date().getTime();
        let time= this.dateStr(timeNow);
        a.name= this.myName
        a.comment =this.replyComment
        a.headImg = this.myHeader
        a.time = time
        a.commentNum = 0
        a.like = 0
        this.comments.push(a)
        this.replyComment = ''
        input.innerHTML = '';

      }
    },
    sendCommentReply(i,j){
      if(!this.replyComment){
        this.$message({
          showClose: true,
          type:'warning',
          message:'Comments cannot be empty'
        })
      }else{
        let a ={}
        let timeNow = new Date().getTime();
        let time= this.dateStr(timeNow);
        a.from= this.myName
        a.to = this.to
        a.fromHeadImg = this.myHeader
        a.comment =this.replyComment
        a.time = time
        a.commentNum = 0
        a.like = 0
        this.comments[i].reply.push(a)
        this.replyComment = ''
        document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
      }
    },
    onDivInput: function(e) {
      this.replyComment = e.target.innerHTML;
    },
    dateStr(date){
      //获取js 时间戳
      var time=new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time=parseInt((time-date)/1000);
      //存储转换值
      var s;
      if(time<60*10){//十分钟内
        return '刚刚';
      }else if((time<60*60)&&(time>=60*10)){
        //超过十分钟少于1小时
        s = Math.floor(time/60);
        return  s+"分钟前";
      }else if((time<60*60*24)&&(time>=60*60)){
        //超过1小时少于24小时
        s = Math.floor(time/60/60);
        return  s+"小时前";
      }else if((time<60*60*24*30)&&(time>=60*60*24)){
        //超过1天少于30天内
        s = Math.floor(time/60/60/24);
        return s+"天前";
      }else{
        //超过30天ddd
        var date= new Date(parseInt(date));
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      }
    },


    addCourt() {
      this.openLoading("adding...")
      this.$axios.post("/api/add/goods/2/court", { goodsId: this.goods._id })
        .then(res => {
          this.closeLoading()
          if (res.data.code == 200) {
            this.$message({
              message: "add successful",
              type: "success"
            })
          } else {
            this.$message({
              message: res.data.data.info,
              type: "warning"
            })
            this.$router.push("/login")
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
    detail(_id) {
      this.openLoading()
      this.$axios.get("/api/goods/detail/" + _id)
        .then(res => {
          console.log(res.data)
          this.closeLoading()
          if (res.data.code == 200) {
            this.goods = res.data.data
          }
        })
        .catch(err => {
          this.closeLoading()
        })
    },
    handleChange(value) {
      console.log(value);
    }
  }
}

</script>
<style scoped>
#goods-detail .left img {
  width: 100%;
  height: 256px;
}

#goods-detail {
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
}

#goods-detail .left {
  width: 30%;
}

#goods-detail .right {
  width: 50%;
}

#goods-detail .left .bottom {
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 19px;
}

#goods-detail .right .top .logo {
  background-color: darkred;
  font-size: 15px;
  color: white;
  border-radius: 5px;
  padding: 4px;
}

#goods-detail .right .price {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 0, 0.1);
  height: 70px;
  border-radius: 5px;
  font-size: 15px;
  line-height: 25px;
  padding: 5px;
  color: gray;
}

#goods-detail .right .address {
  margin-top: 10px;
  height: 50px;
  color: gray;
  padding: 5px;
  font-size: 15px;
  line-height: 25px;
}

#goods-detail .right .intro {
  font-size: 15px;
  margin-top: 20px;
  padding: 5px;

}

#goods-detail .right .bottom .court {
  color: white;
  font-size: 15px;
  background-color: #df3033;
  border-radius: 10px;
  padding: 5px;
  margin-left: 20px;
  cursor: pointer;
}

</style>


<style lang="stylus" scoped>
.my-reply
  padding 10px
  background-color #fafbfc
  .header-img
    display inline-block
    vertical-align top
  .reply-info
    display inline-block
    margin-left 5px
    width 90%
    @media screen and (max-width:1200px) {
      width 80%
    }
    .reply-input
      min-height 20px
      line-height 22px
      padding 10px 10px
      color #ccc
      background-color #fff
      border-radius 5px
      &:empty:before
        content attr(placeholder)
      &:focus:before
        content none
      &:focus
        padding 8px 8px
        border 2px solid blue
        box-shadow none
        outline none
  .reply-btn-box
    height 25px
    margin 10px 0
    .reply-btn
      position relative
      float right
      margin-right 15px
.my-comment-reply
  margin-left 50px
  .reply-input
    width flex
.author-title:not(:last-child)
  border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
  padding 10px
  .header-img
    display inline-block
    vertical-align top
  .author-info
    display inline-block
    margin-left 5px
    width 60%
    height 40px
    line-height 20px
    >span
      display block
      cursor pointer
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .author-name
      color #000
      font-size 15px
      font-weight bold
    .author-time
      font-size 14px
  .icon-btn
    width 30%
    padding 0 !important
    float right
    @media screen and (max-width : 1200px){
      width 20%
      padding 7px
    }
    >span
      cursor pointer
    .iconfont
      margin 0 5px
  .talk-box
    margin 0 50px
    >p
      margin 0
    .reply
      font-size 16px
      color #000
  .reply-box
    margin 10px 0 0 50px
    background-color #efefef
</style>
