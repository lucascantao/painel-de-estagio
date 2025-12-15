import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class dateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString().padStart(2, '0');
      let month: string = (date.getMonth() + 1).toString().padStart(2, '0');
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return date.toLocaleDateString('pt-BR');
  }

  override parse(value: any): Date | null {
    if (typeof value === 'string') {
      const [day, month, year] = value.split('/');
      return new Date(+year, +month - 1, +day);
    }
    return value;
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};
