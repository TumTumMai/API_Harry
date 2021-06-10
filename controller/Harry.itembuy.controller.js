const itembuy = require('../models/Harry.itembuy');
const Item = require('../models/Harry.item');


exports.create =  async (req, res) => {
//     Item.find()
//     .then(dasdasdasdad => {
//         res.send(dasdasdasdad)
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving Item."
//         })

//     })
// }
    // console.log(req.body)
    let data = {
        item:[],
            price: 0,
            discount:0,
            total_price:0
    }
/////////////////////////////////////////////////
    for await(const item of req.body.item) {
        const Booknum = await Item.findById(item._id)
        // console.log(Booknum)
        data.item.push({book_id:Booknum._id,count:item.count,price:Booknum.price*item.count})
        // console.log(data.item)
        // data.price.push({price})
        
    }   
//////////////////////////////////////////////////////
    const arr1 = data.item
    const reducer = (accumulator, currentValue) =>{
        return accumulator + currentValue.price
    } 
    // console.log(arr1.reduce(reducer));
    data.price = arr1.reduce(reducer, 0)
    // console.log(data.price)
    // data.item.forEach(element => {
    //     data.price += element.price
    //}); 
        // console.log(data)   
///////////////////////
let min = Number.MAX_SAFE_INTEGER
data.item.forEach(element => {
    if (element.count < min) min = element.count
});
////////////////////////////////////////////
let idiscount = 0
const unSubjectCount = data.item.length
const discountP = (unSubjectCount -1)*10
const discountPX=discountP*min
idiscount =discountPX*unSubjectCount
 data.discount = idiscount
    
 ///////////////////////////////////////
const All =  data.price - idiscount
data.total_price = All
// console.log(All)   

    // console.log(data)   

///////////////////////////////////////////////
    const Harrybookbuy = new itembuy(data);
        Harrybookbuy.save()
        .then(data => {
        res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

    // return res.send({
    //     message: "Could not delete note with ItemName "
    // });




}



