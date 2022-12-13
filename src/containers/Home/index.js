import React from 'react'

import HomeLogo from '../../assets/home-logo.svg'
import { CategoriesCarousel, OffersCarousel } from '../../components'
import {Container, HomeImg } from './styles'


export function Home (){
    return (
        <Container>
            <HomeImg src={HomeLogo} alt='logo da home' />
            <CategoriesCarousel />
            <OffersCarousel />
        </Container>
    )
}

