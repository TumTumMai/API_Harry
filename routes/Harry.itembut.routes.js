module.exports = (app) => {
    


    const itembuy = require("../controller/Harry.itembuy.controller");


    // Create a new itembuy

    app.post('/Harrybuy',itembuy.create);

}
