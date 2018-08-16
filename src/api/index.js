/**
 *
 * 包含n个接口请求函数的模块
 * 函数的返回值: promise对象
 *
 */
import ajax from './ajax';

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "/api";

// 1、根据经纬度获取位置详情
export const getAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`);

// 2、获取食品分类列表
export const getFoodCategoryList = () => ajax(BASE_URL + '/index_category');








