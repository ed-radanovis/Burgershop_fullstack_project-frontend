import React from 'react'

import PropTypes from 'prop-types'

import { useCart } from '../../hooks/CartContext'
import { Button } from '../Button'
import {
    Container,
    Image,
    ProductName,
    ProductPrice
} from './styles'
import { useHistory } from 'react-router-dom'

export function ProductCards({ product }){
    const { putProductInCart } = useCart()
    const { push } = useHistory()

    return (
        <Container>
            <Image src={product.url} alt='imagem do produto' />
            <div>
                <ProductName>{ product.name }</ProductName>
                <ProductPrice>{ product.formattedPrice }</ProductPrice>
                <Button 
                    onClick={() => {
                        putProductInCart(product)
                        push('/carrinho')
                    }}
                >
                    Adicionar
                </Button>
            </div>
        </Container>
    )
}

ProductCards.propTypes = {
    product: PropTypes.object
}