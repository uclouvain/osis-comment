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

import {expect, test} from 'vitest';
import {mount} from '@vue/test-utils';
import CommentEditor from "./CommentEditor.vue";

test('comment editor', () => {
  expect(CommentEditor).toBeTruthy();

  const wrapper = mount(CommentEditor, {
    props: {
      defaultValue: 'Lorem',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find('textarea.form-control').exists()).toBe(true);
  expect((wrapper.find('textarea.form-control').element as HTMLInputElement).value).toBe('Lorem');
});

test('comment editor with ckeditor', async () => {
  const wrapper = mount(CommentEditor, {
    props: {
      defaultValue: 'Lorem',
      richTextConfig: {},
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find('textarea.form-control').exists()).toBe(false);

  const child = wrapper.findComponent({name: 'ckeditor'});
  expect(child.props('modelValue')).toBe('Lorem');
  await child.vm.$emit('update:modelValue', 'Foobar');

  expect(child.props('modelValue')).toBe('Foobar');
});

test('comment editor submit', async () => {
  const wrapper = mount(CommentEditor, {
    props: {
      defaultValue: 'Lorem',
    },
  });

  wrapper.get('button.btn-success').trigger('click');
  expect(wrapper.emitted()).toHaveProperty('submit', [['Lorem']]);
});

test('comment editor value change', async () => {
  const wrapper = mount(CommentEditor);

  await wrapper.get('textarea').setValue('Foobar');
  wrapper.get('button.btn-success').trigger('click');
  expect(wrapper.emitted()).toHaveProperty('submit', [['Foobar']]);
});

test('comment editor cancel', () => {
  const wrapper = mount(CommentEditor);

  wrapper.get('button.btn-default').trigger('click');
  expect(wrapper.emitted()).toHaveProperty('cancel');
});
