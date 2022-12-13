import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'

import Offers from '../../assets/offers.png'
import { useCart } from '../../hooks/CartContext'
import {Container, 
        CategoriesImg,
        ContainerItems,
        Image,
        Button    
} from './styles'
import currencyFormatting from '../../utils/currencyFormatting'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

export function OffersCarousel(){
    const [offers, setoffers] = useState([])
    const { putProductInCart } = useCart()
    const { push } = useHistory()
    
    useEffect(() => {
        async function loadOffers(){
            const { data } = await api.get('products')

            const onlyOffers = data
            .filter(product => product.offer)
            .map( product => {
                return { ...product, formattedPrice: currencyFormatting(product.price) }
            })

            setoffers(onlyOffers)
        }

        loadOffers()
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
           <CategoriesImg src={Offers} alt='logo de ofertas' />
           <Carousel 
           itemsToShow={5}
           style={{ width: '90%'}}
           breakPoints={breakpoints}
           >
                {offers &&
                 offers.map( product => (
                    <ContainerItems key={product.id}>
                        <Image src={product.url} alt='foto do produto' />
                        <p>{product.name}</p>
                        <p>{product.formattedPrice}</p>
                        <Button 
                            onClick={() => {
                                putProductInCart(product)
                                push('/carrinho')
                            }}
                        >
                            Peça Agora
                        </Button>
                    </ContainerItems>           
                ))}
            </Carousel> 
        </Container>
    )
}

