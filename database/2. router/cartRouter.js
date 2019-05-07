const router = require('express').Router()
const {addToCart,getCart,updateCart,deleteCart,countCart} = require('./../3. controler').cartController

router.post('/addTocart', addToCart)
router.get('/getCart', getCart)
router.get('/getCount', countCart)
router.put('/updateCart/:id', updateCart)
router.delete('/deleteCart/:id', deleteCart)




module.exports = router