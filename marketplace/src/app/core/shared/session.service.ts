import { Injectable } from '@angular/core';

/**
 * Administra la sesión del usuario
 */
@Injectable()
export class SessionService {

  /**
   * Elimina una propiedad de sesión
   * @param {string} key  Nombre de la propiedad
   */
  delete(key: string) {
    delete sessionStorage[key];
  }
  /**
   * Obtiene una propiedad de sesión
   * @param {string} key  Nombre de la propiedad
   */
  get(key: string) {
    return sessionStorage[key] ? JSON.parse(sessionStorage[key]) : false;
  }
  /**
   * Crea o actualiza una propiedad de sesión
   * @param {string} key  Nombre de la propiedad
   * @param {any} value  Valor de la propiedad
   */
  set(key: string, value: any) {
    sessionStorage[key] = JSON.stringify(value);
  }

}
