import React, { useEffect, useState } from 'react'

import ProductsLogo from '../../assets/products-logo.svg'
import { ProductCards } from '../../components'
import api from '../../services/api'
import currencyFormatting from '../../utils/currencyFormatting'
import {
        Container,
        ProductsImg,
        CategoriesButton,
        CategoriesMenu,
        ProductsContainer
        } from './styles'


export function Products ({ location: {state} }) {

    let categoryId = 0
    if(state?.categoryId){
        categoryId = state.categoryId
    }
    
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState(categoryId)

    useEffect(() => {
        async function loadCategories(){
            const { data } = await api.get('categories')

            const newCategories = [{ id: 0, name: 'Todas' }, ...data]

            setCategories(newCategories)
        }

        async function loadProducts(){
            const { data: allProducts } = await api.get('products')

            const newProducts = allProducts.map( product => {
                return { ...product, formattedPrice: currencyFormatting(product.price) }
            })

            setProducts(newProducts)
        }

        loadProducts()
        loadCategories()
    }, [])

    useEffect( () => {
        if(activeCategory === 0){
            setFilteredProducts(products)
        } else {
        const newFilteredProducts = products.filter( product => product.category_id === activeCategory )
        
        setFilteredProducts(newFilteredProducts)
        }
    }, [activeCategory, products])

    return (
        <Container>
           <ProductsImg src={ProductsLogo} alt='logo de produtos' />
           <CategoriesMenu>
           {categories && categories.map(categories => (
                <CategoriesButton 
                    type='button'
                    key={categories.id}
                    isActiveCategory={activeCategory === categories.id}
                    onClick={() => {
                        setActiveCategory(categories.id)
                    }} >
                    {categories.name}
                </CategoriesButton>
           ))}
           </CategoriesMenu>
           <ProductsContainer>
                    { filteredProducts && 
                        filteredProducts.map(product => (
                        <ProductCards key={product.id} product={product} />
                        ))}
           </ProductsContainer>
        </Container>
    )
}

