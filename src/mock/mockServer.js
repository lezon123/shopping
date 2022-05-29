// 引入mockjs模块
import Mock from 'mockjs'
// 把json数据格式引入进来
// webpack默认对外暴露：图片，json数据格式，
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'


// mock数据
// 参数1：请求地址，参数2：请求的数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
