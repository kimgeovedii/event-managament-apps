import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slider, Typography, Box } from "@mui/material";
import getCroppedImg from "@/utils/cropImage";

interface ImageCropperModalProps {
  open: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
  title?: string;
  aspectRatio?: number;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  open,
  imageSrc,
  onClose,
  onCropComplete,
  title = "Crop Image",
  aspectRatio = 1,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const handleCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsProcessing(true);
    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedFile) {
        onCropComplete(croppedFile);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to crop image.");
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers sx={{ p: 0, position: "relative", height: 400, bgcolor: "#333" }}>
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={onCropChange}
            onCropComplete={handleCropComplete}
            onZoomChange={onZoomChange}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", px: 3, py: 2, alignItems: "stretch", gap: 2 }}>
        <Box sx={{ width: "100%", px: 2 }}>
          <Typography gutterBottom variant="caption">
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(Number(zoom))}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, width: "100%" }}>
          <Button onClick={onClose} disabled={isProcessing} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isProcessing || !imageSrc} variant="contained" color="primary">
            {isProcessing ? "Processing..." : "Crop & Save"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
