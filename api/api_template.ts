
const axios = require('axios')

export const doPost = (url, header = {}, body) => new Promise(function (resolve, reject) {
    var data = JSON.stringify(body);
    var config = {
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            ...header
        },
        data: data
    };
    axios(config)
        .then(response => {
            const rd = response.data
            if (rd.status == 200)
                resolve(rd)
            else
                throw new Error(rd.err)
        })
        .catch(err => reject(err))

});



export const doPostFileUpload = (url, header = {}, body) => new Promise(function (resolve, reject) {
    
    const data = new FormData()

    for (var k in body)
        data.append(k, body[k])

    var config = {
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
            ...header
        },
        data: data
    };
    axios(config)
        .then(response => {
            const rd = response.data
            if (rd.status == 200)
                resolve(rd)
            else
                throw new Error(rd.err)
        })
        .catch(err => reject(err))

});