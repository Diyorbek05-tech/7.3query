import { Container, Flex, Button, Text, Paper, Group } from '@mantine/core';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const { isAuth, user, logout } = useAuthStore();

  return (
    <Paper shadow="sm" style={{ borderBottom: '1px solid #e9ecef' }}>
      <Container size="xl">
        <Flex align="center" justify="space-between" py="md">
          <Text 
            size="xl" 
            fw={700} 
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          >
            LOGO
          </Text>

          <Group gap="xl">
            <Group gap="lg">
              <NavLink 
                to="/" 
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? '#228be6' : '#495057',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '15px',
                  transition: 'color 0.2s'
                })}
              >
                Home
              </NavLink>
            </Group>

            {isAuth ? (
              <Flex align="center" gap="md">
                <Text size="sm" fw={500}>{user?.firstName}</Text>
                <Button size="xs" color="red" onClick={logout}>
                  Logout
                </Button>
              </Flex>
            ) : (
              <Button 
                variant="filled" 
                color="blue"
                radius="md"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
          </Group>
        </Flex>
      </Container>
    </Paper>
  );
};

export default Header;