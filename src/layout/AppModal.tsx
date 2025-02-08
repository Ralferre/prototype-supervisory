import { Box, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";

import { useRef, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

interface AppModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  spLabel: string;
  pvLabel: string;
  orderNumberLabel: string;
  pvValue: number;
  orderNumber: number;
  setPvValue: React.Dispatch<React.SetStateAction<number>>;
  setOrderNumber: React.Dispatch<React.SetStateAction<number>>;
  imageSrc: string;
}

const AppModal: React.FC<AppModalProps> = ({
  open,
  handleClose,
  title,
  spLabel,
  pvLabel,
  orderNumberLabel,
  pvValue,
  setPvValue,
  imageSrc,
}) => {
  const [spValue, setSpValue] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleApply = () => {
    console.log("SP Value = ", spValue);
    console.log("Production Order", orderNumber);
    setPvValue(0); // Reinicia PV antes de iniciar a dosagem

    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Garante que não há intervalos ativos
    }

    intervalRef.current = setInterval(() => {
      setPvValue((prev: number) => {
        if (prev >= spValue) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          return spValue;
        }
        return prev + 1; // Incrementa PV
      });
    }, 500); // Intervalo de incremento

    handleClose();
    console.log("PV Value = ", pvValue);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Box
          sx={{
            ...style,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography id="modal-title" variant="h6">
            {title}
          </Typography>
          <TextField
            label={orderNumberLabel}
            fullWidth
            value={orderNumber}
            onChange={(e) => setOrderNumber(Number(e.target.value))}
          />
          <TextField
            label={spLabel}
            fullWidth
            value={spValue}
            onChange={(e) => setSpValue(Number(e.target.value))}
          />
          <TextField
            label={pvLabel}
            fullWidth
            value={pvValue}
            onChange={(e) => setPvValue(Number(e.target.value))}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleApply}>
              Aplicar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Fechar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AppModal;
