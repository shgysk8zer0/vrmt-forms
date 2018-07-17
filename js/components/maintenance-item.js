import {$} from '../std-js/functions.js';

const tmp = document.getElementById('maintenance-item-template').content;

export default class MaintenanceItem extends HTMLElement {
	constructor({
		name,
		due
	}) {
		super();
		const content = tmp.cloneNode(true);
		$('[data-action="complete"]', content).click(() => this.delete());
		const d = new Date(due);
		Promise.all([
			$('[data-field="name"]', content).text(name),
			$('[data-field="due"]', content).text(d.toLocaleDateString()),
		]).then(() => this.append(content));
	}

	delete() {
		this.parentElement.dispatchEvent(new CustomEvent('delete'));
		this.remove();
	}

	set name(name) {
		$('[data-field="name"]', this).text(name);
	}

	get name() {
		return this.querySelector('[data-field="name"]').textContent;
	}

	set due(date) {
		const due = new Date(date);
		$('[data-field="due"]', this).text(due.toLocaleDateString());
		$('[data-field="due"]', this).attr({datetime: due.toISOString()});
	}

	get due() {
		return new Date(this.querySelector('[data-field="due"]').getAttribute('datetime'));
	}
}
