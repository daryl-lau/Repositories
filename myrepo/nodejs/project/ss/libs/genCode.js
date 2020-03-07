
const char = 'ab0cd1ef2gh3ij4kl5mn6op7qr8st9uvwxyz';

module.exports = {
    genCode() {
        let code = '';
        for (let i = 0; i < 4; i++) {
            let single = char[Math.floor(Math.random() * char.length)];
            code += single;
        }
        return code;
    },
};