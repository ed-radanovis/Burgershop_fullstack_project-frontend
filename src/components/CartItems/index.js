/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

import { useCart } from '../../hooks/CartContext'
import { Container, Header, Body, EmptyCart } from './styles'
import currencyFormatting from '../../utils/currencyFormatting'

export function CartItems (){
    const { cartProducts, increaseProducts, decreaseProducts } = useCart()
    
    return (
        <Container>
            <Header>
                <p></p>
                <p>Itens</p>
                <p>Preço</p>
                <p style={{ paddingRight: 30 }}>Quantidade</p>
                <p>Total</p>
            </Header>

            {cartProducts && cartProducts.length > 0 ?
            cartProducts.map(product => (
            <Body key={product.id}>
                <img src={product.url} />
                <p>{product.name}</p>
                <p>{currencyFormatting(product.price)}</p>
                <div className='quantity-container'>
                    <button onClick={() => decreaseProducts(product.id)}>-</button>
                    <p>{product.quantity}</p>
                    <button onClick={() => increaseProducts(product.id)}>+</button>
                </div>
                <p>{currencyFormatting(product.quantity * product.price)}</p>  
            </Body>
            )) : (
                <EmptyCart>Carrinho Vazio</EmptyCart>
            ) }
        </Container>
    )
}

