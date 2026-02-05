"use client";

import { Container, Typography, Box, Button, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { RocketLaunchIcon, BeakerIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 6,
              borderRadius: 4,
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Stack spacing={4} alignItems="center">
              <Box sx={{ display: "flex", gap: 2 }}>
                <RocketLaunchIcon className="h-12 w-12 text-blue-600" />
                <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                  Event Platform FE
                </Typography>
              </Box>

              <Typography variant="h5" color="text.secondary">
                Frontend scaffold is ready with <b>Feature-Based</b> structure.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<BeakerIcon className="h-5 w-5" />}
                  sx={{ px: 4 }}
                >
                  Get Started
                </Button>
                <Button variant="outlined" size="large" sx={{ px: 4 }}>
                  Documentation
                </Button>
              </Stack>

              <Box sx={{ pt: 4, textAlign: "left", width: "100%" }}>
                <Typography variant="subtitle2" color="primary" fontWeight="bold">
                  Tech Stack Verified:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✅ Next.js 15+ (App Router) <br />
                  ✅ Material UI & Emotion <br />
                  ✅ Zustand (State Management) <br />
                  ✅ Framer Motion (Animations) <br />
                  ✅ Formik & Yup (Forms) <br />
                  ✅ Axios & js-cookie (Infrastructure)
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
}
