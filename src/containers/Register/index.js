import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Button, ErrorMessage } from '../../components'
import RegisterImg from '../../assets/register-image-2.svg'
import Logo from '../../assets/logo-1.svg'
import api from '../../services/api'
import {
    Container,
    RegisterImage,
    ContainerItens,
    Label,
    Input,
    SignInLink
} from './styles'

export function Register() {

    const schema = Yup.object().shape({
        name: Yup.string().required('Obrigatório a inserção do nome'),
        email: Yup.string().email('Digite um e-mail válido').required('Obrigatório a inserção de um e-mail'),
        password: Yup.string().required('Obrigatório a inserção de uma senha').min(6, 'A senha deve ter ao menos 6 dígitos'),
        confirmPassword: Yup.string().required('Obrigatório a inserção de uma senha').oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
      })

    const { 
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm({
        resolver: yupResolver(schema)
      })

    const onSubmit = async clientData => {
        try{
            const {status} = await api.post('users', {
                name: clientData.name,  
                email: clientData.email,
                password: clientData.password   
            }, 
            { validateStatus: () => true }
        )

        if (status === 201 || status === 200){
            toast.success('Cadastro criado com sucesso!!!')
        } else if (status === 409){
            toast.error('E-mail já cadastrado! Faça login para continuar')
        } else {
            throw new Error()
        }
            
        }catch(err){
            toast.error('Falha no sistema! Tente novamente')
        }
    }

    return (
        <Container>
            <RegisterImage src={RegisterImg} alt='register-image' />
            <ContainerItens>
                <img src={Logo} alt='logo-codebuger-1' />
                <h1>Cadastre-se</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Label>Nome</Label>
                    <Input 
                    type='text' 
                    {...register('name')}
                    error={errors.name?.message}
                    />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                    
                    <Label>Email</Label>
                    <Input 
                    type='email' 
                    {...register('email')}
                    error={errors.email?.message}
                    />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>

                    <Label>Senha</Label>
                    <Input 
                    type='password'
                    {...register('password')}
                    error={errors.password?.message}
                    />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>

                    <Label>Confirmar Senha</Label>
                    <Input 
                    type='password'
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    />
                    <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

                    <Button type='submit' style={{marginTop: 25, marginBottom: 15}} >Sign Up</Button>
                </form>
                <SignInLink>
                    Já possui conta? {}
                    <Link style={{color: 'white'}} to='/login'>
                        Sign In
                    </Link>
                </SignInLink>
            </ContainerItens>
        </Container>

    )
}

