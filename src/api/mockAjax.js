// axios二次封装,因为要用到请求和响应拦截器
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// 引入样式
import 'nprogress/nprogress.css';
//start:进度条开始    done:进度条结束

const request = axios.create({
  // 配置对象
  // 基础路径,发送请求时,路径中会出现api
  baseURL: '/mock',
  // 请求超时时间
  timeout: 5000,

});
// 请求拦截器
request.interceptors.request.use((config) => {
  // config是一个配置对象,包含一个headers属性
  // 进度条开始动
  nprogress.start();
  return config;
})
// 响应拦截器
request.interceptors.response.use((res) => {
  // 响应成功的回调函数
  // 进度条结束
  nprogress.done();
  return res.data;
}, (error) => {
  // 响应失败的回调函数
  return Promise.reject(new Error('fail'))
})

// 对外暴露request
export default request