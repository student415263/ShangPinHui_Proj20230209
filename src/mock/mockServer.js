/*
利用mockjs来mock数据接口
*/
/*mock是个对象，首字母记得大写*/
import Mock from 'mockjs'
//引入数据（图片和json数据格式不需要对外暴露）
import banner from './banner.json'
import floors from './floors.json'

//提供广告位轮播数据的接口，（Mock对象身上的mock方法）
Mock.mock('/mock/banner', {
    code: 200,
    data: banner
})

//提供所有楼层数据的接口
Mock.mock('/mock/floors', {
    code: 200,
    data: floors
})