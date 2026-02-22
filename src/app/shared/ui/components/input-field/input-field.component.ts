import { NgClass, NgStyle, NgIf } from '@angular/common';
import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cpfValidator } from 'src/app/shared/services/utils/form-validators';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    FormsModule,
    NgIf
],
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './input-field.component.html',
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() value: string = '';
  @Input() label: string | null = null;
  @Input() disabled: boolean = false;
  @Input() placeholder: any;
  @Input() type: string = 'text';
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() height: string;
  @Input() alwaysTwoDigits: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() labelColor = '';
  @Input() isPhoneNumber: boolean = false;
  @Input() isCpf: boolean = false;
  @Input() isReal: boolean = false;
  @Input() isNumeric: boolean = false;
  @Input() forceValidation: boolean = false;
  @Input() validator: (value: string) => any;
  @Input() isRequired: boolean = false;
  @Input() textArea: boolean = false;

  @Input() control: any;

  @Output() valueChange = new EventEmitter<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = this.formatValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  formatValue(value: string): string {
    if (!value) return '';

    if (this.isPhoneNumber) {
      // Remove todos os caracteres não numéricos
      const numericValue = value.replace(/\D/g, '');
      return this.formatPhoneNumber(numericValue);
    }

    if (this.alwaysTwoDigits && this.type === 'number') {
      const numValue = parseInt(value, 10);
      return numValue.toString().padStart(2, '0');
    }

    return value;
  }

  onInputChange($event): void {
    let formattedValue = this.value;

    if (this.isPhoneNumber) {
      // Remove todos os caracteres não numéricos
      const numericValue = formattedValue.replace(/\D/g, '');

      // Limita a 11 dígitos
      const limitedValue = numericValue.substring(0, 11);

      // Aplica a formatação (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
      if (limitedValue.length > 0) {
        formattedValue = this.formatPhoneNumber(limitedValue);
      } else {
        formattedValue = '';
      }
    } else if (this.alwaysTwoDigits && this.type === 'number') {
      const numValue = parseInt(formattedValue, 10);
      formattedValue = numValue.toString().padStart(2, '0');
    } else if (this.isCpf) {
      formattedValue = this.formatCpf(formattedValue);
    } else if (this.isReal) {
      formattedValue = this.formatarMoeda(formattedValue);
    } else if (this.isNumeric) {
      formattedValue = this.formatNumber(formattedValue);
    } else {
      formattedValue = this.formatValue(formattedValue);
    }

    this.value = formattedValue;
    this.onChange(formattedValue);
    this.onTouched();
    this.valueChange.emit(formattedValue);
  }

  private formatPhoneNumber(value: string): string {
    if (value.length <= 2) {
      return value;
    } else if (value.length <= 6) {
      return `(${value.substring(0, 2)}) ${value.substring(2)}`;
    } else if (value.length <= 10) {
      return `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
    } else {
      return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
    }
  }

  private formatCpf(value: string): string {
    const numericValue = value.replace(/\D/g, '');

    const limitedValue = numericValue.substring(0, 11);

    if (limitedValue.length <= 3) {
      return limitedValue;
    } else if (limitedValue.length <= 6) {
      return `${limitedValue.substring(0, 3)}.${limitedValue.substring(3)}`;
    } else if (limitedValue.length <= 9) {
      return `${limitedValue.substring(0, 3)}.${limitedValue.substring(3, 6)}.${limitedValue.substring(6)}`;
    } else {
      return `${limitedValue.substring(0, 3)}.${limitedValue.substring(3, 6)}.${limitedValue.substring(6, 9)}-${limitedValue.substring(9)}`;
    }
  }

  private formatNumber(valor: string): string {
    const numericValue = valor.replace(/\D/g, '');
    return isNaN(Number(numericValue)) ? '0' : numericValue;
  }

  formatarMoeda(valor: string): string {
    // remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');

    if (!apenasNumeros) return 'R$ 0,00';

    const numero = Number(apenasNumeros) / 100;

    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }


  validateField(): string {
    if(this.control?.touched) {
      if(this.control?.hasError('cpfInvalido'))
        return 'CPF inválido';
      if(this.control?.hasError('required'))
        return 'Campo obrigatório';
    }

    // if (this.isCpf) {
    //   return cpfValidator(this.value);
    // }
    return null;
  }
}
