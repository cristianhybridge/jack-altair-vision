import CreateReport from "./Reports/CreateReport.tsx";
import { Box, VStack } from "@chakra-ui/react";
import ReportsList from "./Reports/ReportsList.tsx";

function Home() {
  return (
    <>
      <Box ms={8}>
        <VStack
          position="fixed"
          top="55"
          left="0"
          w="500px"
          bg="white"
          spacing={4}
          p={4}
        >
          <CreateReport />
        </VStack>

        <Box ml="500px" p={4}>
          <ReportsList />
        </Box>
      </Box>
    </>
  );
}

export default Home;
