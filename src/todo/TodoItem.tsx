import { Box, Button, Text } from "@chakra-ui/react";
import { memo } from "react";
import { todoType } from "../types";

interface Props extends todoType {
  onClick: (id: string) => void;
}

const TodoItem = (props: Props) => {
  const { id, content, onClick } = props;
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Text flex={1} wordBreak="break-word">
        {content}
      </Text>
      <Button onClick={() => onClick(id)}>X</Button>
    </Box>
  );
};

export default memo(TodoItem);
