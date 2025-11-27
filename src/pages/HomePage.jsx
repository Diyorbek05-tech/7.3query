import React, { useState } from 'react';
import { 
  Container, 
  Title, 
  Button, 
  Accordion, 
  TextInput, 
  Textarea,
  Group,
  Stack,
  Paper,
  Modal,
  Text,
  Loader,
  Center,
  ActionIcon,
  Flex,
  Badge,
  Card
} from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const API = 'https://faq-crud.onrender.com/api/faqs';

const Homepage = () => {
  const [opened, setOpened] = useState(false);
  const [editId, setEditId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  
  const { isAuth, user } = useSelector(state => state.auth);
  const queryClient = useQueryClient();

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data } = await axios.get(API);
      return Array.isArray(data) ? data : data.data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newFaq) => {
      const { data } = await axios.post(API, newFaq);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
      handleClose();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(`${API}/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${API}/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
    }
  });

  const handleSubmit = () => {
    if (!question.trim() || !answer.trim()) return;

    const faqData = { question: question.trim(), answer: answer.trim() };

    if (editId) {
      updateMutation.mutate({ id: editId, data: faqData });
    } else {
      createMutation.mutate(faqData);
    }
  };

  const handleEdit = (faq) => {
    setEditId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOpened(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Sen o‘chirmoqchimisan?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleClose = () => {
    setOpened(false);
    setEditId(null);
    setQuestion('');
    setAnswer('');
  };

  const handleAddNew = () => {
    setEditId(null);
    setQuestion('');
    setAnswer('');
    setOpened(true);
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack spacing="xl">
        
        {/* HEADER */}
        <Flex justify="space-between" align="center">
          <Flex align="center" gap="md">
            <Title
              order={1}
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              FAQ Bo'limi
            </Title>

            {isAuth && user && (
              <Badge color="teal" size="lg" radius="lg" variant="filled">
                {user.name}
              </Badge>
            )}
          </Flex>

          {isAuth && (
            <Button 
              leftIcon={<IconPlus size={18} />} 
              onClick={handleAddNew}
              radius="md"
              size="md"
            >
              Qo‘shish
            </Button>
          )}
        </Flex>

        
        {/* FAQ LIST */}
        {faqs.length === 0 ? (
          <Paper p="xl" withBorder radius="lg" shadow="sm">
            <Text align="center" color="dimmed">FAQ hali mavjud emas</Text>
          </Paper>
        ) : (
          <Card withBorder radius="lg" shadow="md" p="xl">
            <Accordion variant="separated" radius="md">
              {faqs.map((faq) => (
                <Accordion.Item 
                  key={faq.id} 
                  value={faq.id.toString()}
                >

                  <Accordion.Control>
                    <Text weight={600} size="lg">
                      {faq.question || 'No title'}
                    </Text>
                  </Accordion.Control>

                  <Accordion.Panel>
                    <Stack spacing="sm">
                      <Text color="dimmed">{faq.answer || 'No content'}</Text>

                      {isAuth && (
                        <Group spacing="xs">
                          <ActionIcon 
                            color="blue" 
                            variant="light"
                            size="lg"
                            radius="md"
                            onClick={() => handleEdit(faq)}
                          >
                            <IconEdit size={18} />
                          </ActionIcon>

                          <ActionIcon 
                            color="red" 
                            variant="light"
                            size="lg"
                            radius="md"
                            onClick={() => handleDelete(faq.id)}
                            loading={deleteMutation.isLoading}
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Group>
                      )}
                    </Stack>
                  </Accordion.Panel>

                </Accordion.Item>
              ))}
            </Accordion>
          </Card>
        )}

      </Stack>

      
      {/* MODAL */}
      <Modal
        opened={opened}
        onClose={handleClose}
        title={editId ? 'FAQ Tahrirlash' : 'Yangi FAQ'}
        centered
        radius="lg"
        overlayProps={{
          blur: 4,
          opacity: 0.15
        }}
      >
        <Stack spacing="md">
          <TextInput
            label="Savol"
            placeholder="Savolingiz..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            radius="md"
            required
          />
          <Textarea
            label="Javob"
            placeholder="Javob..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            minRows={3}
            radius="md"
            required
          />

          <Group position="right" mt="md">
            <Button variant="default" radius="md" onClick={handleClose}>
              Bekor qilish
            </Button>
            <Button 
              onClick={handleSubmit}
              radius="md"
              loading={createMutation.isLoading || updateMutation.isLoading}
            >
              {editId ? 'Saqlash' : 'Yaratish'}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default Homepage;
