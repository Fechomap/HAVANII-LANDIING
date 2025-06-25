INSTRUCCIONES PARA EL VIDEO DEMO:

Para completar la implementación del botón "Watch Demo", debes colocar tu video de demostración aquí con el nombre:

havani-demo.mp4

Este debe ser un video de aproximadamente 30 segundos que muestre las características principales de tu producto/servicio. El modal está configurado para reproducir automáticamente este video cuando se abre.

Especificaciones recomendadas:
- Duración: 30 segundos
- Formato: MP4 (H.264)
- Resolución: 1080p (1920x1080) o 720p (1280x720)
- Audio: AAC, estéreo
- Tamaño máximo recomendado: 10MB para mejor rendimiento

Si necesitas modificar el nombre o ruta del video, puedes editarlo en el archivo:
/src/components/sections/Hero/HeroSection.tsx 
(busca la línea: const [videoSrc, setVideoSrc] = useState('/videos/havani-demo.mp4');)
