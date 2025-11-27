import { Container, Flex, Button, Text, Paper, Group, Avatar, Menu, UnstyledButton, rem } from '@mantine/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice';
import { IconChevronDown, IconLogout, IconSettings, IconUser } from '@tabler/icons-react';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector(state => state.auth);

  function handleLogin() {
    dispatch(login({
      isAuth: true,
      user: {
      }
    }));
  }
  
  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Paper shadow="sm" style={{ borderBottom: '1px solid #e9ecef' }}>
      <Container size="xl">
        <Flex align="center" justify="space-between" py="md">
          {/* Logo */}
          <Text 
            size="xl" 
            fw={700} 
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          >
            LOGO
          </Text>

          {/* Navigation & Auth */}
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
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton>
                    <Group gap="xs">
                      <Avatar color="blue" radius="xl" size="sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                          {user?.name}
                        </Text>
                      </div>
                      <IconChevronDown size={16} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item 
                    leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item 
                    leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button 
                variant="filled" 
                color="blue" 
                onClick={handleLogin}
                radius="md"
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