import { useEffect, useState, useRef, useCallback } from "react";
import {
  Container,
  Input,
  Button,
  Box,
  VStack,
  StackDivider,
  Card,
  CardHeader,
  Heading,
  CardBody,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { todoType } from "../types";
import { generateID } from "../utils/generateID";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState<todoType[]>(() => {
    const value = JSON.parse(localStorage.getItem("todolist") || "[]");
    return value;
  });
  const [todo, setTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (!todo) {
      alert("input bi trong!");
      return;
    }

    setTodos((prev) => [...prev, { id: generateID(todo), content: todo }]);
    setTodo("");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleDelete = useCallback(
    (id: string) => {
      const value: todoType[] = todos.filter((todo) => todo.id !== id);
      setTodos(value);
    },
    [todos]
  );

  return (
    <Container p={5}>
      <Box display="flex">
        <Input
          placeholder="Type anything..."
          ref={inputRef}
          value={todo}
          onChange={handleChange}
          borderRightRadius="none"
        />
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => handleAdd()}
          leftIcon={<AddIcon />}
          borderLeftRadius="none"
        >
          ADD
        </Button>
      </Box>
      <Card mt={3}>
        <CardHeader>
          <Heading>Todo List</Heading>
        </CardHeader>
        <CardBody>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
            mt={3}
          >
            {todos.map((todo) => (
              <TodoItem key={todo.id} onClick={handleDelete} {...todo} />
            ))}
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default TodoList;
