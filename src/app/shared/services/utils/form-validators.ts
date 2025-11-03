import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(value: string): string | null {
    if (!value || value.trim() === '') {
      return null;
    }

    // Remove tudo que não for dígito
    const numbers = value.replace(/[^\d]/g, '');

    if (numbers.length !== 11) {
      return 'CPF inválido';
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numbers)) {
      return 'CPF inválido';
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(numbers[i]) * (10 - i);
    }
    let digito1 = (soma * 10) % 11;
    if (digito1 === 10) digito1 = 0;
    if (digito1 !== parseInt(numbers[9])) {
      return 'CPF inválido';
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(numbers[i]) * (11 - i);
    }
    let digito2 = (soma * 10) % 11;
    if (digito2 === 10) digito2 = 0;
    if (digito2 !== parseInt(numbers[10])) {
      return 'CPF inválido';
    }

    return null;
  }
  export function cpf(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || value.trim() === '') {
      return null;
    }
    return cpfValidator(value) ? { cpfInvalido: true } : null;

  }
