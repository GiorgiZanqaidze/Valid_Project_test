import { Link } from 'react-router-dom'
import '../main.scss'
import '../App.css'
import { useGlobalContext } from '../context'
import axios from 'axios'
import React from 'react'


export const ProductList = () => {
    const {dataList, setDataList, productTypes} = useGlobalContext()


    

    // delete checked list items
    const massDelete = (e) => {
        e.preventDefault()

        // this data is only for front-end
        const filteredData = dataList.filter(item => !item.ischecked)
        setDataList(filteredData)

        // i need here request to delete selected products ************************************
        const deletedData =  dataList.filter(item => item.ischecked).map(item => item.id)
        // console.log(deletedData)

        const deleteRequest = () => {
      
            // axios.delete(`http://localhost/API_test/product/${deletedData[0]}`).then(function(response){
            //     console.log(response);
            //     // setDataList(response.data);
            // });
            // axios.delete(`http://localhost/API_test/product/${deletedData[1]}`).then(function(response){
            //     console.log(response);
            //     // setDataList(response.data);
            // });

            deletedData.forEach(element => {
                    axios.delete(`http://localhost/API_test/product/${element}`).then(function(response){
                    console.log(response);
                    // setDataList(response.data);
                });
            });

            
        }
        
        deleteRequest()

        // axios.delete(`http://localhost/API_test/product/${deletedData[0]}`).then(function(response){
        //     console.log(response);
        //     // setDataList(response.data);
        // });



    }
    // set checked items 
    const checkhandle = (id) => {
        const targetItem = dataList.find(item => item.id === id)
        const newItem = {...targetItem, ischecked: !targetItem.ischecked}


        // change old value with new
        const newData = dataList.map((item) => {
            if (item.id === targetItem.id) {
                return newItem
            } else {
                return item
            }
        })
        // set modified list to new data list
        setDataList(newData)
    }


  return (
    <>
        <header className='navigation'>
            <h1>Product List</h1>
            <div className='btns-wraper'>
                <Link to='/AddProduct' className='btn'>ADD</Link>
                <button onClick={massDelete} id='delete-product-btn' className='btn'>MASS DELETE</button>
            </div>
        </header>
        <ul className='box-border container'>
            {dataList.map((list, index) => {
                const {id, sku, name, price, ischecked, type, description} = list
                // console.log(list)

                // find product's current type for relevant description
                const currentProduct = productTypes.find(item => item.type === type)

                // this logic is for 'furniture' type product. It Changes  commas to "x" signs.
                let editDescribtion = description.split(',').join('x')
                
                return <li key={index}>
                            <input type="checkbox" className='delete-checkbox' checked={ischecked} onChange={() => checkhandle(id)}/>
                            <h3>{sku}</h3>
                            <p>{name}</p>
                            <p>{price}$</p>
                            <p>{currentProduct.specialAttr}: {editDescribtion} {currentProduct.measure}</p>
                        </li>
            })}
        </ul>
    </>
  )
  
}

