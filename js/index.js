import './std-js/deprefixer.js';
import './std-js/shims.js';
import {ready, $} from './std-js/functions.js';
import MaintenanceList from './components/maintenance-list.js';
import MaintenanceItem from './components/maintenance-item.js';

customElements.define('maintenance-list', MaintenanceList);
customElements.define('maintenance-item', MaintenanceItem);

ready().then(async () => {
	const now = new Date();
	const list = document.querySelector('maintenance-list');

	$('form[name="schedule-maintenance"]').submit(event => {
		event.preventDefault();
		const data = new FormData(event.target);
		list.add({
			name: data.get('name'),
			due: data.get('due'),
		});
		event.target.reset();
		event.target.closest('dialog[open]').close();
	});

	list.load();
	list.addEventListener('add', () => list.save());
	list.addEventListener('delete', () => list.save());

	$('form input[type="date"]').each(input => {
		const y = now.getFullYear();
		const m = (now.getMonth() + 1).toString().padStart(2,'0');
		const d = now.getDate();
		input.min = `${y}-${m}-${d}`;
	});

	$(document.documentElement).replaceClass('no-js', 'js');
	$('[data-show-modal]').click(e => $(e.target.dataset.showModal).showModal());
	$('[data-close]').click(e => $(e.target.dataset.close).close());
	$('[data-remove]').click(e => $(e.target.dataset.remove).remove());
	await Promise.all(['maintenance-list', 'maintenance-item'].map(el => customElements.whenDefined(el)));
});
