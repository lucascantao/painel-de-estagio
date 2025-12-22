import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgStyle, NgClass } from "@angular/common";

@Component({
	selector: 'app-action-button',
	standalone: true,
	imports: [NgStyle, NgClass],
	styles: `
    .action-btn {
			display: flex;
			align-items: center;
			padding: 8px 10px;
			border: none;
			border-radius: 2px;
			background-color: var(--app-dark-color);
			color: var(--app-negative-text-color);
			font-weight: 600;

			&-primary {
				background-color: var(--app-dark-color);
			}

			&-secondary {
				background-color: var(--app-neutral-color);
				// color: var(--app-dark-color);
			}
    }

    .action-btn:hover {
			cursor: pointer;
			background-color: #fff;
			color: var(--app-dark-color);
			border: 1px solid var(--app-dark-color);
    }
  `,
	template: `
		<button 
			[ngStyle]="{ padding: size === 'small' ? '8px 10px' : '12px 18px' }"
			[ngClass]="{ 'action-btn-primary': type === 'primary', 'action-btn-secondary': type === 'secondary' }"
			class="action-btn">
			{{ label }}
		</button>
	`,
})
export class ActionButtonComponent {

	@Input() label: string = ''
	@Input() size: 'small' | 'large'
	@Input() type: 'primary' | 'secondary'

}