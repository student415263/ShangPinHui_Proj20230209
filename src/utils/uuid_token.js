// import uuid from 'uuid'  //XXXX
import { v4 as uuidv4 } from 'uuid';

//要求生成一个随机字符串，并且每次执行不能发生变化，游客身份持久存储
export const getUuid = () => {
    // 先从本地获取uuid，看看有没有
    let uuid_token = localStorage.getItem('cvsadawd');
    //condition expression --（!uuid_token）{}
    if(uuid_token == false){
        uuid_token = uuidv4()
        localStorage.setItem('cvsadawd', uuid_token)
    }
    return uuid_token; //OK
}