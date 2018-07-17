import MaintenanceItem from './maintenance-item.js';

export default class MaintenanceList extends HTMLElement {
	constructor() {
		super();
	}

	async add(item, triggerEvent = true) {
		await customElements.whenDefined('maintenance-item');
		const el = new MaintenanceItem(item);
		this.append(el);

		if (triggerEvent) {
			this.dispatchEvent(new CustomEvent('add'));
		}
		return el;
	}

	toJSON() {
		return this.items.map(item => {
			return {
				name: item.name,
				due: item.due.toISOString(),
			};
		});
	}

	async save() {
		localStorage.setItem('maintenance', JSON.stringify(this));
	}

	async load() {
		if (localStorage.hasOwnProperty('maintenance')) {
			const items = JSON.parse(localStorage.getItem('maintenance'));
			await Promise.all(items.map(item => this.add(item, false)));
		}
	}

	get items() {
		return [...this.children];
	}
}
