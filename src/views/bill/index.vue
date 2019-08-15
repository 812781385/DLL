<template>
	<div id="bill">
		<!-- 功能按钮 -->
		<div class="gongneng">
    		<el-input
			    placeholder="请输入姓名或电话进行查询"
			    prefix-icon="el-icon-search"
			    v-model="search_value"
			    @change="changeValue"
			    clearable>
			</el-input> 
			<div class="gongneng-right">
				<el-button 
					icon="el-icon-circle-plus-outline"
					@click="addData" 
					type="primary">新增
				</el-button>
				<el-button 
					:disabled="selectionItem.length<1"
					icon="el-icon-delete"
					@click="deleteData" 
					type="primary">删除
				</el-button>
				<el-button 
					:disabled="selectionItem.length<1"
					icon="el-icon-upload2"
					@click="importListFN"
					type="primary">&nbsp;导入
				</el-button>
				<el-button 
					:disabled="selectionItem.length<1"
					icon="el-icon-download"
					@click="exportListFN"
					type="primary">&nbsp;导出
				</el-button>
			</div>
    	</div>
		<el-table
			:row-class-name="tableRowClassName"
			@selection-change="selectionChange"
			@cell-dblclick="handleCellClick"
			style="width: 100%"
			size="mini"
			:data="tableData"
			class="tb-edit"
			border>
			<el-table-column
				type="selection"
				width="55"
				fixed>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				align="center"
				prop="username"
				label="姓名">
				<template slot-scope="{row,$index}">
					<div class="input-box">
						<el-input 
							type="textarea"
							class="textarea-input"
							v-if="row.usernameflag" 
							@blur="handleInputBlur(row, 'username')" 
							v-model="row.username">
						</el-input>
						<span v-else>{{row.username}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				width="130"
				align="center"
				prop="phone"
				label="电话">
				<template slot-scope="{row,$index}">
					<div class="input-box">
						<el-input 
							type="textarea"
							v-if="row.phoneflag" 
							@blur="handleInputBlur(row, 'phone')" 
							v-model="row.phone">
						</el-input>
						<span v-else>{{row.phone}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				align="center"
				prop="taxRate"
				label="税率">
				<template slot-scope="{row,$index}">
					<div class="input-box">
						<el-input 
							type="textarea"
							v-if="row.taxRateflag" 
							@blur="handleInputBlur(row, 'taxRate')" 
							v-model="row.taxRate">
						</el-input>
						<span v-else>{{row.taxRate}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="unitSourcePrice"
				align="center"
				label="单价">
				<template slot-scope="{row,$index}">
					<div class="input-box">
						<el-input 
							type="textarea"
							v-if="row.unitSourcePriceflag" 
							@blur="handleInputBlur(row, 'unitSourcePrice')" 
							v-model="row.unitSourcePrice">
						</el-input>
						<span v-else>{{row.unitSourcePrice}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="quantity"
				align="center"
				label="数量">
				<template slot-scope="{row,$index}">
					<div class="input-box">
						<el-input 
							type="textarea"
							v-if="row.quantityflag" 
							@blur="handleInputBlur(row, 'quantity')" 
							v-model="row.quantity">
						</el-input>
						<span v-else>{{row.quantity}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="AmountIncludeTax"
				align="center"
				label="含税金额"
				disabled>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				min-width="110"
				prop="AmountWithoutTax"
				align="center"
				label="不含税金额"
				disabled>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="TaxAmount"
				align="center"
				label="税额"
				disabled>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="ispay"
				align="center"
				label="付款状态">
				<template slot-scope="{row,$index}">
					<div class="input-box">
						<el-input 
							type="textarea"
							v-if="row.ispayflag" 
							@blur="handleInputBlur(row, 'ispay')" 
							v-model="row.ispay">
						</el-input>
						<span v-else>{{row.ispay}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				prop="payment"
				align="center"
				label="付款方式">
				<template slot-scope="{row,$index}">
					<div class="input-box">
						<el-input 
							type="textarea"
							v-if="row.paymentflag" 
							@blur="handleInputBlur(row, 'payment')" 
							v-model="row.payment">
						</el-input>
						<span v-else>{{row.payment}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				min-width="110"
				prop="createdAt"
				align="center"
				label="创建日期"
				disabled>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				min-width="110"
				prop="updatedAt"
				align="center"
				label="上次更新日期"
				disabled>
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
			selectionItem: [],
		}
	},
	methods: {
		// 选择
		selectionChange(arr){
			let newarr = [];
			arr.map(item=> {
				newarr.push({
					objectId:item.objectId
				})
			})
			this.selectionItem = newarr;
		},
		// 删除
		deleteData(){
			console.log(this.selectionItem);
			this.axios.post("/delete",{
				objectIds: this.selectionItem,
			})
				.then(res => {
					console.log(res);
					if(res.data.status !== 200){
						this.$message({
							message:'删除失败',
							type:'error',
							duration: 1500,
						});
						this.initData();
					} else {
						this.$message({
							duration: 1500,
				        	message: '删除成功',
				        	type: 'success'
				        });
				        this.initData();
					}
				})
		},
		// 点击一行
		handleCellClick(row, column, cell, event){
			let key = column.property;
			row[key+'flag'] = true;
			setTimeout(()=>{
				document.querySelector('.el-textarea__inner').focus();
			}, 100);
			
		},
		// 失去焦点
		handleInputBlur(row, key){
			row[key+'flag'] = false;
			this.axios.post("/update",{
				key,
				objectId: row.objectId,
				value: row[key],
			})
				.then(res=> {
					console.log(res)
					if(res.data.status !== 200){
						this.$message({
							message:'修改失败',
							type:'error',
							duration: 1500,
						});
						this.initData();
					} else {
						this.$message({
							duration: 1500,
				        	message: '修改成功',
				        	type: 'success'
				        });
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
					let result = res.data.data.package.results.reverse();
					
					result.map(item=>{
						Object.keys(result[0]).map(key=>{
							item[key+'flag'] = false;
						})
					});
					this.tableData = result;
					console.log(this.tableData)
				})
		},
		// 新增
		addData(){
			this.axios.post("/add")
				.then(res=> {
					if(res.data.status !== 201){
						this.$message({
							duration: 1500,
				        	message: '添加失败',
				        	type: 'error'
				        });
					} else {
						this.$message({
							duration: 1500,
				        	message: '添加成功',
				        	type: 'success'
				        });
						this.initData();
						this.search_value ='';
					}
					// let len = arr.length;
					// this.editable = new Array(len);
				})
		},
		
		// 批量导入
		importListFN(){

		},
		// 批量导出
		exportListFN(){
			let userlist = this.selectionItem;
			console.log(userlist)
			this.axios.post("/exportexcel", {
				userlist,
			})
				.then(res =>{
					console.log(res.data.url)
					let link = document.getElementById('excel.xlsx');
					link.href = res.data.url; 
					link.click();
				})
		},
		// 搜索
		changeValue(value){
			if (value === "") {
				this.initData();
			}else {
				this.axios.post("/query",{
					value,
				})
					.then(res=> {
						console.log(res);
						let arr = this.tableData = res.data.package.results.reverse();
						let len = arr.length;
						this.editable = new Array(len);
					})
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
		align: center;

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
	.input-box {
		min-height:20px;
	}
	.textarea-input {
		position: absolute;
		min-width: 100px;
		left: 0;
		top: 0;
		z-index: 99999999;
	}
</style>
