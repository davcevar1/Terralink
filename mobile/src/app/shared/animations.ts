import { AnimationEntryMetadata } from '@angular/core';
import { animate, animateChild, query, group, state, style, transition, trigger } from '@angular/animations';

// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(100%)',
        position: 'fixed',
        width: '100%'
      }),
      animate('.4s ease-out', style({
        opacity: 1,
        transform: 'translateX(0%)',
        position: 'fixed',
        width: '100%'
      }))
    ]),
    transition(':leave', [
      style({
        transform: 'translateX(0%)',
        position: 'fixed',
        width: '100%'
      }),
      animate('.4s ease-out', style({
        transform: 'translateX(-100%)',
        position: 'fixed',
        width: '100%'
      }))
    ])
  ]);
