let jwt = require('jsonwebtoken');
let fs = require('fs')

/*
    jwt分为3段
    第一段声明jwt头通常为
        {
            "alg":"RS256",      // 算法
            "typ":"JWT"         // 类型
        }
    最后，使用Base64 URL算法将上述JSON对象转换为字符串保存。

    第二段payload,有效负载
    {
        iss:    // jwt签发者
        sub:    // jwt所面向的用户
        aud:    // 接收jwt的一方
        exp:    // jwt的过期时间，这个过期时间必须要大于签发时间，单位是秒
        nbf:    // 定义在什么时间之前，该jwt都是不可用的.
        iat:    // jwt的签发时间，如果没有给此参数，签发的时候会自动加上签发的当前时间
        jti:    // jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。

        // 以及自定义信息
        user: 'baihuzi',
        admin: true,
    }
    最后，使用Base64 URL算法将上述JSON对象转换为字符串保存。
    此段不进行加密，仅仅转为base64，任何人都可以获取此段的数据，因此这里一定不要放敏感信息


    第三段：签名。根据签名可以校验token的合法性
    有一个秘钥，也可以是公钥和私钥，根据这个秘钥进行签名，
    如果token发生改变，则无法解析出正确的数字

    token默认是不加密的，仅进行签名
    如果需要进行token加密，可以把获取到的整个token串进行一次加密，传给前端，再在后端进行解密，然后再解析token

    token一般不存在服务器上，使用的时候会给exp一个过期时间，
*/


let data = {
    username: 'baihuzi',
    admin: true,
    age: 18
}


// token用私钥进行签名，用公钥进行验签，防止客户端伪造token
let privateKey = fs.readFileSync('./private.pem')
let token = jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: 60 * 10 });
console.log(token);
let str = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhaWh1emkiLCJhZG1pbiI6dHJ1ZSwiYWdlIjoxOCwiaWF0IjoxNTg5Nzk2MzUwfQ.CgD3jvsNTB2SBhpf9t1sfGCXk7LloVnWk0ERRDRVv9h3pu9kcVFrk18i8yZWuSq3G-qh5eXN4F6L5zOjg6rEQSItuVQ-hHEAaHZ-MNZ--CtTYwdqLFSs4djblABabQd7ywwsCphqJGH2PnWZ1fMKvge4ml5wd78EebpJRudHfyb_dsYg3oSCljEBMbZaEa7zlfxg0S4y0sHyEK6OnNX68FkbxW9_bcc5eL6yqgdFFJ1_bAnq3igZcOmjhZC9CzyyxOMj05JdhWo9pBjFcoKuPfFQldZ2hPDN_U3_sbIk2LsrsHuz9imjj1d2HbV4cL2BW1Wj3M75n5ab4sPa15ueAw'
let publicKey = fs.readFileSync('./public.pem')
let tokenRes = token
let res = jwt.verify(tokenRes, publicKey, { algorithm: 'RS256' })

console.log(res);





