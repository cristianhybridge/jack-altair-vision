import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {GetReportDetailsType, PostReportDetailsType} from "../schemes/ReportDetails.scheme.ts";
import axios from "axios";

export function useReportDetails() {
  const getApiUrl = `http://127.0.0.1:5000/api/reports`
  return useQuery<GetReportDetailsType[]>({
    queryKey: ["report_details"],
    staleTime: 0,
    queryFn: () =>
      axios
        .get<GetReportDetailsType[]>(getApiUrl)
        .then((res) => res.data),
  });
}

export function useCreateReports() {
  const queryClient = useQueryClient();
  const postApiUrl = `http://127.0.0.1:5000/api/reports`

  return useMutation({
    mutationFn: (newReport: PostReportDetailsType) =>
      axios.post(postApiUrl, newReport).then((res) => res.data),
    onSuccess: (createdData) => {
      queryClient.invalidateQueries({queryKey: ["report_details"]});
      console.log("Create OK: ", createdData);
    },
    onError: (errorMessage) => {
      console.error("Failed to create report: ", errorMessage);
    }
  })
}