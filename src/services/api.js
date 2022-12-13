import axios from 'axios'

// const apiCodeBurger = axios.create({
//     baseURL: 'http://localhost:3010'
// })

const apiCodeBurger = axios.create({
    baseURL: 'https://e-commerce-burgershop-api.onrender.com'
})


apiCodeBurger.interceptors.request.use(async config => {
    const userData = await localStorage.getItem('codebuger:userData')
    const token = userData && JSON.parse(userData).token
    config.headers.authorization = `Bearer ${token}`
    return config
})

export default apiCodeBurger