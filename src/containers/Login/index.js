import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { useUser } from '../../hooks/UserContext'
import { Button, ErrorMessage } from '../../components'
import LoginImg from '../../assets/login-image-2.svg'
import Logo from '../../assets/logo-1.svg'
import api from '../../services/api'
import {
    Container,
    LoginImage,
    ContainerItens,
    Label,
    Input,
    SignInLink
} from './styles'

export function Login() {
    const history = useHistory()
    const { putUserData } = useUser()
    
    const schema = Yup.object().shape({
        email: Yup.string().email('Digite um e-mail válido').required('Obrigatório a inserção de um e-mail'),
        password: Yup.string().required('Obrigatório a inserção de uma senha').min(6, 'A senha deve ter ao menos 6 dígitos')
      })

    const { 
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm({
        resolver: yupResolver(schema)
      })

    const onSubmit = async clientData => {
        const { data } = await toast.promise(
            api.post('sessions', {
                email: clientData.email,
                password: clientData.password   
            }),
            {
            pending: 'Verificando seus dados',
            success: 'Seja bem-vindo(a)',
            error: 'Verifique seu e-mail e senha'
            }
        )
        
        putUserData(data)

        setTimeout(() => {
            if(data.admin){
                history.push('/pedidos')
            } else {
                history.push('/') 
            }
        }, 1000);       
    }

    return (
        <Container>
            <LoginImage src={LoginImg} alt='login-image-2' />
            <ContainerItens>
                <img src={Logo} alt='logo-codebuger-1' />
                <h1>Login</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
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

                    <Button type='submit' style={{marginTop: 30, marginBottom: 25}} >Sign In</Button>
                </form>
                <SignInLink>
                    Não possui conta? {} 
                    <Link style={{ color: 'white' }} to='/cadastro'>
                        Sign Up
                    </Link>
                </SignInLink>
            </ContainerItens>
        </Container>

    )
}

