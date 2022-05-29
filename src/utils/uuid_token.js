import { v4 as uuidv4 } from 'uuid'
// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久储存
export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  //  如果没找到，则生成一个uuid_token
  if (!uuid_token) {
    // 生成游客临时身份
    uuid_token = uuidv4()
    // 本地存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}