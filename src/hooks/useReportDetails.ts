import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetReportDetailsType,
  PostReportDetailsType,
} from "../schemes/ReportDetails.scheme.ts";
import axios from "axios";

const MOCK_REPORTS: GetReportDetailsType[] = [
  {
    report_details_id: 1,
    title: "Falla de charola",
    work_area_id: 4,
    responsible_id: 101,
    message: "Nozzle quebrado debido a charola pandeada",
    created_at: "2025-12-17T08:30:00Z",
    enterprise_shift_id: 1,
    loss_time_count: 28,
  },
  {
    report_details_id: 2,
    title: "Falla de motor",
    work_area_id: 2,
    responsible_id: 102,
    message: "Motor detenido por sobrecalentamiento",
    created_at: "2025-12-17T09:15:00Z",
    enterprise_shift_id: 1,
    loss_time_count: 45,
  },
  {
    report_details_id: 3,
    title: "Retraso en línea",
    work_area_id: 3,
    responsible_id: 103,
    message: "Retraso en la línea debido a mantenimiento",
    created_at: "2025-12-17T10:00:00Z",
    enterprise_shift_id: 2,
    loss_time_count: 20,
  },
];

// Hook using the mock data
export function useReportDetails() {
  return useQuery<GetReportDetailsType[]>({
    queryKey: ["report_details"],
    staleTime: 0,
    queryFn: () =>
      // Simulate async API call
      new Promise<GetReportDetailsType[]>((resolve) => {
        setTimeout(() => resolve(MOCK_REPORTS), 500); // optional delay
      }),
  });
}

// export function useReportDetails() {
//   const getApiUrl = `http://127.0.0.1:5000/api/reports`
//   return useQuery<GetReportDetailsType[]>({
//     queryKey: ["report_details"],
//     staleTime: 0,
//     queryFn: () =>
//       axios
//         .get<GetReportDetailsType[]>(getApiUrl)
//         .then((res) => res.data),
//   });
// }

export function useCreateReports() {
  const queryClient = useQueryClient();
  const postApiUrl = `http://127.0.0.1:5000/api/reports`;

  return useMutation({
    mutationFn: (newReport: PostReportDetailsType) =>
      axios.post(postApiUrl, newReport).then((res) => res.data),
    onSuccess: (createdData) => {
      queryClient.invalidateQueries({ queryKey: ["report_details"] });
      console.log("Create OK: ", createdData);
    },
    onError: (errorMessage) => {
      console.error("Failed to create report: ", errorMessage);
    },
  });
}
