const itembuy = require('../models/Harry.itembuy');
const Item = require('../models/Harry.item');


exports.create = async (req, res) => {
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
        item: [],
        price: 0,
        discount: 0,
        total_price: 0
    }
    /////////////////////////////////////////////////
    for await (const item of req.body.item) {
        const Booknum = await Item.findById(item._id)
        // console.log(Booknum)
        data.item.push({ book_id: Booknum._id, count: item.count, price: Booknum.price * item.count })
        // console.log(data.item)
        // data.price.push({price})

    }
    //////////////////////////////////////////////////////
    const arr1 = data.item
    const reducer = (accumulator, currentValue) => {
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


    ///////////////////
    // console.log(aaa)
    const bodyitem = req.body.item
    const bodyitemlength = bodyitem.length
    // console.log(bodyitemlength)

    // const dil = data.item.length
    // console.log(dil)
    let idiscount = 0

    for (let i = bodyitemlength; i >= 1; i--) {
        console.log(data.item)
        const Sdiscount = discount(data.item)
        idiscount += Sdiscount
        console.log(Sdiscount)


        const countee = delCount(data.item)
        const index = countee.index
        const min = countee.min

        delmin(data.item, min)

        data.item.splice(countee, 1)
        // console.log(data.item)

    }
    console.log(idiscount)

    /////////////////////////////////////////////////////


    function delmin(arr, min) {
        arr.forEach((e, index) => {
            e.count -= min

        })
    }

    function delCount(arr) {
        let min = Number.MAX_SAFE_INTEGER
        let Seveindex = -1

        arr.forEach((element, index) => {
            if (element.count < min) {
                min = element.count
                Seveindex = index
            }
        });
        const set = {
            index: Seveindex,
            min: min
        }

        return set;
    }

    function discount(arr) {
        let min = Number.MAX_SAFE_INTEGER
        data.item.forEach(element => {
            if (element.count < min) min = element.count
        });
        const unSubjectCount = arr.length
        // console.log(unSubjectCount)
        const discountP = unSubjectCount * (unSubjectCount - 1) * 10 * min
        // console.log(discountP)
        return discountP;
    }

    data.discount = idiscount

    ///////////////////////////////////////
    const All = data.price - idiscount
    data.total_price = All
    // console.log(min)

    console.log(All)

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






}



