/*
 *
 * OSIS stands for Open Student Information System. It's an application
 * designed to manage the core business of higher education institutions,
 * such as universities, faculties, institutes and professional schools.
 * The core business involves the administration of students, teachers,
 * courses, programs and so on.
 *
 * Copyright (C) 2015-2023 Université catholique de Louvain (http://www.uclouvain.be)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * A copy of this license - GNU General Public License - is available
 * at the root of the source code of this program.  If not,
 * see http://www.gnu.org/licenses/.
 *
 */

/* global CKEDITOR */

/**
 * This is taken from https://github.com/mayasabha/ckeditor4-vue3/blob/master/src/ckeditor.js
 * but as https://github.com/mayasabha/ckeditor4-vue3/issues/5
 * tree shaking is broken and the dist package ships with vue, hence we reproduce it in our own code
 */


import { h } from 'vue';
import { debounce, getEditorNamespace } from 'ckeditor4-integrations-common';

export default {
	name: 'ckeditor',

	render() {
		return h( 'div', {}, [
			h( this.tagName )
		] );
	},

	props: {
		modelValue: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'classic',
			validator: type => [ 'classic', 'inline' ].includes( type )
		},
		editorUrl: {
			type: String,
			default: 'https://cdn.ckeditor.com/4.17.2/standard-all/ckeditor.js'
		},
		config: {
			type: Object,
			default: () => {}
		},
		tagName: {
			type: String,
			default: 'textarea'
		},
		readOnly: {
			type: Boolean,
			default: null // Use null as the default value, so `config.readOnly` can take precedence.
		},
		throttle: {
			type: Number,
			default: 80
		}
	},

	mounted() {
		getEditorNamespace( this.editorUrl, namespace => {
			this.$emit( 'namespaceloaded', namespace );
		} ).then( () => {
			if ( this.$_destroyed ) {
				return;
			}

			const config = this.prepareConfig();
			const method = this.type === 'inline' ? 'inline' : 'replace';
			const element = this.$el.firstElementChild;

			CKEDITOR[ method ]( element, config );
		} );
	},

	data() {
		return {
			readyEmitted: false,
		};
	},

	beforeDestroy() {
		if ( this.instance ) {
			this.instance.destroy();
		}

		this.$_destroyed = true;
	},

	watch: {
		modelValue( val ) {
			if ( this.instance && this.instance.getData() !== val ) {
				this.instance.setData( val );
			}
		},

		readOnly( val ) {
			if ( this.instance ) {
				this.instance.setReadOnly( val );
			}
		}
	},

	methods: {
		prepareConfig() {
			const config = this.config || {};
			config.on = config.on || {};

			if ( config.delayIfDetached === undefined ) {
				config.delayIfDetached = true;
			}
			if ( this.readOnly !== null ) {
				config.readOnly = this.readOnly;
			}

			const userInstanceReadyCallback = config.on.instanceReady;

			config.on.instanceReady = evt => {
				this.instance = evt.editor;

				this.$nextTick().then( () => {
					this.prepareComponentData();

					if ( userInstanceReadyCallback ) {
						userInstanceReadyCallback( evt );
					}
				} );
			};

			return config;
		},
		prepareComponentData() {
			const data = this.modelValue;

			this.instance.fire( 'lockSnapshot' );

			this.instance.setData( data, { callback: () => {
				this.$_setUpEditorEvents();

				const newData = this.instance.getData();

				// Locking the snapshot prevents the 'change' event.
				// Trigger it manually to update the bound data.
				if ( data !== newData ) {
					/* this.$on( 'input', () => {
						this.$emit( 'ready', this.instance );
					} ); */
					if (!this.readyEmitted) {
						this.$emit( 'ready', this.instance );
						console.log('Emitting Ready');
						this.readyEmitted = true;
					}
					this.$emit( 'update:modelValue', newData );
				} else {
					if (!this.readyEmitted) {
						this.$emit( 'ready', this.instance );
						console.log('Emitting Ready');
						this.readyEmitted = true;
					}
				}

				this.instance.fire( 'unlockSnapshot' );
			} } );
		},
		$_setUpEditorEvents() {
			const editor = this.instance;

			const onChange = debounce( evt => {
				const data = editor.getData();

				// Editor#change event might be fired without an actual data change.
				if ( this.modelValue !== data ) {
					// The compatibility with the v-model and general Vue.js concept of input–like components.
					this.$emit( 'update:modelValue', data, evt, editor );
				}
			}, this.throttle );

			editor.on( 'change', onChange );

			editor.on( 'focus', evt => {
				this.$emit( 'focus', evt, editor );
			} );

			editor.on( 'blur', evt => {
				this.$emit( 'blur', evt, editor );
			} );
		}
	}
};
