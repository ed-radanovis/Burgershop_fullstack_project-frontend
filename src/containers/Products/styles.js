import styled from 'styled-components'

export const Container = styled.div`
    background: #E5E5E5;
    min-height: calc(100vh - 72px);
`

export const ProductsImg = styled.img`
    width: 100%;
`

export const CategoriesMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 20px;
`

export const CategoriesButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    border-bottom:  ${props => (props.isActiveCategory && '2px solid #9758A6')};
    color: ${props => (props.isActiveCategory ? '#9758A6' : '#9A9A9D')};
    font-size: 17px;
    line-height: 20px;
    padding-bottom: 5px; 

`

export const ProductsContainer = styled.div`
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 20px;
        padding: 40px;
        justify-items: center;
        margin-top: 20px;
`