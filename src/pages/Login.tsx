import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFaceDetection } from "../hooks/useFaceDetection.ts";
import FaceSelector from "./FaceRecognition/FaceSelector.tsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [useFace, setUseFace] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(); // default userId for testing
  const [password, setPassword] = useState<string>(); // default userId for testing
  const { mutateAsync, data, isPending, isSuccess, isError } =
    useFaceDetection();

  useEffect(() => {
    if (isSuccess && data?.verified) {
      handleLogin();
    }
  }, [isSuccess, data]);

  const handleVerify = async (file: File, userId: number) => {
    try {
      const result = await mutateAsync({ imageFile: file, userId });
      if (result.verified) {
        handleLogin();
      } else {
        console.log("Face verification failed", result);
      }
    } catch (err) {
      console.error("Verification error:", err);
    }
  };

  useEffect(() => {
    if (isSuccess && data?.verified) {
      handleLogin();
    }
  }, [isSuccess, data]);

  const handleLogin = () => {
    navigate("/reports");
  };

  const handleClick = () => {
    setUseFace(!useFace);
  };

  return (
    <form>
      <Flex m={8} justify="center" align="center">
        <Box>
          <VStack spacing={5}>
            <FormControl>
              <FormLabel>Usuario</FormLabel>
              <Input
                type="number"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
                placeholder="Numero de empleado..."
              />
            </FormControl>

            {!useFace && (
              <>
                <FormControl>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña..."
                  />
                </FormControl>
                <Button colorScheme="green">Iniciar sesión</Button>
              </>
            )}

            {useFace && (
              <FaceSelector
                userId={userId}
                onVerify={handleVerify}
                verificationLoading={isPending}
                verificated={isSuccess}
              />
            )}
            <Button colorScheme="yellow" onClick={handleClick}>
              {!useFace ? <>Autenticar con Rostro</> : <>Regresar</>}
            </Button>

            {isError && (
              <>
                <h1>Inicio de sesión fallido, intenta nuevamente.</h1>
              </>
            )}
            {isPending && (
              <>
                <Spinner />
              </>
            )}
            {isSuccess && (
              <>
                <h1>OK!</h1>
              </>
            )}
          </VStack>
        </Box>
      </Flex>
    </form>
  );
}

export default Login;
