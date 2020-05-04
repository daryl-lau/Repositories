const zlib = require('zlib');

const input = 'www.baihuzi.com，《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜,《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜《雪中悍刀行》，天不生我李淳罡，剑道万古如长夜'
zlib.deflate(input, (err, buffer) => {
    if (err) {
        console.error('发生错误:', err);
        process.exitCode = 1;
    }
    console.log('压缩后的buffer: ', buffer);
    console.log(buffer.toString('base64'));
});


const buffer = Buffer.from('eJwrLy/XS0rMzCitytRLzs99v6fncUPXy9mrnuxY+6yp92lHw4uFQJFuoPjTJSuf7Oh9PmX+s46Jz+b2Pdu++fnehSDxzokvGyc/2dH+tH/J02VNL6fuf7pkjg5VTBk1ZNSQUUNGDRk1ZCQYAgATypO0', 'base64');
zlib.unzip(buffer, (err, buffer) => {
    if (err) {
        console.error('发生错误:', err);
        process.exitCode = 1;
    }
    console.log(buffer.toString());
});