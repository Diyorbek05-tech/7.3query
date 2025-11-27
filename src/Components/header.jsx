import { Container, Flex } from '@mantine/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <Container>
      <Flex align="center" justify="space-between" p="md" bg="light">
      <h3>LOGO</h3>
      <Flex gap='md'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </Flex>
    </Flex>
    </Container>
  )
}

export default Header