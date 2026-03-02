import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgStyle, NgClass } from "@angular/common";

@Component({
	selector: 'app-action-button',
	standalone: true,
	imports: [NgStyle, NgClass],
	styles: `
    .action-btn {
			height: 48px;
			// width: 50%;
			color: #fff;
			background-color: var(--app-main-primary-color);
			border: 0px;
			border-radius: 3px;
			transition: background-color 0.3s ease;
			cursor: pointer;
			font-size: 16px;
			font-weight: 300;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 24px;

			&:hover {
				background-color: var(--app-main-special-color);
				box-shadow: 0px 0px 5px var(--app-main-special-color);
				color: var(--app-main-dark-color);
			}

			&-primary {
				background-color: var(--app-dark-color);
				&:hover {
					background-color: var(--app-main-special-color);
					box-shadow: 0px 0px 5px var(--app-main-special-color);
					color: var(--app-main-dark-color);
				}
			}

			&-secondary {
				background-color: var(--app-neutral-color);
				&:hover {
					cursor: pointer;
					background-color: #fff;
					color: var(--app-dark-color);
					border: 1px solid var(--app-dark-color);
					box-shadow: none;
				}
			}
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