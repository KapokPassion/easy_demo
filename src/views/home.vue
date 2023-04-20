<template>
	<div class="container">
		<el-button size="mini" @click="add()" style="cursor: pointer; color: #409eff">Create...
		</el-button>
		<el-button size="mini" @click="recover()" style="cursor: pointer; color: #409eff">Recover
		</el-button>
		<el-table :data="tableData" style="width:90%" border>
			<el-table-column label="ID" prop="id" width="60" align="center">
			</el-table-column>
			<el-table-column label="MEAN_RADIUS" prop="mean_radius" align="center">
				<template slot-scope="scope">
					<span v-show="scope.row.isShow">{{ scope.row.mean_radius }}</span>
					<el-input type="text" :placeholder="scope.row.mean_radius" v-model="scope.row.mean_radius"
						v-show="!scope.row.isShow" />
				</template>
			</el-table-column>
			<el-table-column label="MEAN_TEXTURE" prop="mean_texture" align="center">
				<template slot-scope="scope">
					<span v-show="scope.row.isShow">{{ scope.row.mean_texture }}</span>
					<el-input type="text" :placeholder="scope.row.mean_texture" v-model="scope.row.mean_texture"
						v-show="!scope.row.isShow" />
				</template>
			</el-table-column>
			<el-table-column label="mean_perimeter" prop="mean_perimeter" align="center">
				<template slot-scope="scope">
					<span v-show="scope.row.isShow">{{ scope.row.mean_perimeter }}</span>
					<el-input type="text" :placeholder="scope.row.mean_perimeter" v-model="scope.row.mean_perimeter"
						v-show="!scope.row.isShow" />
				</template>
			</el-table-column>
			<el-table-column label="MEAN_AREA" prop="mean_area" align="center">
				<template slot-scope="scope">
					<span v-show="scope.row.isShow">{{ scope.row.mean_area }}</span>
					<el-input type="text" :placeholder="scope.row.mean_area" v-model="scope.row.mean_area"
						v-show="!scope.row.isShow" />
				</template>
			</el-table-column>
			<el-table-column label="MEAN_SMOOTHNESS" prop="mean_smoothness" align="center">
				<template slot-scope="scope">
					<span v-show="scope.row.isShow">{{ scope.row.mean_smoothness }}</span>
					<el-input type="text" :placeholder="scope.row.mean_smoothness" v-model="scope.row.mean_smoothness"
						v-show="!scope.row.isShow" />
				</template>
			</el-table-column>
			<el-table-column label="DIAGNOSIS" prop="diagnosis" align="center">
				<template slot-scope="scope">
					<span v-show="scope.row.isShow">{{ scope.row.diagnosis }}</span>
					<el-input type="text" :placeholder="scope.row.diagnosis" v-model="scope.row.diagnosis"
						v-show="!scope.row.isShow" />
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template slot-scope="scope">
					<el-button size="mini" @click="edit(scope.row)" v-show="scope.row.isShow">edit
					</el-button>
					<el-button @click="save(scope.row)" type="primary" size="mini" v-show="!scope.row.isShow">save
					</el-button>
					<el-button @click="cancel(scope.$index, scope.row)" size="mini" v-show="!scope.row.isShow">cancel
					</el-button>
					<el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">delete
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button size="mini" @click="add()" style="cursor: pointer; color: #409eff">Create...
		</el-button>
		<div id="end">end</div>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				tableData: [],
				mode: "normal",
				row: null,
				mean_radius: null,
				mean_texture: null,
				mean_perimeter: null,
				mean_area: null,
				mean_smoothness: null,
				diagnosis: null,
			};
		},
		created() {
			this.loadData();
		},
		methods: {
			loadData() {
				const that = this;
				if (1) {
					that.$axios({
							method: 'post',
							url: 'http://' + this.GLOBAL.ip + ':10520/api/data/loaddata',
							data: {
								token: '123',
							}
						})
						.then(res => {
							if (res.data.code == "0") {
								res.data.data.forEach((node) => node.isShow = true);
								that.tableData = res.data.data;
							}
						})
						.catch(err => {
							console.log(err);
						})
				} else {
					
				}
			},
			edit(row) {
				if (this.mode == 'edit') {
					return;
				}
				this.mode = 'edit';
				this.mean_radius = row.mean_radius;
				this.mean_texture = row.mean_texture;
				this.mean_perimeter = row.mean_perimeter;
				this.mean_area = row.mean_area;
				this.mean_smoothness = row.mean_smoothness;
				this.diagnosis = row.diagnosis;
				row.isShow = false;
			},
			cancel(index, row) {
				if (this.mode == 'edit') {
					row.isShow = true;
					row.mean_radius = this.mean_radius;
					row.mean_texture = this.mean_texture;
					row.mean_perimeter = this.mean_perimeter;
					row.mean_area = this.mean_area;
					row.mean_smoothness = this.mean_smoothness;
					row.diagnosis = this.diagnosis;
				} else if (this.mode == 'add') {
					this.tableData.splice(index, 1);
				}
				this.mode = 'normal';
			},
			save(row) {
				this.mode = 'normal';
				row.isShow = true;
				const that = this;
				if (!(parseFloat(row.mean_radius) != NaN && parseFloat(row.mean_texture) != NaN && parseFloat(row.mean_perimeter) != NaN && parseFloat(row.mean_area) != NaN && parseFloat(row.mean_smoothness) != NaN && parseInt(row.id) != NaN && (row.diagnosis == "1" || row.diagnosis == "0"))) {
					alert('Invalid input');
					console.log('save failed');
					return;
				}
				
				let mean_radius = parseFloat(row.mean_radius);
				let mean_texture = parseFloat(row.mean_texture);
				let mean_perimeter = parseFloat(row.mean_perimeter);
				let mean_area = parseFloat(row.mean_area);
				let mean_smoothness = parseFloat(row.mean_smoothness);
				let diagnosis = row.diagnosis;
				let id = parseInt(row.id);
				if (1) {
					that.$axios({
							method: 'post',
							url: 'http://' + this.GLOBAL.ip + ':10520/api/data/edit',
							data: {
								mean_radius: mean_radius,
								mean_texture: mean_texture,
								mean_perimeter: mean_perimeter,
								mean_area: mean_area,
								mean_smoothness: mean_smoothness,
								diagnosis: diagnosis,
								id: id,
							}
						})
						.then(res => {
							if (res.data.code == "0") {
								if (id == -1) {
									row.id = res.data.id;
								}
								alert('Saved');
							}
							else if(res.data.code == "1") {
								alert('Server Error');
							}
						})
						.catch(err => {
							console.log(err);
							alert('Unknown Error');
						})
				} else {
					
				}
			},
			del(index, row) {
				if (parseInt(row.id) == -1) {
					this.tableData.splice(index, 1);
					this.mode == 'normal';
					return;
				}
				const that = this;
				if (1) {
					that.$axios({
							method: 'post',
							url: 'http://' + this.GLOBAL.ip + ':10520/api/data/delete',
							data: {
								id: row.id,
							}
						})
						.then(res => {
							if (res.data.code == "0") {
								alert('Deleted');
								if (parseInt(row.id) == this.row.id) {
									this.mode == 'normal';
								}
								this.tableData.splice(index, 1);
							}
							else if(res.data.code == "1") {
								alert('Server Error');
							}
						})
						.catch(err => {
							console.log(err);
							alert('Unknown Error');
						})
				} else {
					
				}
			},
			add() {
				if (this.mode != 'normal') {
					return;
				}
				this.mode = 'add';
				let obj = {
					id: -1,
					mean_radius: 0,
					mean_texture: 0,
					mean_perimeter: 0,
					mean_area: 0,
					mean_smoothness: 0,
					diagnosis: '0',
					isShow: false,
				};
				this.tableData.push(obj);
				document.querySelector('#end').scrollIntoView({
				  behavior: "smooth",
				  block: "center",
				  inline: "nearest",
				});
			},
			recover() {
				const that = this;
				if (1) {
					that.$axios({
							method: 'post',
							url: 'http://' + this.GLOBAL.ip + ':10520/api/data/recover',
							data: {
							}
						})
						.then(res => {
							if (res.data.code == "0") {
								alert('revocered');
								that.loadData();
							}
							else if(res.data.code == "1") {
								alert('Server Error');
							}
						})
						.catch(err => {
							console.log(err);
							alert('Unknown Error');
						})
				} else {
					
				}
				
			}
		},
	};
</script>

