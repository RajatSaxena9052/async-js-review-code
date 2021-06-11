const fetch = require("node-fetch");
const write = require("./write");
const read = require("./read");


fetch(" https://api.kuvera.in/api/v3/funds.json")
    .then((res) => res.json())
    .then((data) => {
        operation(data)
    })

function operation(data) {

    write("fileByPromise.json", data)
        .then((msg) => {
            console.log(msg);

            return read("fileByPromise.json");
        })
        .then((data) => {
            let originalData = JSON.parse(data);

            let fundHouse = originalData.reduce((accumulator, type) => {
                accumulator.add(type.fund_house)

                return accumulator;
            }, new Set());

            let mutualFunds = [...fundHouse].reduce((accumulator, houseName) => {

                accumulator[houseName] = originalData.reduce((accumulator, data) => {
                    if (data.fund_house === houseName) {

                        if (accumulator[data.fund_type] === undefined) {
                            accumulator[data.fund_type] = 1;
                        } else {
                            accumulator[data.fund_type] += 1;
                        }

                    }

                    return accumulator;

                }, {});

                return accumulator;

            }, {});

            return mutualFunds;

        }).then((result) => {
            write("outputData.json", result);
        })
        .catch((error) => {
            console.log(error);
        })
}

