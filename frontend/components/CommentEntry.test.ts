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
import CommentEntry from "./CommentEntry.vue";
import {Entry} from "../types";

const apiUrl = "/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f";
const comment = "Lorem ipsum dolor amet\nNope";
const entryData = {
  uuid: "8784bf99-d4f6-4971-99cf-5227afbeca0f",
  created_at: "2023-03-02T11:37:05.493008",
  comment: comment,
  author: "John Doe",
  tags: [],
  extra_data: {},
  links: {
    "edit": apiUrl,
    "delete": apiUrl,
  },
};

test('entry', () => {
  expect(CommentEntry).toBeTruthy();

  const wrapper = mount(CommentEntry, {
    props: {entry: new Entry(entryData)},
  });

  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find('button.btn-default').exists()).toBe(true);
  expect(wrapper.find('button.btn-danger').exists()).toBe(true);
});

test('entry without author', () => {
  const wrapper = mount(CommentEntry, {
    props: {
      entry: new Entry({
        ...entryData,
        author: null,
      }),
    },
  });

  expect(wrapper.find('.comment-authoring strong').text()).toBe('entry.anonymous');
});

test('entry rich text', () => {
  const wrapper = mount(CommentEntry, {
    props: {
      entry: new Entry({
        ...entryData,
        comment: "<p>Lorem ipsum <strong>dolor</strong> amet</p><p>Nope</p>",
      }),
      richTextConfig: {},
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find('button.btn-default').exists()).toBe(true);
  expect(wrapper.find('button.btn-danger').exists()).toBe(true);
});

test('entry without buttons', () => {
  const wrapper = mount(CommentEntry, {
    props: {
      entry: new Entry({
        ...entryData,
        links: {
          edit: {error: "Nope"},
          delete: {error: "Nope"},
        },
      }),
    },
  });

  expect(wrapper.find('button.btn-default').exists()).toBe(false);
  expect(wrapper.find('button.btn-danger').exists()).toBe(false);
});

test('entry editing', async () => {
  const wrapper = mount(CommentEntry, {
    props: {entry: new Entry(entryData)},
  });

  await wrapper.find('button.btn-default').trigger('click');
  expect(wrapper.findComponent({name: 'CommentEditor'}).exists()).toBe(true);

  await wrapper.find('button.btn-success').trigger('click');
  expect(wrapper.emitted('edit')).toEqual([[apiUrl, comment]]);
});

test('entry editing cancel', async () => {
  const wrapper = mount(CommentEntry, {
    props: {entry: new Entry(entryData)},
  });

  await wrapper.find('button.btn-default').trigger('click');
  expect(wrapper.findComponent({name: 'CommentEditor'}).exists()).toBe(true);

  await wrapper.find('button.btn-default').trigger('click');
  expect(wrapper.findComponent({name: 'CommentEditor'}).exists()).toBe(false);
});

test('entry deletion', async () => {
  const wrapper = mount(CommentEntry, {
    props: {entry: new Entry(entryData)},
  });

  await wrapper.find('button.btn-danger').trigger('click');
  expect(wrapper.emitted('delete')).toEqual([[apiUrl]]);
});
