const fs = require("fs");

function write(fileName, data) {

    return new Promise((resolve, reject) => {

        fs.writeFile(fileName, JSON.stringify(data, null, 2), (error) => {
            if (error) {
                reject(error);
            } else {
                resolve("success");
            }
        });

    });
}

module.exports = write;