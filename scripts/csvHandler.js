
const fs = require("fs");

// path to the csv file
const coffee_path = "./data/coffee.csv";

// function to check if the csv file exists and decide whether to create a new one or append to existing
async function csvCheck(data){
    try{
        console.log("test");
        // check the stats of the file
        const stats = await fs.promises.stat(coffee_path);
        if(stats.size === 0){
            // if the file is empty, call writeCsv with 'c' flag to create a new file
            writeCsv(data);
        } else {
            // if the file is not empty, call writeCsv with 'a' flag to append to the existing file
            writeCsv(data, 'a');
        }
    } catch (err){
        // if there is an error accessing the file 
        if (err.code ==='ENOENT'){
            console.log("This is triggering")
            // if the error is that the file does not exist, call writeCsv with 'w' flag to create a new file
            writeCsv(data);
        } else{
            // if there is any other error, log it
            console.log('Error accessing CSV file', err);
        }
    }
}

// function to update data to csv file
async function updateCsv(data){
    try{
        let writer = fs.createWriteStream(coffee_path, {encoding: "utf-8", flags: "w"});
        writer.write('Coffee,Country,Variety,Roast,Taste,Price,Rating\n');

        for(row in data){
            writer.write(data[row] + "\n");
        }

    } catch (err){
        console.error("Error: ", err);
    }
}

// function to write data to the csv file
async function writeCsv(data, flag="w"){
    let writer = null

    try{
        // create a write stream with the spcified flag
        if (flag==="w"){
            // if flag is 'c', create a new file and write header
            writer = fs.createWriteStream(coffee_path, {encoding: "utf-8", flags: flag});
            writer.write('Coffee,Country,Variety,Roast,Taste,Price,Rating\n');
        } else{
            // if flag is 'a' (append), open the file in append mode
            writer = fs.createWriteStream(coffee_path, {encoding: "utf-8", flags:flag});
        }

        // write data to the file
        if(typeof data === 'string'){
            writer.write(data+"\n");
        } else{
            writer.write(JSON.stringify(data)+"\n");
        }
        console.log("Data saved");
    } catch (err){
        // if there is an error, ignore it
    } finally {
        // close the writer stream if it's open
        if (writer){
            writer.end();
        }
    }    
}

// function to format data before writing to csv
function formatData(data){
    try{
        // extract star rating and coffee details
        let star = data["starRadio"];
        let coffee = `${data['cBrand']}'s ${data['cName']}`;
        let excludeArray = ['starRadio', 'cBrand', 'cName', 'cSubmit'];
        let newData = coffee;
        // format the data as comma-separated value
        Object.keys(data).forEach(key => {
            if (!excludeArray.includes(key)){
                newData += key==="cPrice" ? `,$${data[key]}` : `,${data[key]}`;
            }
        });
        // add star rating to the formatted data
        newData += `,${star}/5`;
        return newData;
    } catch (err){
        // if there is an error, log it
        console.log(err);
    }
   
    return null;
}

// function to read data from the csv file
async function getData(){
    return new Promise((resolve, reject) => {
        let reader = fs.createReadStream(coffee_path, {encoding:"utf-8"});
        let data = {};

        // event listener for when data is read from the file 
        reader.on('data', (chunk) => {
            let initialData = chunk.split("\n");
            initialData.shift();
            initialData.pop();
            initialData.forEach((row,index) => {
                data[index+1] = row;
            });
        });

        // event listener for when reading is finished
        reader.on('close', () => {
            // remove empty / not wanted lines from the data
            resolve(data);
        });

        // event listener for errors
        reader.on('error', (err) => {
            // reject the promise with the error
            reject(err);
        });
        
    });
}

// export functions for external use
module.exports.csvCheck = csvCheck;
module.exports.formatData = formatData;
module.exports.getData = getData;
module.exports.updateCsv = updateCsv;