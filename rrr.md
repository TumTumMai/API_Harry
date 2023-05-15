 try {
  
    const productIds= req.body.map((product: { Id: number }) => product.Id);//map return value array ืั้ละตัว
    console.log(productIds);
    // const aaa = await productRepository.find({ where: { Id:1 } });
    // const posts = await productRepository.createQueryBuilder()
    // .where({ Id: In(productIds) })
    // .getMany();
    const posts = await productRepository.find({where: {Id: In(productIds)}}) // another query method

    console.log(posts)
    console.log(req.body)

    const books: any[] = [] //รับค่าเป็นobj โดยให้booksเป็นarray=array

    for(const item of req.body){
        const index = posts.findIndex(element => element.Id == item.Id)
        books.push({
            Name:posts[index].Name,
            Amount:item.Amount,
            Price:posts[index].Price
        })
    }

    console.log(books)

     // check if books is not array empty([])
     if (books.length) {
        const uniqueName: any[] = [];
        for (const item of books) {
          const isDuplicates = uniqueName.find((obj) => obj.Name === item.Name);
          if (!isDuplicates) uniqueName.push(item);
        }
        console.log(uniqueName)
        let totalValue = 0;
        while (uniqueName.length) { //check is empty array ?
          let count = 0;
          for (let i = 0; i < uniqueName.length; i++) {
            if (uniqueName[i].Amount > 0) {
              count++;
              uniqueName[i].Amount -= 1; //uniqueName[i].Amount = uniqueName[i].Amount - 1;
            } else if (uniqueName[i].Amount <= 0) { //ถ้าamout=0 ก็ delete array index[i]
              uniqueName.splice(i, 1); //ลบindex in array
              i--; //เพื่อให้i กับ element ที่เทียบอยู่เท่ากัน (uniqeเทียบกับi)
            }
          }
          if (!uniqueName.length) break; //if iniq = empty array > break

          let promotion:number = 0;
          switch (count) {
            case 0:
              promotion = 0;
              break;
            case 1:
                promotion = 0;
              break;
            case 2:
                promotion = 10;
              break;
            case 3:
                promotion = 20;
              break;
            case 4:
                promotion = 30;
              break;
            case 5:
                promotion = 40;
              break;
            case 6:
                promotion = 50;
              break;
            case 7:
                promotion = 60;
          }
          const sumvalue = uniqueName.reduce((acc, obj) => acc + obj.Price, 0);
          totalValue = totalValue + (sumvalue - (sumvalue * promotion) / 100);
        //   console.log('sum', sumvalue);
        //   console.log('unique', uniqueName);
        //   console.log('total', totalValue);
        }
         res.json({totalValue})
    }



    // return 'success'

    // คำนวณราคาสินค้ารวม

    // let total = 0
    // posts.forEach((t)=>{total= total+t.Price}) //solution Basic

    // sum solution Reduce
    //const total = productIds.reduce((acc: any, product: { Price: any; }) => acc + product.Price, 0);
    // const sum = posts.reduce((acc, product: { Price: any; }, index) => {
    //     const amount = req.body[index].amount || 1; // รับจำนวนสินค้าที่เลือก หรือถ้าไม่ได้ระบุให้เป็น 1
    //     return acc + (product.Price * amount); //accแสดงถึงมูลค่าสะสม และcurrแสดงถึงมูลค่าปัจจุบันที่กำลังประมวลผล แล้วไปเก็บไว้ในacc
    // }, 0); 
    // console.log(sum); 

    // ส่ง response กลับไปหา client
        // res.json({ sum });
  } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
  }
