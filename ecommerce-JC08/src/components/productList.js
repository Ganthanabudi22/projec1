import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { urlApi } from './../support/urlApi'
import './../support/css/product.css'
import Axios from 'axios';
import swal from 'sweetalert';
import { cartCount } from './../1.actions'
import { connect} from 'react-redux'

class ProductList extends React.Component{
    state = {listProduct : []}

    componentDidMount(){
    
        this.getDataProduct()
    }
    getDataProduct = () => {
        axios.get(urlApi + '/getAllProduct')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err) => console.log(err))
    }
    addProduct = (id) => {
        var newData = {
            user_name_cart : this.props.username,
            id_produk_cart : this.state.listProduct.id,
            qty : 1
        }
        Axios.get(urlApi +'/getCart?user_name_cart='+this.props.username)
        .then((res) => {
            if(res.data.length > 0){
                Axios.put(urlApi+'/updateCart/'+id ,{...newData , qty : parseInt(res.data[0].qty) + newData.qty})
                swal('Add Product' , 'Suksees' , 'success')
            }else{
                Axios.post(urlApi +'/addTocart',newData)
                .then((res) => {
                    swal('Add Product' , 'Suksees' , 'success')
                    this.props.cartCount(this.props.username)
                })
            }
        })

        // Axios.post(urlApi +'/addTocart',newData)
        //         .then((res) => {
        //             if(res.data.error){
        //                 swal("Error", res.data.msg, "error")
        //             }else{
        //                 swal('Status Add' , 'Success Add to Cart' , 'success')
        //                 this.props.cartCount(this.props.username)
        //             }
                    
        //         })
        //         .catch((err) => console.log(err))
    }
    renderProdukJsx = () => {
        var jsx = this.state.listProduct.map((val) => {
            return (
                <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
                    <Link to={'/product-detail/' + val.id}><img className="card-img-top img" height='200px' src={urlApi+'/'+val.img} alt="Card" /></Link>
                    
                    {/* { Pake if ternary (karena melakukan pengkondisian di dalam return)} */}


                    {   
                        val.discount > 0 ?
                        <div className='discount'>{val.discount}%</div>
                        : null
                    }
                    <div className="card-body">
                    <h4 className="card-text">{val.nama_produk}</h4>

                    {
                        val.discount > 0 ?
                        <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga}</p>
                        : null
                    }

                    <p style={{display:'inline' , marginLeft:'10px',fontWeight:'500'}}>Rp. {val.harga - (val.harga*(val.discount/100))}</p>
                    <input type='button' className='d-block btn btn-primary' onClick={()=> this.addProduct(val.id)} value='Add To Cart' />
                    </div>
                </div>
            )
        //  }
        })

        return jsx
    }
    render(){
        return(
            <div className='container'>
                <div className='row justify-content-center'>
                {this.renderProdukJsx()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        id : state.user.id,
        username : state.user.username
    }
}

export default connect(mapStateToProps,{cartCount})(ProductList);