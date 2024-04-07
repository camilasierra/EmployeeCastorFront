import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

/**
 * Servicio para manejar las alertas
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  loadingModal(title: string){
    Swal.fire({
      title,
      allowOutsideClick:  !Swal.isLoading(),
      didOpen: () => {
        Swal.showLoading();
      },
    })
  }

  cerrarModal(){
    Swal.close()
  }

  /**
   * Metodo que permite montar un sweetAlert exitoso
   * @param title titulo de la alerta
   */
  successModal(title: string) {
    Swal.fire({
      title,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }

  /**
   * Metodo que permite montar un sweetAlert tipo toast exitoso
   * @param title titulo de la alerta
   */
  successToast(title: string) {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  }

  /**
   * Metodo que permite montar un sweetAlert de error
   * @param title titulo de la alerta
   * @param mensaje mensaje del error
   */
  errorModal(title: string, mensaje?: string) {
    Swal.fire({
      title,
      icon: 'error',
      text: mensaje,
      confirmButtonText: 'Aceptar',
    });
  }

  /**
   * Metodo que permite montar un sweetAlert tipo toast de error
   * @param title titulo del error
   */
  errorToast(title: string) {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  }

  /**
   * Metodo que permite montar un sweetAlert de advertencia - informacion
   * @param title titulo de la alerta
   */
  infoModal(title: string) {
    Swal.fire({
      title,
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  }

  /**
   * Metodo que permite montar un sweetAlert tipo toast de advertencia - informacion
   * @param title titulo de la alerta
   */
  infoToast(title: string) {
    Swal.fire({
      position: 'top',
      icon: 'info',
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  }

  /**
   * Metodo que permite montar un sweetAlert personalizado
   * @param title titulo de la alerta
   * @param confirmButtonText texto del boton de confirmacion
   * @param cancelButtonText texto del boton de cancelacion
   * @param confirmButtonAction accion del boton de confirmacion
   * @param cancelButtonAction accion del boton de cancelacion
   * @param icon icono de la alerta
   * @returns retorna una promesa con la accion del boton de confirmacion y cancelacion
   */
  customModal(title: string, confirmButtonText: string, cancelButtonText: string, confirmButtonAction: any, cancelButtonAction: any, icon: any) {
    return Swal.fire({
      title: title,
      icon: icon,
      confirmButtonText: confirmButtonText,
      denyButtonText: cancelButtonText,
      showCancelButton: false,
      showCloseButton: true,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmButtonAction();
      }
      else if (result.isDenied) {
        cancelButtonAction();
      }
    })
  }

  /**
   * Metodo que permite montar un sweetAlert personalizado con html
   * @param title titulo de la alerta
   * @param html contenido html de la alerta
   * @param confirmButtonText texto del boton de confirmacion
   * @returns promesa con la accion del boton de confirmacion
   */
  htmlAlert(title: any, html: any, confirmButtonText: any) {
    return Swal.fire({
      title: title,
      html: html,
      confirmButtonText: confirmButtonText,
      customClass: 'swal-wide',
    });

  }

  htmlAlertQti(title: any, html: any, confirmButtonText: any) {
    return Swal.fire({
      title: title,
      html: html,
      confirmButtonText: confirmButtonText,
      width: '850px'
    });
  }

  /**
   * Metodo que permite montar un sweetAlert con enlace para carga de archivos
   * @author Juan David Guerrero Vargas
   * @param {title} string titluo de la alerta
   * @param {html} string html renderizar como cuerpo de la alerta
   * @param {customClass} string cadena de texto con las clases a aplicar sobre terminados botones
   * @param {confirmButtonText} string label del boton de confirmacion
   * @param {showCancelButton} boolean valor apra determinar si se muestra o no boton de Cancel en el modal
   * @param {input} HTMLElement refrencia o Nodo Input tipo file con el cual se cargaran las imagenes desde el boton
   * @returns {Promise} promise retorna promesa con carga de archivo y funcion Confirm para estableces logica de negocio
   */
  htmlAlertUpload(title: string, html: string, customClass: string, confirmButtonText: any, showCancelButton: boolean, input: any) {
    return Swal.fire({
      title: title,
      html: html,
      confirmButtonText: confirmButtonText,
      showCancelButton: showCancelButton,
      input: input,
      customClass: {
        confirmButton: customClass
      }
    });
  }

}