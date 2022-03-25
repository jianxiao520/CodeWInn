
let Base64Util = {
    // 字符串 Base64 编码函数
    Base64encode: (Content) => {
        return new Buffer.from(Content, "utf-8").toString('base64');
    },
    // 字符串 Base64 解码函数
    Base64decode: (Content) => {
        return new Buffer.from(Content, 'base64').toString("utf-8");
    }
}

export default Base64Util;