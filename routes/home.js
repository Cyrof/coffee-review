
const express = require("express");
const router = express.Router();
const csvHandler = require("../scripts/csvHandler");

// route to render the home page and display saved data
router.get('/', async (req, res) => {
    // retrieve data from the csv file
    try{
        let savedData = await csvHandler.getData();
        res.render('../views/home', {data: savedData, reload: false});
    } catch (err){
        res.render('../views/home', {data: {}, reload: false});
    }
});

// route to handle form submission and saving data to csv
router.post('/', async (req, res) => {
    // extract form data from request body
    const body = req.body;
    // format from data into csv format
    let data = csvHandler.formatData(body);
    // check if csv file exists, then write data accordingly
    csvHandler.csvCheck(data);
    
    res.redirect(303, "/");
});

module.exports = router;