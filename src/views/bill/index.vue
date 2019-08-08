<template>
	<div id="bill">
		<!-- 功能按钮 -->
		<div class="gongneng">
    		<el-input
			    placeholder="请输入关键字进行查询"
			    prefix-icon="el-icon-search"
			    v-model="search_value"
			    @change="changeValue"
			    clearable>
			</el-input> 
			<div class="gongneng-right">
				<el-button 
					icon="el-icon-circle-plus-outline"
					@click="addData" 
					type="primary" 
					plain>新增
				</el-button>
				<el-button 
					style="font-size:12px;"
					class="iconfont i-png icon-daoru21"
					@click="importListFN"
					type="primary"
					plain>&nbsp;导入
				</el-button>
				<el-button 
					style="font-size:12px;"
					class="iconfont i-png icon-daochu"
					@click="exportListFN"
					type="primary"
					plain>&nbsp;导出
				</el-button>
			</div>
    	</div>
		<el-table
			:row-class-name="tableRowClassName"
			style="width: 100%"
			:data="tableData"
			class="tb-edit"
			border>
			<el-table-column
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column
				prop="username"
				label="姓名">
				<template slot-scope="{row,$index}">
					<div @dblclick="handleCellClick($index)" class="input-box">
						<el-input 
							v-if="editable[$index]" 
							@blur="handleInputBlur($index, row, 'username')" 
							v-model="row.username">
						</el-input>
						<span v-else>{{row.username}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="phone"
				label="电话">
				<template slot-scope="{row,$index}">
					<div @dblclick="handleCellClick($index)" class="input-box">
						<el-input 
							v-if="editable[$index]" 
							@blur="handleInputBlur($index, row, 'phone')" 
							v-model="row.phone">
						</el-input>
						<span v-else>{{row.phone}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="taxRate"
				label="税率">
				<template slot-scope="{row,$index}">
					<div @dblclick="handleCellClick($index)" class="input-box">
						<el-input 
							v-if="editable[$index]" 
							@blur="handleInputBlur($index, row, 'taxRate')" 
							v-model="row.taxRate">
						</el-input>
						<span v-else>{{row.taxRate}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="unitSourcePrice"
				label="单价">
				<template slot-scope="{row,$index}">
					<div @dblclick="handleCellClick($index)" class="input-box">
						<el-input 
							v-if="editable[$index]" 
							@blur="handleInputBlur($index, row, 'unitSourcePrice')" 
							v-model="row.unitSourcePrice">
						</el-input>
						<span v-else>{{row.unitSourcePrice}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="quantity"
				label="数量">
				<template slot-scope="{row,$index}">
					<div @dblclick="handleCellClick($index)" class="input-box">
						<el-input 
							v-if="editable[$index]" 
							@blur="handleInputBlur($index, row, 'quantity')" 
							v-model="row.quantity">
						</el-input>
						<span v-else>{{row.quantity}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="AmountIncludeTax"
				label="含税金额">
			</el-table-column>
			<el-table-column
				prop="AmountWithoutTax"
				label="不含税金额">
			</el-table-column>
			<el-table-column
				prop="TaxAmount"
				label="税额">
			</el-table-column>
			<el-table-column
				prop="ispay"
				label="付款状态">
				<template slot-scope="{row,$index}">
					<div @dblclick="handleCellClick($index)" class="input-box">
						<el-input 
							v-if="editable[$index]" 
							@blur="handleInputBlur($index, row, 'ispay')" 
							v-model="row.ispay">
						</el-input>
						<span v-else>{{row.ispay}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="payment"
				label="付款方式">
				<template slot-scope="{row,$index}">
					<div @dblclick="handleCellClick($index)" class="input-box">
						<el-input 
							v-if="editable[$index]" 
							@blur="handleInputBlur($index, row, 'payment')" 
							v-model="row.payment">
						</el-input>
						<span v-else>{{row.payment.payment}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="createdAt"
				label="创建日期">
			</el-table-column>
			<el-table-column
				prop="updatedAt"
				label="上次更新日期">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
	name: 'bill',
	components: {
		// HelloWorld
	},
	created(){
		this.initData();
    },
	data() {
		return {
			editable: [],
			tableData: [],
			search_value: '',
			addDataDialog: false,
			add_data_template: initDataTemplate(),
			rules: {
				username: [{ 
					required: true, 
					message: '请输入名称', 
					trigger: 'blur', 
				}, { 
					min: 2, 
					max: 8, 
					message: '长度在 2 到 8 个字符', 
					trigger: 'blur',
				}],
				phone: [{
					required: true,
					message: '请输入手机号',
					trigger: 'blur',
				}, {
					min: 11,
					max: 11,
					message: '长度为11个字符',
					trigger: 'blur',
				}],
				unitSourcePrice: [{
					required: true,
					message: '请输入单价',
					trigger: 'blur',
				}],
				taxRate: [{
					required: true,
					message: '请输税率',
					trigger: 'blur',
				}],
				quantity: [{
					required: true,
					message: '请输数量',
					trigger: 'blur',
				}],
	          	ispay: [{ 
	          		required: true, 
	          		message: '请选择付款状态', 
	          		trigger: 'change',
	          	}],
	        },
		}
	},
	methods: {
		// 点击一行
		handleCellClick(index){
			console.log(index)
			this.editable[index] = true;
			this.$set(this.editable,index,true);
		},
		// 失去焦点
		handleInputBlur(index, row, key){
			this.editable[index] = false;
			this.$set(this.editable,index,false);

			this.axios.post("/update",{
				key,
				objectId: row.objectId,
				value: row[key],
			})
				.then(res=> {
					console.log(res)
					if(res.data.data.statusText !== 'ok'){
						this.$message({
							message: '修改失败',
							type: 'error',
							center: true
						});
						this.initData();
					}
				})
		},
		// 计算公式
		computeFN(){

		},
		// 付款状态显示颜色
		tableRowClassName({row}) {
			if (row.ispay === '未付') {
				return 'danger-row';
			}
		},
		// 初始化数据
		initData(){
			this.axios.get("/lists")
				.then(res=> {
					let arr = this.tableData = res.data.data.package.results;
					let len = arr.length;
					this.editable = new Array(len);
				})
		},
		// 新增
		addData(){
			this.axios.post("/add")
				.then(res=> {
					if(res.data.data.status !== 201){
						this.$message({
							message: '添加失败',
							type: 'error',
							center: true
						});
					}
					console.log(arr)
					// let len = arr.length;
					// this.editable = new Array(len);
				})
		},
		
		// 批量导入
		importListFN(){

		},
		// 批量导出
		exportListFN(){

		},
		// 搜索
		changeValue(value){
			if (value === "") {
				this.initData();
			}else {
				// this.axios.get(`/lists?where={"$or":[
				// 	{"username":"${value}"},
				// 	{"phone":"${value}"},
				// 	{"taxRate":"${value}"},
				// 	{"unitSourcePrice":"${value}"},
				// 	{"quantity":"${value}"},
				// 	{"AmountIncludeTax":"${value}"},
				// 	{"AmountWithoutTax":"${value}"},
				// 	{"TaxAmount":"${value}"},
				// 	{"ispay":"${value}"},
				// 	{"payment":"${value}"}]}`)
				// 	.then(res=> {
				// 		let arr = this.tableData = res.data.results;
				// 		let len = arr.length;
				// 		this.editable = new Array(len);
				// })
			}
		},
	}
}
function initDataTemplate(){
	return {
		username: '',
		phone: '',
		ispay: '',
		AmountWithoutTax: '',
		AmountIncludeTax: '',
		payment: '',
		unitSourcePrice: '',
		taxRate: '',
		TaxAmount: '',
		quantity: '',
	}
}
</script>

<style scoped lang="scss">
	#bill {
        padding: 20px;
		.add-data {
		}
		.box {
			width: 100%;
			height: 100%;
		}
	}
	.gongneng .el-input .el-input__icon {
		// line-height: 28px!important;
	}
</style>
