export const formatSalary = (salary: number | string): string => {
    if(salary == null || salary === 0) return '-';
    const decimalSalary = parseFloat(salary.toString()).toFixed(2).toString().replace('.', ',');
    return 'R$' + decimalSalary.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }