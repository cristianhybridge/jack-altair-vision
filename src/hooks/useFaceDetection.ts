import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type FaceDetectionType = {
  verified: boolean;
  confidence?: number;
};

type FaceDetectionParams = {
  imageFile: File;
  userId: number;
};

export function useFaceDetection() {
  return useMutation<FaceDetectionType, Error, FaceDetectionParams>({
    mutationFn: async ({ imageFile, userId }: FaceDetectionParams) => {
      const apiUrl = `http://127.0.0.1:5000/api/face-detection/verify/${userId}`;

      const formData = new FormData();
      formData.append("requester-face", imageFile);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
}
