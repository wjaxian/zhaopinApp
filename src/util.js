//获取跳转地址
export function getRedirectPath({type,avatar}){
    let url = (type==="NIUREN"?"/genius":"/boss");
    if(!avatar){
        url += "info";
    }

    return url;
}

//验证手机号
export function yzTel(tel){
  return  /^1[3578]\d{9}$/g.test(tel)
}
