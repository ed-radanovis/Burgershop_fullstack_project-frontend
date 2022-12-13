import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import { Container } from './styles'
import { Button } from '../Button'
import currencyFormatting from '../../utils/currencyFormatting'

export function CartResume() {
  const [finalPrice, setFinalPrice] = useState(0)
  const [deliveryTax] = useState(10)

  const { cartProducts } = useCart()

  useEffect(() => {

    const sumAllItems = cartProducts.reduce(( acc, current) => {
      return current.price * current.quantity + acc
    }, 0)

    setFinalPrice(sumAllItems)
  }, [cartProducts, deliveryTax])

  const submitOrder = async () => {
    const order = cartProducts.map(product => {
      return { id: product.id, quantity: product.quantity}
    })

    await toast.promise(api.post('orders', {products: order}), {
      pending: 'Realizando o seu pedido ...',
      success: 'Pedido realizado com sucesso',
      error: 'Falha ao tentar realizar seu pedido, tente novamente'
    })
    
    
  }

  return (
    <div>
      <Container>
        <div className='container-top'>
          <h2 className='title'>Resumo do Pedido</h2>
          <p className='items'>Itens</p>
          <p className='items-price'>{currencyFormatting(finalPrice)}</p>
          <p className='delivery-tax'>Taxa de entrega</p>
          <p className='delivery-tax-price'>{currencyFormatting(deliveryTax)}</p>
        </div>
        <div className='container-bottom'>
          <p>Total</p>
          <p>{currencyFormatting(finalPrice + deliveryTax)}</p>
        </div>
      </Container>
      <Button style={{width: '100%', marginTop: 30}} onClick={submitOrder}>
        Finalizar Pedido
      </Button>
    </div>
  )
}

