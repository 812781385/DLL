<template>
	<div class="login">
		<h1>DLL数据管理平台</h1>
		<el-form 
			:model="ruleForm" 
			status-icon 
			:rules="rules" 
			ref="ruleForm2" 
			label-width="100px" 
			class="loginFrom">
				<el-form-item 
					prop="username">
					<el-input 
						v-model="ruleForm.username" 
						placeholder="用户名"
						auto-complete="off"
						clearable>
						<i class="el-input__icon" slot="prefix"></i>
					</el-input>
		  		</el-form-item>
				<el-form-item 
					prop="password">
					<el-input 
						@keyup.enter.native="submitForm"
						v-model="ruleForm.password" 
						auto-complete="off"
						placeholder="密码"
						type="password"
						clearable>
						<i class="el-input__icon" slot="prefix"></i>
					</el-input>
		  		</el-form-item>
				<el-form-item>
					<el-button 
						type="primary" 
						@click="submitForm">
						登录
					</el-button>
				</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	name: 'login',
	created(){
		
    },
	data() {
		return {
			ruleForm: {
				password: '',
				username: '',
			},
			rules: {
				username: [{
					required: true,
					trigger: 'blur',
					message: '请输入用户名',
				}],
				password: [{
					required: true,
					trigger: 'blur',
					message: '请输入密码',
				}]
			},
		}
	},
	methods: {
		submitForm(){
			let data = this.ruleForm;
			this.axios.post("/login",data)
				.then(res=> {
					if(res.data.code == 200){

						this.$store.dispatch('Login',{
							token: res.data.token,
							userInfo: res.data.userInfo,
						})
						this.$router.push({
                                    path: '/bill'
                                })
						this.$message({
							duration: 1500,
				        	message: res.data.message,
				        	type: 'success'
				        });
					} else {
						this.$message({
							duration: 1500,
				        	message: res.data.message,
				        	type: 'error'
				        });
					}
				})
		},
	}
}
</script>
<style scoped lang="scss">
	.login {
		padding-top: 60px;
		box-sizing: border-box;
		position: fixed;
		width: 831px;
	    height: 415px;
	    background-image:url('../../assets/bg.png');
	    left: 50%;
	    top: 50%;
	    -webkit-transform: translate(-50%, -50%);
	    transform: translate(-50%, -50%);

	    h1 {
			color: #fff;
			width: 440px;
	    }
	    .loginFrom {
			width: 350px;
			margin-top: 60px;
		}
	}
	
</style>