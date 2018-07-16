import './std-js/deprefixer.js';
import './std-js/shims.js';
import {ready, $} from './std-js/functions.js';

ready().then(async () => {
	$(document.documentElement).replaceClass('no-js', 'js');
	$('[data-show-modal]').click(e => $(e.target.dataset.showModal).showModal());
	$('[data-close]').click(e => $(e.target.dataset.close).close());
	$('[data-remove]').click(e => $(e.target.dataset.remove).remove());
});
