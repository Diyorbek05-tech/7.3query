import { Button, Container, Input, PasswordInput, Text, Paper } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { API_DUMMY } from '../api/API'
import useAuthStore from '../store/useAuth'
import { Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form"

const Login = () => {
  const { login, isAuth } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    }
  })

  const { mutate: loginMut } = useMutation({
    mutationFn: async (body) => {
      const res = await API_DUMMY.post('/auth/login', body);
      return res.data;
    }
  });

  if (isAuth) return <Navigate to="/" />

  const onSubmit = (data) => {
    loginMut(data, {
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

  const usernameValue = watch("username", "");
  const passwordValue = watch("password", "");

  const invalidStyle = {
    backgroundColor: "#ffe6e6",
    borderColor: "#ff4d4d",
    transition: "0.2s ease",
  };

  const validStyle = {
    backgroundColor: "white",
    transition: "0.2s ease",
  };

  return (
    <Container size={420} pt={40}>
      <Paper shadow="md" radius="lg" p={30} withBorder>
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder='Username'
            {...register("username", {
              required: "Username majburiy",
              minLength: {
                value: 5,
                message: "Kamida 5 belgi kiriting"
              }
            })}
            style={usernameValue.length < 5 ? invalidStyle : validStyle}
          />
          {errors.username && (
            <Text size="sm" c="red" mt={5}>{errors.username.message}</Text>
          )}

          <PasswordInput
            placeholder="Parol"
            {...register("password", {
              required: "Parol majburiy",
              minLength: {
                value: 5,
                message: "Parol kamida 5 belgidan iborat bo‘lishi kerak"
              }
            })}
            mt="sm"
            style={passwordValue.length < 5 ? invalidStyle : validStyle}
          />
          {errors.password && (
            <Text size="sm" c="red" mt={5}>{errors.password.message}</Text>
          )}

          <Button
            fullWidth
            type="submit"
            mt="lg"
            radius="lg"
            style={{
              background: "linear-gradient(135deg, #7F57FF, #C27FFF)",
              boxShadow: "0 4px 12px rgba(127, 87, 255, 0.3)",
              fontWeight: 600,
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
