import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  invitacionAbierta = false;

  // Variables del contador
  dias: string = '00';
  horas: string = '00';
  minutos: string = '00';
  segundos: string = '00';

  // PON AQUÍ LA FECHA DE LA BODA (Ej: 24 de Octubre de 2026 a las 18:00)
  fechaBoda = new Date('Oct 24, 2026 18:00:00').getTime();

  ngOnInit() {
    this.iniciarContador();
  }

  abrirInvitacion() {
    this.invitacionAbierta = true;
    setTimeout(() => {
      this.reproducirMusica();
    }, 100);
  }

  reproducirMusica() {
    const audio = document.getElementById('miMusica') as HTMLAudioElement;
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }

  abrirUbicacionCeremonia() {
    window.open('https://maps.app.goo.gl/pJCyL8aCPjgiTKX86', '_blank');
  }

  abrirUbicacionRecepcion() {
    window.open('https://maps.app.goo.gl/ELe3kE9JgWd772mR8', '_blank');
  }

  enviarFormulario(event?: any) {
    // Freno para que no recargue la página
    if (event) {
      event.preventDefault();
    }

    const form = document.getElementById('formulario-asistencia') as HTMLFormElement;

    if (form) {
      // 1. Recolectamos el nombre que escribió el invitado
      const datos = new FormData(form);

      // 2. AGREGAMOS LOS NUEVOS DATOS AUTOMÁTICOS PARA EL EXCEL:
      // Agregamos la columna de Estado
      datos.append('Estado', 'Nueva confirmación');

      // Calculamos la fecha y hora exacta en ese instante
      const fechaExacta = new Date().toLocaleString('es-PE');
      datos.append('Fecha y Hora', fechaExacta);

      // 3. Tu enlace de SheetMonkey
      const url = 'https://api.sheetmonkey.io/form/3wZb1b4fyHSACnNaa5KB3d';

      // 4. Envío silencioso
      fetch(url, {
        method: 'POST',
        body: datos,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(respuesta => {
        if (respuesta.ok) {
          alert("¡Gracias por confirmar tu asistencia!");
          form.reset();
        } else {
          alert("Hubo un error al enviar. Por favor, intenta de nuevo.");
        }
      })
      .catch(error => {
        alert("Revisa tu conexión a internet e intenta de nuevo.");
      });
    }
  }
mostrarDatosBancarios() {
    alert("¡Muchas gracias por el detalle!\n\n💳 Mi número de cuenta BCP Soles es:\n47000933894079\n\n🏦 Mi número de cuenta interbancaria es:\n00247010093389407934");
  }
  iniciarContador() {
    setInterval(() => {
      const ahora = new Date().getTime();
      const diferencia = this.fechaBoda - ahora;

      if (diferencia > 0) {
        this.dias = Math.floor(diferencia / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        this.horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        this.minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        this.segundos = Math.floor((diferencia % (1000 * 60)) / 1000).toString().padStart(2, '0');
      }
    }, 1000);
  }
}
