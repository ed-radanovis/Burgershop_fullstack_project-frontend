import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone'
import LibraryAddTwoToneIcon from '@mui/icons-material/LibraryAddTwoTone'
import paths from '../../constants/paths'

const listLinks = [
    {
        id: 1,
        label: 'Pedidos',
        link: paths.Order,
        icon: ShoppingBagTwoToneIcon
    },
    {
        id: 2,
        label: 'Listar Produtos',
        link: paths.Products,
        icon: ShoppingCartTwoToneIcon
    },
    {
        id: 3,
        label: 'Novo Produto',
        link: paths.NewProduct,
        icon: LibraryAddTwoToneIcon 
    }
]

export default listLinks