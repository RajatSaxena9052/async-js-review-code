const fs = require("fs");

function read(fileName) {

    return new Promise((resolve ,reject) => {

        fs.readFile(fileName,"utf-8",(error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });

    });
}

module.exports = read;