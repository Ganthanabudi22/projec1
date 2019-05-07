const db = require('./../1. database')


module.exports = {
addToCart : (req,res)=> {
    var data = req.body
    var sql = `select * from cart where user_name_cart='${data.user_name_cart}' and id_produk_cart=${data.id_produk_cart}`
    db.query(sql, (err,result) => {
        try{
            if(result.length > 0){
                var qty = result[0].qty+data.qty

                var sql1=`update cart set qty=${qty} where user_name_cart='${data.user_name_cart}' and id_produk_cart=${data.id_produk_cart}`
                db.query(sql1, (err1, result1)=>{
                    if(err1) throw {error : true, msg : "Error saat tambah qty"}
                    res.send("success")
                })
            }else{
                var sql2 = `insert into cart set ?`
                db.query(sql2, data, (err2,result2) => {
                    if(err2) throw {error:true, msg: 'Gagal Di TambahKan'}
                    res.send("success")
                })
            }
        }
        catch(err){
            res.send(err)
        }
    })
},
getCart : (req,res)=>{
    var user_name_cart = req.query.user_name_cart
    var sql = `select cart.id,qty, id_produk_cart ,user_name_cart, p.nama_produk, p.harga, p.discount from cart
                join products p on id_produk_cart = p.id  where user_name_cart='${user_name_cart}'`
    db.query(sql, (err,result)=>{
        try{
            if(err) throw {error:true, msg: 'Database Erorr'}
            res.send(result)
        }
        catch(err){
            res.send(err)
        }
    })
},
countCart : (req,res)=>{
    var user_name_cart = req.query.user_name_cart
    var sql = `select count(*) as count from cart where user_name_cart='${user_name_cart}';`
    db.query(sql, (err,result)=>{
        try{
            if(err) throw {error:true, msg: 'Database Erorr'}
            res.send(result)
        }
        catch(err){
            res.send(err)
        }
    })
},
updateCart : (req,res) => {
    var id = req.params.id
    var qty = req.body.qty
    sql = `update cart set qty=${qty} where id = ${id};`
    db.query(sql, qty, (err,result) => {
        try{
            if(err) throw {error:true, msg: 'Database Erorr'}
            res.send(result)
        }
        catch(err){
            res.send(err)
        }
    })
},
deleteCart : (req,res) => {
    id = req.params.id
    sql = `delete from cart where id = ${id};`
    db.query(sql, (err, result) => {
        try { 
            if(err) throw err
            res.send(result)
        }
        catch(err){
            res.send(err)
        }
    })
}


}