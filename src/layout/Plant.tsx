import React, { useState } from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import AppModal from "./AppModal.tsx";

const Plant: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pvValue, setPvValue] = useState<number>(0);
  const [orderNumber, setOrderNumber] = useState<number>(0);

  return (
    <Card
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f4f4f4",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Supervisory System - Liquid Feeding
      </Typography>

      {/* Layout Grid para posicionamento das imagens */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto",
          alignItems: "center",
          justifyItems: "center",
          gap: 2,
          position: "relative",
        }}
      >
        {/* Bomba (Base) */}
        <CardMedia
          component="img"
          image="/images/pump.jpg"
          alt="Pump"
          sx={{
            maxWidth: "250px",
            maxHeight: "250px",
            objectFit: "contain",
            gridColumn: "1",
            gridRow: "2",
          }}
        />

        {/* Tanque (Centro) */}
        <CardMedia
          component="img"
          image="/images/tank.jpg"
          alt="Industrial Tank"
          sx={{
            width: 300,
            height: 500,
            gridColumn: "2",
            gridRow: "1 / span 2",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        />
        {/* Indicação do PV no tanque */}
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "75%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          {pvValue} kg
        </Typography>

        <AppModal
          title={"Inserção de Valores"}
          spLabel={"SP: "}
          pvLabel={"PV: "}
          orderNumberLabel={"Order Number"}
          setOrderNumber={setOrderNumber}
          pvValue={pvValue}
          orderNumber={orderNumber}
          setPvValue={setPvValue}
          open={open}
          handleClose={handleClose}
          imageSrc="/images/valve.jpg"
        />

        {/* Válvula (Topo) */}
        <CardMedia
          component="img"
          image="/images/valve.jpg"
          alt="Valve"
          sx={{
            width: 100,
            height: 100,
            gridColumn: "1",
            gridRow: "1",
            alignSelf: "start",
          }}
        />

        {/* Tubulação (Simulação com Box) */}
        <Box
          sx={{
            width: 10,
            height: 100,
            backgroundColor: "#555",
            position: "absolute",
            top: "15%",
            left: "66%",
          }}
        />
        <Box
          sx={{
            width: 300,
            height: 10,
            backgroundColor: "#555",
            position: "absolute",
            top: "15%",
            left: "29%",
          }}
        />
      </Box>
      <Box
        sx={{
          width: 10,
          height: 226,
          backgroundColor: "#555",
          position: "absolute",
          top: "22%",
          left: "30%",
        }}
      />
      <Box
        sx={{
          width: 47,
          height: 10,
          backgroundColor: "#555",
          position: "absolute",
          top: "21%",
          left: "30%",
        }}
      />
    </Card>
  );
};

export default Plant;
