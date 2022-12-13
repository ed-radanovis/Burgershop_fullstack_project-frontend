import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'

import Categories from '../../assets/categories.png'
import {Container, 
        CategoriesImg,
        ContainerItems,
        Image,
        Button     
} from './styles'
import api from '../../services/api'

export function CategoriesCarousel(){
    const [categories, setcategories] = useState([])
    useEffect(() => {
        async function loadCategories(){
            const { data} = await api.get('categories')

            setcategories(data)
        }

        loadCategories()
    }, [])

    const breakpoints = [
        {width: 1, itemsToShow: 1 },
        {width: 400, itemsToShow: 2 },
        {width: 600, itemsToShow: 3 },
        {width: 900, itemsToShow: 4 },
        {width: 1300, itemsToShow: 5 }
    ]  

    return (
        <Container>
           <CategoriesImg src={Categories} alt='logo de categorias' />
           <Carousel 
            itemsToShow={5}
            style={{ width: '90%'}}
            breakPoints={breakpoints}
           >
            {categories &&
                 categories.map( category => (
                    <ContainerItems key={category.id}>
                        <Image src={category.url} alt='foto da categoria' />
                        <Button 
                            to={{
                                pathname: '/produtos',
                                state: { categoryId: category.id } 
                            }}
                        >
                        {category.name}</Button>
                    </ContainerItems>           
                ))}
            </Carousel> 
        </Container>
    )
}

