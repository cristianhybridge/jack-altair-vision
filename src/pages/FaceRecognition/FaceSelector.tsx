import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  onVerify: (file: File, userId: number) => void;
  verificationLoading: boolean;
  verificated: boolean;
  userId: number;
};

function FaceSelector({
  onVerify,
  verificationLoading,
  verificated,
  userId,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  const handleVerify = () => {
    if (!file) return;
    onVerify(file, userId);
  };
  return (
    <>
      <FormControl>
        <FormLabel>Reconocimiento facial</FormLabel>
        <Input type="file" accept="image/*" onChange={handleChange} />
      </FormControl>
      <Button
        onClick={handleVerify}
        disabled={!file || verificationLoading || verificated}
      >
        Verificar
      </Button>
    </>
  );
}

export default FaceSelector;
