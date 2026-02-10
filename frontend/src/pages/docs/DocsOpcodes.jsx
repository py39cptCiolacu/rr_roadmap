import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { opcodes } from "../../data/opcodes";

export default function DevOpcodes() {
  return (
    <>
      <Navbar />
      <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
        <Typography
          variant="h4"
          fontFamily="JetBrains Mono"
          fontWeight={700}
          gutterBottom
        >
          Opcodes Table
        </Typography>

        <Typography
          sx={{ mb: 3, maxWidth: 900 }}
          fontFamily="JetBrains Mono"
          color="text.secondary"
        >
          This table describes the bytecode instructions used by the RR virtual
          machine. Each opcode operates on a stack-based execution model.
        </Typography>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 2,
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#20455f" }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontFamily: "JetBrains Mono",
                    fontWeight: 700,
                  }}
                >
                  OPCODE
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontFamily: "JetBrains Mono",
                    fontWeight: 700,
                  }}
                >
                  DESCRIPTION
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontFamily: "JetBrains Mono",
                    fontWeight: 700,
                  }}
                >
                  STACK EFFECT
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {opcodes.map((row) => (
                <TableRow key={row.opcode} hover>
                  <TableCell
                    sx={{
                      fontFamily: "JetBrains Mono",
                      fontWeight: 700,
                      color: "#20455f",
                    }}
                  >
                    {row.opcode}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "JetBrains Mono" }}>
                    {row.explanation}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "JetBrains Mono",
                      color: "text.secondary",
                    }}
                  >
                    {row.stack}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          sx={{ mt: 3, maxWidth: 900 }}
          fontFamily="JetBrains Mono"
          color="warning.main"
        >
          Opcodes marked with (*) have implementation-dependent or non-standard
          behavior. Their exact stack effects or execution semantics may depend
          on the interpreter loop or external side effects.
        </Typography>
      </Box>
    </>
  );
}
