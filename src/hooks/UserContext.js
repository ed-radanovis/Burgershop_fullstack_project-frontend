import React, { createContext, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'

const UserContext = createContext({})

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({})

    const putUserData = async userInfo => {
        setUserData(userInfo)

        await localStorage.setItem('codebuger:userData', JSON.stringify(userInfo))
    }

    const logoutUser = async () => {
        await localStorage.removeItem('codebuger:userData')
    }
    
    useEffect(() => {
        const loadUserData = async () => {
            const clientInfo = await localStorage.getItem('codebuger:userData')
            
            if(clientInfo){
                setUserData(JSON.parse(clientInfo))
            }

        }

        loadUserData()
    }, [])

    return (
        <UserContext.Provider value={{ putUserData, userData, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error('useUser must be used with UserContext')
    }

    return context
}

UserProvider.propTypes = {
    children: PropTypes.node
}