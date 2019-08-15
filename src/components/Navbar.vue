<template>
	<div id="navbar">
		<div class="header"> 
			<!-- <h3>DLL系统管理平台</h3> -->
			<div class="user">
				<el-popover
					placement="top-start"
					v-model="visible2"
					trigger="hover"
					ref="popover1"
					width="200">
					<p>安全退出登录？</p>
					<div style="text-align: right; margin:0;">
						<el-button 
							type="text" 
							@click="visible2 = false">
							取消
						</el-button>
						<el-button 
							type="primary" 
							@click="affirm">
							确定
						</el-button>
					</div>
				</el-popover>
				<div class="userImg" v-popover:popover1>
					<img width="100%" :src="imgUri" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Navbar', 
	created(){
		console.log(this.username)
		console.log(this.$store.state.useravatar)
    },
	data() {
		return {
			imgUri: this.$store.state.useravatar,
			username: this.$store.state.username,
			visible2: false,
		}
	},
	methods: {
		affirm(){
			this.visible2 = false;
			this.$store.dispatch('Logout');
			this.$router.push({
				path: '/login'
			});
		}
	}
}
</script>

<style scoped lang="scss">
	#navbar {
		.header{
			background:#F5F5F5;
			width:100%;
			height:52px;
			overflow: hidden;
			border-bottom:1px solid #ccc;

			h3{
				color: #000;
			    line-height: 53px;
			    font-size: 20px;
			    text-align: center;
			    font-family:PingFangSC-Regular;
				font-weight:600;
				margin:auto;
			}
			.user{
				float:right;
				line-height:52px;
				color:#4A4A4A;
				font-size:14px;
				position: absolute;
			    right: 30px;
			    top: 0;
			    overflow: hidden;

			    .userImg{
			    	margin-top:8px;
			    	margin-right:7px;
			    	width: 36px;
			    	height:36px;
			    	border-radius: 50%;
			    	float:left;
			    	overflow: hidden;
			    }
			    .userName{
			    	float:right;
			    	line-height:52px;
			    	font-size:12px;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(85,85,85,1);
			    }
			}
		}
	}
</style>
