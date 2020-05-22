const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')

const priveteKey = fs.readFileSync(path.resolve(__dirname, '../private.pem'));
const publicKey = fs.readFileSync(path.resolve(__dirname, '../public.pem'));

module.exports = {
    createToken(data) {
        return new Promise((resolve, reject) => {
            jwt.sign(data, priveteKey, { algorithm: 'RS256', expiresIn: 60 * 60 }, (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            })
        })
    },
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, publicKey, { algorithm: 'RS256' }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}