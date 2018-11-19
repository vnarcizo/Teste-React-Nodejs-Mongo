// Arquivo responsável pela API REST do PRODUTO
const express = require("express");

const router = express.Router();

const Product = require("../server-models/product")

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


//Método criado para obter os produtos com paginação (querystring)
router.get("/product", async (req,res) => {
   
    var product;
    if(req.query.itenspg != undefined)
    {
        let itenspg = parseInt(req.query.itenspg)
        let pg = parseInt(req.query.pg)

        let filter = {}
        if(req.query.filter != undefined && req.query.filter != "")
        {
            let txtFilter = req.query.filter.trim();

           filter = {"$or" : [
               {"Name":{'$regex' : txtFilter, '$options' : 'i'}},
               {"Type":{'$regex' : txtFilter, '$options' : 'i'}},
               {"Model":{'$regex' : txtFilter, '$options' : 'i'}}
             ]
            }
        }

        qtdFilter = await Product.find(filter).count()

        let pgs = 0;
        
        if(qtdFilter%itenspg == 0)
            pgs = parseInt(qtdFilter/itenspg);
        else
            pgs = parseInt((qtdFilter/itenspg)+1)


        products = await Product.find(filter).skip(itenspg*(pg-1)).limit(itenspg);

        let ret ={
            qtdpgs:pgs,
            qtd: qtdFilter,
            dados : products
        }
        res.json(ret)
    }
    else{
        product = await Product.find()
        res.json(product)
    }
})


//Método criado para auxiliar a criação dos dados de teste (Inserir)
router.post("/product", async (req,res) => {
    
    const product = new Product(req.body)
    await product.save();
    res.status(201);
    res.json({Status: "Product saved"})
})


//Método criado para auxiliar a criação dos dados de teste (excluir)
router.delete("/product/:id", async (req,res) => {
   
    await Product.findByIdAndRemove(req.params.id)

    res.json({Status: "Product deleted"})
})

module.exports = router;