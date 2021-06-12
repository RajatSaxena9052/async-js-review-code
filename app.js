const write = require("./write");
const read = require("./read");
const fetch = require("node-fetch");


let Codes = ["TRSSG1-GR", "BSD1050-GR", "606-DR", "8010-DP", "PCFFZM-DP"];

let arrOfPromise = [];

for (let i in Codes) {
    arrOfPromise.push(getTheDatails(Codes[i]));
}

async function getTheDatails(value) {

    let promise = await fetch(`https://api.kuvera.in/api/v3/funds/${value}.json`);
    let result = await promise.json();
    //write(`${value}.json`, result)
    return result
}

function resolveAll(arrOfPromise) {

    Promise.all(arrOfPromise).then((data) => {
        console.log(data)
    })

}

resolveAll(arrOfPromise);



/*
//promise chain 

fetch(" https://api.kuvera.in/api/v3/funds.json")
    .then((res) => res.json())
    .then((data) => {
        console.log(typeof data)

        return write("fileByPromise.json", data)
    })
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
        return write("outputData.json", result);
    })
    .catch((error) => {
        console.log(error);
    })

 */