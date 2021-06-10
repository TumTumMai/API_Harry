const Item = require('../models/Harry.item');

exports.create = (req, res) => {
    // Validate request
    if (!req.body.ItemName) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }


    // Create a Note
    const Harrybook = new Item({
        ItemName: req.body.ItemName || "Untitled Note",
        price: req.body.price,
        NameShop: req.body.NameShop

    });

    // Save Note in the database
    Harrybook.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

////////////////////////////////////
exports.findAll = (req, res) => {
    Item.find()
    .then(dasdasdasdad => {
        res.send(dasdasdasdad)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Item."
        })

    })
}
/////////////////////////////////////////////
exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params._id)
    .then(dasdasdasdad => {
        if(!dasdasdasdad) {
            return res.status(404).send({
                message: "Item not found with id " + req.params._id
            });
        }
        res.send({message: "Item deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Item not found with ItemName " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with ItemName " + req.params._id
        });
    });
};