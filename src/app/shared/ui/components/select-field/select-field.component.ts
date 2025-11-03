import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NgSelectModule,
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgLabelTemplateDirective,
    NgSelectComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
})
export class SelectFieldComponent {

  private elementRef = inject<ElementRef>(ElementRef);
  private renderer = inject<Renderer2>(Renderer2);

  @Input() id: string = '';
  @Input() options: any[] = [];
  @Input() valueTrack: boolean = false;
  @Input() valueTrackKey: string = 'id';
  @Input() useValueOptionKeyAsLabel: boolean = false;
  @Input() valueOption: boolean = false;
  @Input() valueOptionKey: string = 'name';
  @Input() placeholder: string = 'Todos';
  @Input() label: string = '';
  @Input() labelClass: string = 'c-selectable-field-box__label';
  @Input() labelForId: string = '';
  @Input() clearable: boolean = true;
  @Input() searchable: boolean = true;
  @Input() height: string = '36px';
  @Input() disabled: boolean = false;
  @Input() dropdownPosition: 'auto' | 'top' | 'bottom' = 'auto';
  @Input() multiple: boolean = false;
  @Input() readonly;

  @Input() control: any;

  @Output() valueChange = new EventEmitter<any>();
  @Output() change = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();

  @ViewChild('ngSelect', { static: false }) ngSelect!: NgSelectComponent;

  firstInit: boolean = true;
  value: any;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
    if (this.ngSelect && this.firstInit) {
      this.firstInit = false;
      this.ngSelect.writeValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  clearField() {
    this.ngSelect.clearModel();
  }

  handleChange(event: any): void {
    // this.value = event;
    this.onChange(event);
    this.onTouched();
    this.change.emit();
    this.valueChange.emit(event);
  }

  onDropdownOpen(): void {
    const arrowWrapper =
      this.elementRef.nativeElement.querySelector('.ng-arrow-wrapper');
    this.renderer.addClass(arrowWrapper, 'rotateArrowWrapper');
  }

  onDropdownClose(): void {
    const arrowWrapper =
      this.elementRef.nativeElement.querySelector('.ng-arrow-wrapper');
    this.renderer.removeClass(arrowWrapper, 'rotateArrowWrapper');
  }

  getItem(item: any) {
    if(this.multiple) {
      return (item as any[]).length;
    }
    return this.useValueOptionKeyAsLabel ? item[this.valueOptionKey] : item;
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
