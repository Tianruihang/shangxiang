let baseUrl;
import website from "@/config/website";
import store from '@/store'
// 不带token请求
const httpRequest = (opts, data) => {
	if(opts.type == 2){
		baseUrl = 'http://127.0.0.1:9885';
	}else{
		baseUrl = 'http://101.126.5.141:9872';
		// baseUrl = 'http://127.0.0.1:9872';
	}
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8",
			"Authorization": `Basic ${website.Authorization}`
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8',
			"Authorization": `Basic ${website.Authorization}`
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request({
			...httpDefaultOpts,
			success(res) {
				if (res.data.code == 200) {
					resolve(res.data)
				} else {
					resolve(res.data)
					// uni.showToast({
					// 	title: '' + res.data.message,
					// 	icon: 'none'
					// })
				}
			},
			fail(res) {
				reject(res)
			}
		});
	})
	return promise
};

export function httpRequests(opts, data) {
	return httpRequest(opts
	, data);
}
export function httpTokenRequests(opts, data) {
	return httpTokenRequest(opts, data);
}
//ai服务请求
export function aiRequest(opts, data) {
	opt.type = 2;
	return httpRequest(opts, data);
}
//带Token请求
const httpTokenRequest = (opts, data) => {
	if(opts.type == 2){
		baseUrl = 'https://www.zhoukaiwen.com/';
	}else{
		baseUrl = 'http://101.126.5.141:9872';
		// baseUrl = 'http://127.0.0.1:9872';
	}
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let token = store.getters.token;
	// hadToken()
	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '账号已过期，请重新登录',
			icon: 'none',
			// complete: function() {
			// 	uni.reLaunch({
			// 		url: '/pages/login/index'
			// 	});
			// }
		});
		return false
	} else {
		let httpDefaultOpts = {
			url: baseUrl + opts.url,
			data: data,
			method: opts.method,
			header: opts.method == 'get' ? {
				'Blade-Auth': "bearer " + token,
				// 'X-Requested-With': 'XMLHttpRequest',
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8",
				"Authorization": `Basic ${website.Authorization}`
			} : {
				// 'X-Requested-With': 'XMLHttpRequest',
				'Blade-Auth': "bearer " + token,
				'Content-Type': 'application/json; charset=UTF-8',
				"Authorization": `Basic ${website.Authorization}`
			},
			dataType: 'json',
		}
		let promise = new Promise(function(resolve, reject) {
			uni.request({
				...httpDefaultOpts,
				success(res) {
					if (res.data.code == 200) {
						resolve(res.data)
					} else {
						//跳转至登录页
						uni.navigateTo({
							url: '/pages/login/login'
						});
						resolve(res.data)
						// uni.showToast({
						// 	title: '' + res.data.message,
						// 	icon: 'none'
						// })
					}
				},
				fail(res) {
					console.log(res)
					reject(res)
				}
			});
			// uni.request(httpDefaultOpts).then(
			// 	(res) => {
			// 		if (res[1].data.code == 200) {
			// 			resolve(res[1])
			// 		} else {
			// 			if (res[1].data.code == 5000) {
			// 				// uni.showModal({
			// 				// 	title: '提示',
			// 				// 	content: res[1].data.message,
			// 				// 	success: function (res) {
			// 				// 		if (res.confirm) {
			// 				// 			uni.reLaunch({
			// 				// 				url: '/pages/login/login'
			// 				// 			});
			// 				// 			uni.clearStorageSync();
			// 				// 		}
			// 				// 	}
			// 				// });
			// 				uni.reLaunch({
			// 					url: '/pages/login/index'
			// 				});
			// 				uni.clearStorageSync();
			// 			} else {
			// 				resolve(res[1])
			// 				// uni.showToast({
			// 				// 	title: '' + res[1].data.message,
			// 				// 	icon: 'none'
			// 				// })
			// 			}
			// 		}
			// 	}
			// ).catch(
			// 	(response) => {
			// 		reject(response)
			// 	}
			// )
		})
		return promise
	}
	// let token = uni.getStorageSync('token')
	//此token是登录成功后后台返回保存在storage中的

};

// 拦截器
const hadToken = () => {
	let token = uni.getStorageSync('token');

	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '账号已过期，请重新登录',
			icon: 'none',
			complete: function() {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			}
		});
		return false;
	}
	return true
}
export default {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	hadToken
}
