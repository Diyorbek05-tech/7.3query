import { Button, Container, Input, Notification, PasswordInput } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { API_DUMMY } from '../api/API'
import useAuthStore from '../store/useAuth'
import { Navigate } from 'react-router-dom'

const Login = () => {
    const {login, isAuth} = useAuthStore()
    const {mutate: loginMut } = useMutation({
        mutationFn: async (body) => {
            const res = await API_DUMMY.post('/auth/login', body);

            return res.data;
        }
    });

    if(isAuth) return <Navigate to="/" />

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            username: e.target[0].value,
            password: e.target[1].value,
        };

        loginMut(body, {
            onSuccess: (res) => {
                login(res);
                
            },
            onError: (err) => {
                notifications.show({
                    title: err.response.data.message || 'Xatolik',
                    color: 'red',
                })
            }
        })
    }
  return (
    <Container>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <Input type="text" name='username' placeholder='Username kiriting' defaultValue='emilys'/>
            <PasswordInput
              placeholder="Password kiriting"
              defaultValue="emilyspass"
            />            
            <Button type="submit">Login</Button>
        </form>
    </Container>
  )
}

export default Login