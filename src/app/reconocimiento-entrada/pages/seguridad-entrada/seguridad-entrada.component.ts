import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReconocimientoEntradaService } from '../../services/reconocimiento-entrada.service';
import { Infractor } from 'src/app/infractor/interfaces/infractor.interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-seguridad-entrada',
  templateUrl: './seguridad-entrada.component.html',
  styleUrls: ['./seguridad-entrada.component.css']
})
export class SeguridadEntradaComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef;
  videoDevices: MediaDeviceInfo[] = [];
  selectedDeviceId!: string;
  running: boolean = true;
  mediaStream!: MediaStream;

  infractor!: Infractor | undefined;
  foto!: string | undefined;
  estado!: string | undefined;

  captureInterval: any;
  canvas!: HTMLCanvasElement;
  photoData!: string;

  constructor(
    private readonly reconocimientoFacialService: ReconocimientoEntradaService,
  ) { }

  ngOnInit() {
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
    }, 10000);
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
      const formData = new FormData();
      if (!blob) return;
      formData.append('photo', blob, 'photo.png');
      this.reconocimientoFacialService.ReconocimientoFacial(blob)
        .pipe(
          catchError(err => of(this.infractor = undefined))
        ).subscribe(
          (infractorRQ) => {
            console.log(infractorRQ);
            this.infractor = infractorRQ;
            this.foto = infractorRQ?.fotos[0].dir!;
            this.estado = 'Ingreso permitido';
            this.infractor?.infracciones.forEach(infraccion => {
              if (infraccion.estado === 'Pendiente' || infraccion.estado === 'En proceso') {
                this.estado = 'Ingreso denegado';
                return;
              }
            });
            return;
          }
        );

    }, 'image/png', 1);
  }

  stop() {
    if (this.mediaStream) {
      const tracks = this.mediaStream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.running = false;
      clearInterval(this.captureInterval);
      // this.clean();
    }
  }

  clean() {
    this.infractor = undefined;
    this.foto = 'https://w7.pngwing.com/pngs/321/641/png-transparent-load-the-map-loading-load-waiting.png';
    this.estado = 'Cargando...';
  }

  ngOnDestroy() {
    this.stop();
    clearInterval(this.captureInterval);
  }

}
