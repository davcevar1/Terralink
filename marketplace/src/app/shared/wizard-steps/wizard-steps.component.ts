import { Component, OnInit,  Input } from '@angular/core';

import { Step } from '../models/step';

@Component({
  selector: 'app-wizard-steps',
  templateUrl: './wizard-steps.component.html',
  styleUrls: ['./wizard-steps.component.scss']
})
export class WizardStepsComponent implements OnInit {
  /**
   * Lista de pasos
   */
  @Input()
  data: Step[];
  /**
   * Paso actual
   */
  @Input()
  current: number;
  /**
   * Paso máximo permitido
   */
  @Input()
  allowed: number;

  ngOnInit() {
  }

}
