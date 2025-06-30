"use client";
import { Button } from "@/components/ui/button";
import { DownloadCertificateProps } from "./DownloadCertificate.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas-pro";
import { Certificate } from "./Certificate";


export function DownloadCertificate(props: DownloadCertificateProps) {
  const { userName, titleCourse } = props;

  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certRef.current) return;
  
    // Preload de la imagen de fondo
    const bgImage = new Image();
    bgImage.src = '/Certificado.jpg';
    await new Promise((resolve) => {
      bgImage.onload = resolve;
    });

    // Esperar un frame y un breve delay para asegurar renderizado
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => setTimeout(resolve, 100));
  
    // Obtener dimensiones reales del certificado
    const certWidth = certRef.current.offsetWidth;
    const certHeight = certRef.current.offsetHeight;
  
    // Configurar html2canvas con escalado para alta resolución
    const canvas = await html2canvas(certRef.current, {
      width: certWidth,
      height: certHeight,
      scale: window.devicePixelRatio || 2, // Ajusta según tu necesidad
      backgroundColor: null, // Mantén transparencia si es necesario
    });
  
    // Crear y disparar la descarga
    const link = document.createElement("a");
    link.download = `certificado-${titleCourse}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          Descargar Certificados
          <Download className="w-4 h-4 ml-2" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full !max-w-[1000px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <Certificate userName={userName} titleCourse={titleCourse} certRef={certRef} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDownload}>
            Descargar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
