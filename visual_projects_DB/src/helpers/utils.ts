
export function responseMessage(res:any, status:any, data:any, msg:any)
{
    let jsonData:object = {
        msg:msg,
        data:data
    }
    return res.status(status).send(jsonData);
}