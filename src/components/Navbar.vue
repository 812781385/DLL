<template>
	<div id="navbar">
		<div class="header"> 
			<h3>DLL系统管理平台</h3>
			<div class="user">
				<div class="userImg">
					<img width="100%" src="http://image.wangrui8.top/FrMYft_wzjP1ywWfV1m_DzBUnTvJ" alt="">
				</div>
				<!-- <el-popover
					placement="top-start"
					trigger="hover"
					width="98">
					<div class="but-menu">
						<el-button 
							@click="showPersonal"
							size="mini" 
							type="text">
							<i class="iconfont icon-user icon-button"></i>
							&nbsp;个人中心
						</el-button>
						<el-button 
							size="mini" 
							type="text">
							<i class="iconfont icon-poweroff icon-exit"></i>
							&nbsp;退出登录
						</el-button>
					</div>
					<el-button 
						type="text" 
						slot="reference">
						{{user}}<i class="el-icon-caret-bottom"></i>
					</el-button>
				</el-popover> -->
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Navbar', 
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
