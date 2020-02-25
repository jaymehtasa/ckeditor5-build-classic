import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';

import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

// import iqaIcon from '@ckeditor/ckeditor5-core/theme/icons/iqa.svg';

export default class IQADropdown extends Plugin {
	static get pluginName() {
		return 'IQADropdown';
	}

	init() {
		const editor = this.editor;
		const iqaData = this.editor.config._config.iqaData;
		const t = editor.t;
		const dropdownTooltip = t('IQA Source');

		// Register UI component
		editor.ui.componentFactory.add('iqaDropdown', locale => {
			const dropdownView = createDropdown(locale);

			dropdownView.set({
				label: 'IQA',
				tooltip: true
			});
			dropdownView.buttonView.set({
				label: 'IQA Source',
				isOn: false,
				withText: true,
				tooltip: dropdownTooltip
			});
			dropdownView.extendTemplate({
				attributes: {
					class: [
						'ck-iqa-dropdown'
					]
				}
			});

			// The collection of the list items.
			const items = new Collection();

			iqaData.forEach(element => {
				items.add({
					type: 'button',
					model: new Model({
						withText: true,
						label: element,
					})
				});
			});
			// Create a dropdown with a list inside the panel.
			addListToDropdown(dropdownView, items);

			// Insert dropdown item's value to the editor at current position.
			dropdownView.on('execute', evt => {
				editor.model.change(writer => {
					editor.model.insertContent(writer.createText(evt.source.label));
				});
			});

			return dropdownView;
		});
	}
}
