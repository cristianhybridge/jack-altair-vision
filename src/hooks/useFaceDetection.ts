import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type FaceDetectionType = {
  success: boolean;
  confidence?: number;
  reason?: string;
};

export function useFaceDetection(userId: number) {
  const apiUrl = `http://127.0.0.1:5000/api/face-detection/verify/${userId}`;
  return useMutation<FaceDetectionType, Error, File>({
    mutationFn: async (imageFile: File) => {
      const formData = new FormData();
      formData.append("requester_face", imageFile);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
}
