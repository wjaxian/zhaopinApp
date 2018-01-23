//获取跳转地址
export function getRedirectPath({type,avathar}){

    let url = (type==="NIUREN"?"/genius":"/boss");
    if(!avathar){
        url += "info";
    }
    
    return url;
}

