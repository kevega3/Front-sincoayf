import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { getVentas } from "../Services/ventaServices";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

function Reportes() {
  const [data, searchData] = useState([]);
  // Calcular totales
  const totalVentas = data.reduce((sum, item) => sum + item.SumasVentas, 0);
  const totalVehiculos = data.reduce(
    (sum, item) => sum + item.cantidadVehiculos,
    0
  );

  // Datos para el gráfico de pastel
  const pieData = data.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.Tipo);
    if (existingItem) {
      existingItem.value += item.SumasVentas;
    } else {
      acc.push({ name: item.Tipo, value: item.SumasVentas });
    }
    return acc;
  }, []);

  const getDatos = async () => {
    const { data: response } = await getVentas();
    searchData(response.data);
  };

  useEffect(() => {
    getDatos();
  }, []);

  return (
    <div className="p-8" style={{ padding: "30px", background: "#fafafa" }}>
      <Typography variant="h4" color="#2a3eb1" gutterBottom>
        Ventas de Vehículos 2024
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen de Ventas
              </Typography>
              <Typography variant="body1">
                Total de Ventas: ${totalVentas.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                Total de Vehículos Vendidos: {totalVehiculos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detalle de Ventas por Modelo
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Modelo</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Ventas</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.Modelo}>
                        <TableCell component="th" scope="row">
                          {row.Modelo}
                        </TableCell>
                        <TableCell>{row.Tipo}</TableCell>
                        <TableCell align="right">
                          {row.cantidadVehiculos}
                        </TableCell>
                        <TableCell align="right">
                          ${row.SumasVentas.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} align={"center"}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ventas por Modelo
              </Typography>
              <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="Modelo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="SumasVentas" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} align={"center"}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribución de Ventas por Tipo
              </Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  cx={200}
                  cy={150}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default Reportes;
