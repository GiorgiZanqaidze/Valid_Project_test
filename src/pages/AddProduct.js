// import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import '../main.scss'
import '../App.css'

import axios from 'axios'



export const AddProduct = () => {
    const navigate = useNavigate()
    const {listItem, setListItem, productTypes} = useGlobalContext()
    

    const handleChange = (e) => {
        const {name, value} = e.target
        // handle on change inputs. Navigate to products list.
        if (name === "width" || name === "length" || name === "height") {
            setListItem((prev) => {
                const description1 = {
                    ...prev,
                    [name]: value
                }                
                return {
                    ...prev,
                    [name]: value,
                    description: `${description1.height},${description1.length},${description1.width}`,
                }
            })
        } else if (name === "size" || name === "weight"){
            setListItem((prev) => {
            return {
                    ...prev,
                    description: value,
                    }
             })
        } else {
            setListItem((prev) => {
            return {
                    ...prev,
                    [name]: value,
                    }
             })
        }

        console.log(listItem)
    }

    // handle on submit form. Navigate to products list.
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost/API_test/product', listItem).then(function(response){
            console.log(response.data);
            navigate('/');
            window.location.reload();
        })
    }

   
    
    // find the type that the user choose
    const chosenType = productTypes.find(item => item.type === listItem.type)

  return (
    <>
        <header className='navigation'>
            <h1>Add product</h1>
            <div className='btns-wraper'>
                <button onClick={handleSubmit} id='delete-product-btn' className='btn'>Save</button>
                <Link to='/' className='btn'>Cancel</Link>
            </div>
        </header>
        <form className='product_form box-border container' id='product_form' onSubmit={handleSubmit}>
            <div className='item-container'>
                <label htmlFor='sku'>SKU</label>
                <input type='text' name="sku" id='sku' onChange={handleChange} /><br />
            </div>
                <div className='item-container'>
                <label htmlFor='name'>Name</label>
            <input type='text' name="name" id='name' onChange={handleChange} /><br />
            </div>
            <div className='item-container'>
                <label htmlFor='price'>Price ($)</label>
                <input type='text' name="price" id='price' onChange={handleChange} />
            </div>
            <div className='item-container'>
                <label htmlFor='type'>Type Switcher</label>
                <select name="type" id="productType" onChange={handleChange}>
                    <option value="null">Type Switcher</option>
                    {productTypes && productTypes.map((item) => {
                        const loverCase = item.type
                        const upperCase = item.type[0].toUpperCase() + item.type.substring(1)
                        return <option key={loverCase} value={loverCase}>{upperCase}</option>
                    })}
                </select>
            </div>
            <div className='item-container'>
                {chosenType && chosenType.description.map((item, index) => {
                    // uppercase string for inputs labels
                    const uppercaseStr = item[0].toUpperCase() + item.substring(1)
                    return <div className='item-type-container' key={index}>
                                <label htmlFor={`${item}`}>{`${uppercaseStr} (${chosenType.measure})`}</label>
                                <input type='text' name={item} id={`${item}`} onChange={handleChange}/>
                            </div>
                })}
                <div className='description'>
                    {chosenType && `Please, provide ${chosenType.specialAttr} in ${chosenType.measure}.`}
                </div>
            </div>
        </form>
    </>
  )
}
  
  
