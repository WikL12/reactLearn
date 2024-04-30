// 统一中转模块函数，暴露给用户使用
// 用户使用时，只需要 import { request} from '@/utils'; 无需关注request在哪个页面
import  request  from './request';
import { getToken } from './tokenMethods';
export { request , getToken }
