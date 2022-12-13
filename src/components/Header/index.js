import React from 'react'
import { useHistory } from 'react-router-dom'

import { useUser } from '../../hooks/UserContext'
import Cart from '../../assets/cart-drawing.svg'
import Person from '../../assets/person-drawing.svg'

import { 
    Container,
    ContainerLeft,
    PageLink,
    ContainerRight,
    ContainerText,
    Line,
    PageLinkExit
} from './styles'

export function Header (){
    const { logoutUser, userData } = useUser()
    const { push, location: { pathname } } = useHistory()
    const logout = () => {
        logoutUser()
        push('/')
    }
    return (
        <Container>
            <ContainerLeft>
                <PageLink onClick={() => push('/')} isActive={pathname === '/'}>
                    Home
                </PageLink>
                <PageLink onClick={() => push('/produtos')} isActive={pathname.includes('produtos')}>
                    Ver Produtos
                </PageLink>
            </ContainerLeft>

            <ContainerRight>
                <PageLink onClick={() => push('/carrinho')}>
                    <img src={Cart} alt='desenho de carrinho' />  
                </PageLink>
                <Line></Line>
                <PageLink>
                    <img src={Person} alt='desenho de pessoa' />
                </PageLink>
                <ContainerText>
                    <p>Olá, {userData.name}!</p>
                    <PageLinkExit onClick={logout}>Sair</PageLinkExit>
                </ContainerText>  
            </ContainerRight>           
        </Container>
    )
}

