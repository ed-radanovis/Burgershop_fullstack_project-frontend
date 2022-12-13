import React, { useEffect, useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { useHistory } from 'react-router-dom'


import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

import api from '../../../services/api'
import { Container, Label, Input, ButtonStyles, LabelUpload } from './styles'
import { ErrorMessage } from '../../../components'
import { toast } from 'react-toastify'


function NewProduct (){
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const { push } = useHistory()

  const schema = yup.object().shape({
    name: yup.string().required('Digite o nome do produto'),
    price: yup.string().required('Digite o valor do produto'),
    category: yup.object().required('Escolha uma categoria'), 
    file: yup.mixed()
    .test('required', 'Insira uma imagem', value => {
      return value?.length > 0 
    })
    .test('fileSize', 'Carregue arquivos de até 4MB', value => {
      return value[0]?.size <= 400000
    })
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

    await toast.promise(api.post('products', productDataFormData), {
      pending: 'Criando novo produto...',
      success: 'Produto criado com sucesso',
      error: 'Falha ao criar novo produto'
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
              <Input type='text' {...register('name')} />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>

            <div>
              <Label>Preço</Label>
              <Input type='number' {...register('price')} />
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
                render={({ field }) => {
                  return (
                    <ReactSelect
                      {...field} 
                      options={categories}
                      getOptionLabel={cat => cat.name}
                      getOptionValue={cat => cat.id}
                      placeholder='Categorias'
                    />
                  )
                }}
              ></Controller>
              <ErrorMessage>{errors.category?.message}</ErrorMessage>
              </div>

            <ButtonStyles>Adicionar produto</ButtonStyles>
          </form>  
        </Container>
    )
}

export default NewProduct

