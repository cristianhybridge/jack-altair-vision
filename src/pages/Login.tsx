import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFaceDetection } from "../hooks/useFaceDetection.ts";
import FaceSelector from "./FaceRecognition/FaceSelector.tsx";
import { useNavigate } from "react-router-dom";

type Props = {};
function Login({}: Props) {
  const navigate = useNavigate();
  const [useFace, setUseFace] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const { mutate, data, isPending } = useFaceDetection(userId);
  const handleVerify = (file: File) => {
    mutate(file);
  };
  const handleLogin = () => {
    navigate("/");
  };
  const handleClick = () => {
    setUseFace(!useFace);
  };
  return (
    <>
      <form>
        <Flex m={8} justify="center" align="center">
          <Box>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>Usuario</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Button type="submit" colorScheme="green">
                Iniciar sesión
              </Button>
              <Button colorScheme="yellow" onClick={() => handleClick()}>
                Autenticar con Rostro
              </Button>
              {useFace && <FaceSelector onSuccess={handleLogin} />}
            </VStack>
          </Box>
        </Flex>
      </form>
    </>
  );
}

export default Login;
