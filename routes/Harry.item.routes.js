module.exports = (app) => {
    


    const item = require("../controller/Harry.item.controller");



    app.post('/Harrypost',item.create);

    app.get('/Harryall', item.findAll);

    app.delete('/HarryDel/:_id', item.delete);
}   