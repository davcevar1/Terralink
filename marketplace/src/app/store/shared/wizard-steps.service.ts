import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs";

import { SessionService } from '../../core/shared/session.service';

@Injectable()
export class WizardStepsService {
  /**
   * Lista de pasos
   */
  steps: any[] = [
    { label: 'Facturación y Pago', url: '/checkout' },
    { label: 'Confirmación', url: '/confirmation' }
  ];
  /**
   * Fuente para observable de paso actual
   */
  private currentStepSource: BehaviorSubject<number> = new BehaviorSubject(0);
  /**
   * Paso actual
   */
  currentStep$: Observable<number> = this.currentStepSource.asObservable();
  /**
   * Fuente para observable de paso permitido
   */
  private allowedStepSource: BehaviorSubject<number> = new BehaviorSubject(1);
  /**
   * Paso permitido
   */
  allowedStep$: Observable<number> = this.allowedStepSource.asObservable();

  constructor(
    private session: SessionService
  ) { }
  /**
   * Paso actual
   * @param {number} value  Indice del paso
   */
  setStep(value:number) {
    this.currentStepSource.next(value - 1);
    let savedStep: number = this.session.get('step');
    let maxStep: number = this.session.get('maxStep');
    this.session.set('step', value);
    this.session.set('maxStep', Math.max(value, maxStep));
    this.setAllowedStep(this.session.get('maxStep'));
  }
  /**
   * Paso permitido
   * @param {number} value  Indice del paso permitido
   */
  setAllowedStep(value:number) {
    this.allowedStepSource.next(value - 1);
  }

}
