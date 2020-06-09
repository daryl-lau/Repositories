// console.log(process.env.HOSTNAME);
// console.log(process.env.OS);

let developmentConfig = {
    host: 'localhost',
    port: '8080'
}

let productionConfig = {
    host: '10.10.10.10',
    port: '3000'
}

if (process.env.HOSTNAME == 'baihuzi.com') {
    module.exports = productionConfig;
} else if (process.env.OS == 'Windows_NT') {
    module.exports = developmentConfig;
}