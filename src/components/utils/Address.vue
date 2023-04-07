<template>
  <div id="address">
    <div class="block">
      <el-cascader v-model="address" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Address',
  data() {
    return {
    	address:[],
    	options:[
    	{
    		value:"Zhejiang ",
    		label:"Zhejiang ",
    		children:[
    			{
    				value:"Zhengzhou ",
    				label:"Zhengzhou ",
    				children:[
    					{
    						value:"Qiantang ",
    						label:"Qiantang ",

    					},
              {
    						value:"Zhongyuan",
    						label:"Zhongyuan ",

    					},
              {
    						value:"Jinshui",
    						label:"Jinshui ",

    					},
              {
    						value:"Erqi",
    						label:"Erqi ",

    					},
              {
    						value:"Shangjie",
    						label:"Shangjie ",

    					}
    				]
    			},
          	{
    				value:"Wenzhou ",
    				label:"Wenzhou ",
    				children:[
    					{
    						value:"Whale Head Village ",
    						label:"Whale Head Village",

    					},
              {
    						value:"Caowan Mountain",
    						label:"Caowan Mountain ",

    					}
    				]
    			},
          	{
    				value:"Ningbo ",
    				label:"Ningbo",
    				children:[
    					{
    						value:"Jiangbei ",
    						label:"Jiangbei",

    					},
              {
    						value:"Zhenghai",
    						label:"Zhenghai",

    					}
    				]
    			},
          	{
    				value:"Zhoushan ",
    				label:"Zhoushan",
    				children:[
    					{
    						value:"Daishan ",
    						label:"Daishan",

    					},
              {
    						value:"Dinghai",
    						label:"Dinghai",

    					}
    				]
    			},
          	{
    				value:"Lishui ",
    				label:"Lishui",
    				children:[
    					{
    						value:"Qintian ",
    						label:"Qintian",

    					},
              {
    						value:"Longquan",
    						label:"Longquan",

    					}
    				]
    			}
    		]
    	},
        {
          value:"Sichuan ",
          label:"Sichuan ",
          children:[
            {
              value:"Chengdu ",
              label:"Chengdu ",
              children:[
                {
                  value:"Qinyang ",
                  label:"Qinyang ",

                }
              ]
            }
          ]
        },
         {
          value:"Hubei ",
          label:"Hubei ",
          children:[
            {
              value:"Wuhan",
              label:"Wuhan ",
              children:[
                {
                  value:"Jiangxia ",
                  label:"Jiangxia ",
                }
              ]
            }
          ]
        },
                 {
          value:"Hunan ",
          label:"Hunan ",
          children:[
            {
              value:"Changsha",
              label:"Changsha",
              children:[
                {
                  value:"Juzizhou ",
                  label:"Juzizhou ",
                }
              ]
            }
          ]
        },
        {
          value:"Guangdong ",
          label:"Guangdong",
          children:[
            {
              value:"Shenzhen",
              label:"Shenzhen",
              children:[
                {
                  value:"Nanshan ",
                  label:"Nanshan ",
                }
              ]
            }
          ]
        }



    	]
    }
  },
  methods: {
    handleChange(value) {
      this.$emit("getAddressFromChild",value)
    }
  }
}

</script>
<style>
</style>
