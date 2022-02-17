const https = require('https')



function ApiCall(options, single) {
    const { tag, offset = 0, limit = 100 } = options
    const query = single ? `/${options.id}` : ''
    return new Promise((resolve, reject) => {
        https.get(
            'https://jsonplaceholder.typicode.com/posts' + query
            , (res) => {

                let data = ''

                res.on('data', chunk => {
                    data += chunk
                })

                res.on('end', () => {

                    data = JSON.parse(data.toString('utf8'))

                    if (single) return resolve(data)

                    if (tag) {
                        data = data.filter(post => post.title.includes(tag))
                    }

                    resolve(data.slice(offset, offset + limit))
                })

                res.on('error', err => {
                    reject(err)
                })

            })

    })
}

exports.apiCall = ApiCall