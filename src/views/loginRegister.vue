<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" key="bigContainLogin" v-if="isLogin">
					<div class="btitle">LOGIN</div>
					<div class="bform">
						<input type="text" placeholder="username" v-model="form.username">
						<span class="errTips" v-if="usernameError">* WRONG USERNAME *</span>
						<input type="password" placeholder="password" v-model="form.userpwd">
						<span class="errTips" v-if="passwordError">* WRONG PASSWORD *</span>
						<span class="errTips" v-if="blockError">* BLOCKED *</span>
					</div>
					<button class="bbutton" @click="login">LOGIN</button>
				</div>
				<div class="big-contain" key="bigContainRegister" v-else>
					<div class="btitle">CREATE ACCOUNT</div>
					<div class="bform">
						<input type="text" placeholder="username" v-model="form.username">
						<span class="errTips" v-if="existed">* username exists! *</span>
						<input type="email" placeholder="E-mail" v-model="form.useremail">
						<input type="password" placeholder="password" v-model="form.userpwd">
					</div>
					<button class="bbutton" @click="register">REGISTER</button>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" key="smallContainRegister" v-if="isLogin">
					<div class="stitle">Hello</div>
					<p class="scontent">register...</p>
					<button class="sbutton" @click="changeType">REGISTER</button>
				</div>
				<div class="small-contain" key="smallContainLogin" v-else>
					<div class="stitle">Welcome back</div>
					<p class="scontent">Please login</p>
					<button class="sbutton" @click="changeType">LOGIN</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5'
	export default{
		name:'login-register',
		data(){
			return {
				isLogin:false,
				usernameError: false,
				passwordError: false,
				blockError: false,
				existed: false,
				ip: 'localhost',
				form:{
					username:'',
					useremail:'',
					userpwd:''
				}
			}
		},
		methods:{
			changeType() {
				this.isLogin = !this.isLogin
				this.form.username = ''
				this.form.useremail = ''
				this.form.userpwd = ''
			},
			login() {
				const self = this;
				if (self.form.username != "" && self.form.userpwd != "") {
					self.$axios({
						method:'post',
						url: 'http://' + this.GLOBAL.ip + ':10520/api/user/login',
						data: {
							username: self.form.username,
							password: md5(self.form.userpwd)
						}
					})
					.then( res => {
						switch(res.data.code){
							case "0": 
								this.$router.push('home');
								break;
							case "-1":
								this.usernameError = true;
								break;
							case "1":
								this.passwordError = true;
								break;
							case "2":
								this.blockError = true;
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})
				} else{
					alert('Invalid input');
				}
			},
			register(){
				const self = this;
				if(self.form.username != "" && self.form.useremail != "" && self.form.userpwd != ""){
					self.$axios({
						method:'post',
						url: 'http://' + this.GLOBAL.ip + ':10520/api/user/add',
						data: {
							username: self.form.username,
							email: self.form.useremail,
							password: md5(self.form.userpwd)
						}
					})
					.then( res => {
						switch(res.data.code){
							case "0":
								alert('Register success');
								this.login();
								break;
							case "-1":
								this.existed = true;
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})
				} else {
					alert('Invalid input');
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.login-register{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(57,167,176);
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(57,167,176);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,rgb(57,167,176),rgb(56,183,145));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	
	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
</style>
