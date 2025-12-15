import { Box, Heading, Text, Stack, Badge, HStack } from "@chakra-ui/react";
import { GetReportDetailsType } from "../../schemes/ReportDetails.scheme";

type Props = {
  report: GetReportDetailsType;
};

function ReportItem({ report }: Props) {
  const date = new Date(report.created_at);
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      shadow="sm"
      _hover={{ shadow: "md", bg: "gray.50", cursor: "pointer" }}
      transition="all 0.2s"
    >
      <Stack spacing={2}>
        {/* Title */}
        <HStack justify="space-between" w="full">
          <Heading size="sm">{report.title}</Heading>
          <Text fontSize="xs" color="gray.500">
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </Text>
        </HStack>

        {/* Message preview */}
        <Text noOfLines={2} fontSize="sm" color="gray.700">
          {report.message}
        </Text>

        {/* Footer info */}
        <Stack direction="row" justify="space-between" align="center">
          <Badge colorScheme="blue">Área #{report.work_area_id}</Badge>
          <Badge size="">Turno {report.enterprise_shift_id}</Badge>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ReportItem;
