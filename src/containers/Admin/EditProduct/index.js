import React, { useEffect, useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { useHistory } from 'react-router-dom'


import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

import api from '../../../services/api'
import { 
  Container,
  Label,
  Input,
  ButtonStyles,
  LabelUpload,
  ContainerInput
} from './styles'

import { ErrorMessage } from '../../../components'
import { toast } from 'react-toastify'


function EditProduct (){
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const {
    push,
    location: {
      state: { product }
    }
  } = useHistory()

  const schema = yup.object().shape({
    name: yup.string().required('Digite o nome do produto'),
    price: yup.string().required('Digite o valor do produto'),
    category: yup.object().required('Escolha uma categoria'),
    offer: yup.bool()     
  })

  const { 
    register,
    handleSubmit,
    control,
    formState:{ errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])
    productDataFormData.append('offer', data.offer)

    await toast.promise(
      api.put(`products/${product.id}`, productDataFormData), {
        pending: 'Editando produto...',
        success: 'Produto editado com sucesso',
        error: 'Falha ao editar o produto'
    })

    setTimeout(() => {
      push('/listar-produtos')
    }, 2000)
  } 
    
    useEffect(() => {
        async function loadCategories() {
          const { data } = await api.get('categories')
          
          setCategories(data)
        }
        loadCategories()
      }, [])

    return (
        <Container>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label>Nome</Label>
              <Input
                type='text'
                {...register('name')}
                defaultValue={product.name}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>

            <div>
              <Label>Preço</Label>
              <Input
                type='number'
                {...register('price')}
                defaultValue={product.price}  
              />
              <ErrorMessage>{errors.price?.message}</ErrorMessage>
            </div>

            <div>
              <LabelUpload>
                {fileName || (
                  <>
                  <CloudUploadTwoToneIcon />
                  Carregue a imagem do produto
                  </>
                )}
                <input 
                  type='file'
                  accept='image/png, image/jpeg'
                  {...register('file')}
                  onChange={value => {
                    setFileName(value.target.files[0]?.name)
                  }}
                />
              </LabelUpload>
              <ErrorMessage>{errors.file?.message}</ErrorMessage>
            </div>

            <div>
              <Controller 
                name='category'
                control={control}
                defaultValue={product.category}
                render={({ field }) => {
                  return (
                    <ReactSelect
                      {...field} 
                      options={categories}
                      getOptionLabel={cat => cat.name}
                      getOptionValue={cat => cat.id}
                      placeholder='Categorias'
                      defaultValue={product.category}
                    />
                  )
                }}
              ></Controller>
              <ErrorMessage>{errors.category?.message}</ErrorMessage>
              </div>

              <ContainerInput>
                <input
                  type='checkbox'
                  {...register('offer')}
                  defaultChecked={product.offer}
                />
                <Label>Produto em oferta ?</Label>
              </ContainerInput>
            <ButtonStyles>Editar produto</ButtonStyles>
          </form>  
        </Container>
    )
}

export default EditProduct

