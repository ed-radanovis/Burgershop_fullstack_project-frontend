import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone'
import currencyFormatting from '../../../utils/currencyFormatting'

import api from '../../../services/api'
import { Container, Img, EditIcon } from './styles'
import paths from '../../../constants/paths'


function ListProducts (){
    const [products, setProducts] = useState()
    const { push } = useHistory()
    
    useEffect(() => {
        async function loadOrders() {
          const { data } = await api.get('products')
    
          setProducts(data)
        }
        loadOrders()
      }, [])

      function isOffer(offerStatus) {
        if (offerStatus) {
          return <CheckCircleTwoToneIcon style={{color: '#32CD32'}}/>
        }
        return <CancelPresentationTwoToneIcon style={{color: '#CC1717'}} />
      }

      function editProduct(product){
        push(paths.EditProduct, { product })
      }

    return (
        <Container>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Produtos</TableCell>
            <TableCell align='center'>Preço</TableCell>
            <TableCell align='center'>Ofertas</TableCell>
            <TableCell align='center'>Amostra</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products && products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align='center'>{currencyFormatting(product.price)}</TableCell>
              <TableCell align='center'>{isOffer(product.offer)}</TableCell>
              <TableCell align='center'>
                <Img src={product.url} alt='imagem-produto' />
              </TableCell>
              <TableCell>
                <EditIcon onClick={() => editProduct(product)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
    )
}

export default ListProducts

