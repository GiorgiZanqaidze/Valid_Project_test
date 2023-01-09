import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'




const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const [dataList, setDataList] = useState([])
    const [listItem, setListItem] = useState({})
            
            
        

        // product types data
    const productTypes = [
        {
            type: "dvd",
            description: ["size"],
            measure: "MB",
            specialAttr: "size"
        },
        {
            type: "book",
            description: ['weight'],
            measure: "KG",
            specialAttr: "weight" 
        },
        {
            type: "furniture",
            description: ["height", "length", "width"],
            measure: "CM",
            specialAttr: "dimmension"
        }
    ]



    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/API_test/product').then(function(response) {
            // console.log(response.data);

            // add each item ischecked prop with boolean value for checkboxes
            const newData = response.data.map(item => {
                return (
                    {...item, ischecked: false}
                )
            })
            // set modified data 
            setDataList(newData);
        });
    }


    return (
        <AppContext.Provider
            value={{
                dataList,
                setDataList,
                listItem,
                setListItem,
                productTypes,
            }}
        >
            {children}
        </AppContext.Provider>
    )
    
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }