import { Box, VStack } from "@chakra-ui/react";
import ReportForm from "./ReportForm.tsx";


function CreateReport() {
  return (
    <Box maxW="lg" mt={8}>
      <VStack spacing={2} align="stretch">
        <ReportForm />
      </VStack>
    </Box>
  );
}

export default CreateReport;
