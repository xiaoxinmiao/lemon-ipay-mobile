import request from '../utils/request';
import { backendAddr } from '../utils/config';

export function queryProduct({ product_id }) {
    return request(backendAddr.productUrl + `/stores?code=${product_id}&ipayTypeId=2&tenancy=green`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json'
            },
        }
    );
}


export function prepayAl({ product, payAmt }) {
    return request(backendAddr.alPrepay,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "e_id": product.eId,
                "subject": product.name,
                "total_amount": parseFloat(payAmt),
                "notify_url": backendAddr.alNotifyUrl,
                "body": "e_id||||" + encodeURIComponent(product.eId.toString())
            })
        }
    );
}



export function getToken({param}) {
    let token =param.jwtToken
    return request(backendAddr.tokenUrl+`/tickets/${param.appId}`
        ,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}
