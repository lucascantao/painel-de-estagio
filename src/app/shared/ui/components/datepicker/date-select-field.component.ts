import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, forwardRef, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { APP_DATE_FORMATS, dateAdapter } from 'src/app/shared/utils/DataAdapter';



@Component({
  selector: 'app-date-select-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <div class="c-date-select">
      <form class="c-date-select__form">
        <mat-label class="c-date-select__label">{{ label }}</mat-label>
        <mat-form-field 
          [id]="id" 
          class="c-date-select__form-field"
          [ngClass]="{'c-date-select__form-field--with-error': validateField()}"
        >
          <mat-datepicker-toggle matIconSuffix [for]="datePicker"></mat-datepicker-toggle>
          <mat-datepicker #datePicker></mat-datepicker>
          <input
            matInput
            required
            name="{{ name }}"
            [placeholder]="placeholder"
            [disabled]="disabled"
            [(ngModel)]="value"
            (dateChange)="dateChange($event)"
            [matDatepicker]="datePicker"
          >
        </mat-form-field>
      </form>
      <span
        class="c-date-select__error-message"
        [ngStyle]="{'display': !validateField() ? 'none' : 'flex'}"
      >
          {{ validateField() }}
      </span>
    </div>
  `,
  styleUrls: ['./date-select-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSelectFieldComponent),
      multi: true
    },
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: dateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DateSelectFieldComponent implements ControlValueAccessor {

  @Output() valueChange = new EventEmitter<any>();

  @Input() placeholder: string = 'dd/mm/aaaa'
  @Input() disabled: boolean = false
  @Input() label: string = ''
  @Input() id: string = ''
  @Input() name: string = ''
  @Input() type: 'start' | 'end' = 'start'
  @Input() value: Date
  @Input() control: any

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // opcional: controlar se está desabilitado
  }

  dateChange(event: any) {
    let date = (event.value as Date).toISOString();
    this.value = event.value;
    this.onChange(date);
    this.onTouched();
    this.valueChange.emit(date);
  }

  clearDate() {
    this.value = null;
    this.valueChange.emit(null);
  }

  validateField(): string {
    if(this.control) {
      if (this.control.invalid && this.control.touched) {
        return 'Campo obrigatório';
      }
    }
    return null;
  }

}
