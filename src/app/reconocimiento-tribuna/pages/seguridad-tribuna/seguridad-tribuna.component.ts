import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReconocimientoTribunaService } from '../../services/reconocimiento-tribuna.service';
import { Alerta } from 'src/app/alerta/interfaces/alerta.interface';
import { FilesetResolver, ImageClassifier, Detection, Classifications, ImageClassifierResult } from '@mediapipe/tasks-vision';

@Component({
  selector: 'app-seguridad-tribuna',
  templateUrl: './seguridad-tribuna.component.html',
  styleUrls: ['./seguridad-tribuna.component.css']
})
export class SeguridadTribunaComponent implements OnDestroy, OnInit {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef;
  videoDevices: MediaDeviceInfo[] = [];
  selectedDeviceId!: string;
  running: boolean = true;
  mediaStream!: MediaStream;

  alerta!: Alerta | undefined;
  foto!: string | undefined;
  estado!: string | undefined;

  captureInterval: any;
  canvas!: HTMLCanvasElement;
  photoData!: string;

  imageClassifier?: ImageClassifier;
  classificationResult?: ImageClassifierResult;

  constructor(
    private readonly reconocimientoTribunaService: ReconocimientoTribunaService,
  ) { }

  async ngOnInit() {
    await this.createImageClassifier();
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        this.videoDevices = devices.filter((device) => device.kind === 'videoinput');
        if (this.videoDevices.length > 0) {
          this.selectedDeviceId = this.videoDevices[0].deviceId; // seleccionar el primer dispositivo por defecto
          this.startCamera();
        }
      })
      .catch((error) => {
        console.error('Error al enumerar los dispositivos:', error);
      });

    this.foto = 'https://w7.pngwing.com/pngs/321/641/png-transparent-load-the-map-loading-load-waiting.png';
    this.estado = 'Cargando...';
  }

  async createImageClassifier() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    this.imageClassifier = await ImageClassifier.createFromOptions(
      vision,
      {
        baseOptions: { modelAssetPath: `assets/modelo_mediapipe/model_gradas2.tflite` },
        maxResults: 2,
        runningMode: "IMAGE"
      }
    );
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: { deviceId: this.selectedDeviceId } })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.mediaStream = stream;
        this.running = true;
        this.startCaptureInterval();
      })
      .catch((error) => {
        console.error('Error al acceder a la cámara:', error);
      });
  }

  onDeviceChange(event: any) {
    this.selectedDeviceId = event.target.value;
    clearInterval(this.captureInterval);
    this.startCamera();
  }

  startCaptureInterval() {
    this.captureInterval = setInterval(() => {
      this.capturePhoto();
    }, 3000);
  }

  capturePhoto() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.videoElement.nativeElement.videoWidth;
      this.canvas.height = this.videoElement.nativeElement.videoHeight;
    }

    const context = this.canvas.getContext('2d');
    context?.drawImage(this.videoElement.nativeElement, 0, 0, this.canvas.width, this.canvas.height);

    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = 800;
    resizedCanvas.height = 600;
    const resizedContext = resizedCanvas.getContext('2d');
    resizedContext?.drawImage(this.canvas, 0, 0, resizedCanvas.width, resizedCanvas.height);
    resizedCanvas.toBlob((blob) => {
      if (!blob) return;
      if (!this.imageClassifier) throw new Error('El clasificador de imágenes no ha sido inicializado');
      const image = document.createElement('img');
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (e: any) => {
        image.src = e.target.result;
        image.onload = () => {
          const imageClassifierResult = this.imageClassifier?.classify(image);
          console.log(imageClassifierResult?.classifications[0]?.categories[0]?.categoryName + ': ' + imageClassifierResult?.classifications[0]?.categories[0]?.score);
          const score = imageClassifierResult?.classifications[0]?.categories[0]?.score || 0;
          if (score >= 0.8) {
            clearInterval(this.captureInterval);
            this.createAlarma(blob, imageClassifierResult?.classifications[0]?.categories[0]?.categoryName || '');
          }
        };
      };
    }, 'image/png', 1);
  }

  async createAlarma(blob: Blob, motivo: string) {
    const formData = new FormData();
    formData.append('photo', blob, 'photo.png');
    this.reconocimientoTribunaService.reconocimientoTribuna(blob, {
      motivo: motivo,
      fecha: new Date().toISOString().slice(0, 10),
      hora: new Date().toISOString().slice(11, 19),
    }).subscribe(
      (alertaDB) => {
        if (!alertaDB) return this.alerta = undefined;
        this.alerta = alertaDB;
        console.log(this.alerta);
        this.foto = this.alerta.imagenes[0].dir;
        this.startCaptureInterval();
        return;
      }
    );
  }

  stop() {
    if (this.mediaStream) {
      const tracks = this.mediaStream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.running = false;
      clearInterval(this.captureInterval);
      this.clean();
    }
  }

  clean() {
    this.alerta = undefined;
    this.foto = 'https://w7.pngwing.com/pngs/321/641/png-transparent-load-the-map-loading-load-waiting.png';
    this.estado = 'Cargando...';
  }

  ngOnDestroy() {
    this.stop();
    clearInterval(this.captureInterval);
  }
}
