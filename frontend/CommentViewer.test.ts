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

import {beforeEach, expect, test} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import CommentViewer from "./CommentViewer.vue";
import type {EntriesResponse} from "./interfaces";
import fetchMock from "fetch-mock";
import CommentEditor from "./components/CommentEditor.vue";
import CommentEntry from "./components/CommentEntry.vue";

const apiUrl = "/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/";
const mockEntries: EntriesResponse = {
  results: [
    {
      uuid: "8784bf99-d4f6-4971-99cf-5227afbeca0f",
      comment: "Lorem ipsum dolor amet",
      created_at: "2023-03-03T11:37:05.493008",
      modified_at: "2023-03-03T11:37:05.493008",
      author: "John Doe",
      tags: [],
      extra_data: {},
      links: {
        "edit": "/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",
        "delete": "/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",
      },
    },
    {
      uuid: "8784bf99-d4f6-4971-99cf-5227afbeca0f",
      comment: "Consetetur sadipscing elitr, sed diam nonumy eirmod",
      created_at: "2023-03-02T11:37:05.493008",
      modified_at: "2023-03-02T11:37:05.493008",
      author: "John Doe",
      tags: [],
      extra_data: {},
      links: {
        "edit": {error: "Non"},
        "delete": {error: "Non"},
      },
    },
    {
      uuid: "8784bf99-d4f6-4971-99cf-5227afbeca0f",
      comment: "Et dolore magna aliquyam erat, sed diam voluptua.",
      created_at: "2023-03-01T11:37:05.493008",
      modified_at: "2023-03-01T11:37:05.493008",
      author: "Bob Smith",
      tags: [],
      extra_data: {},
      links: {
        "edit": "/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",
        "delete": "/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",
      },
    },
  ],
  count: 3,
  next: null,
  previous: null,
  create: apiUrl,
};

beforeEach(() => {
  const csrfToken = document.createElement('input');
  csrfToken.id = 'csrf-token';
  csrfToken.name = 'csrfmiddlewaretoken';
  document.body.appendChild(csrfToken);

  fetchMock.reset().mock('path:' + apiUrl, mockEntries);
});

test('thread without token', () => {
  (document.getElementById('csrf-token') as Element).remove();

  expect(() => mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  })).toThrowError('Please include {% csrf_token %} in your page.');
});

test('thread', async () => {
  expect(CommentViewer).toBeTruthy();

  const wrapper = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  });
  await flushPromises();
  expect(wrapper.html()).toMatchSnapshot();
});


test('handle 404', async () => {
  fetchMock.reset().mock('path:' + apiUrl, 404);

  const wrapper = mount(CommentViewer, {
    props: {url: apiUrl},
  });

  await flushPromises();

  expect(wrapper.text()).toContain('Not Found');
});

test('handle network error', async () => {
  fetchMock.reset().mock('path:' + apiUrl, {throws: new Error('Some network error')});

  const wrapper = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  });

  await flushPromises();

  expect(wrapper.text()).toContain('Some network error');
});

test('change sort', async () => {
  const wrapper = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  });

  await flushPromises();
  expect(fetchMock.lastUrl()).toBe('/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=-modified_at');

  const sortButton = wrapper.get('.panel-heading .btn');
  expect(sortButton.get('i').classes()).toContain('fa-sort-down');

  await sortButton.trigger('click');
  expect(fetchMock.lastUrl()).toBe('/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=modified_at');
  expect(sortButton.get('i').classes()).toContain('fa-sort-up');

  await sortButton.trigger('click');
  expect(fetchMock.lastUrl()).toBe('/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=-modified_at');
  expect(sortButton.get('i').classes()).toContain('fa-sort-down');
});

test('single mode', async () => {
  const previousUrl = '/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=-modified_at&page=1';
  const nextUrl = '/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=-modified_at&page=3';

  const sortButton = '.panel-heading .btn';
  const previousButton = '.btn-default .fa-chevron-left';
  const nextButton = '.btn-default .fa-chevron-right';
  const createButton = '.btn-primary .fa-plus';

  fetchMock.reset().mock('path:' + apiUrl, {
    ...mockEntries,
    previous: previousUrl,
    next: nextUrl,
  });

  const singleWrapperWithEntry = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: true},
  });

  await flushPromises();
  expect(fetchMock.lastUrl()).toBe('/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?last=1');

  [sortButton, previousButton, nextButton, createButton].forEach((selector) => {
    expect(singleWrapperWithEntry.find(selector).exists()).toBe(false);
  });

  expect(singleWrapperWithEntry.find('.panel-heading').text()).toBe('thread.title');

  expect(
      singleWrapperWithEntry.find('.comment-authoring').text()).toBe(
      'entry.last_update_by John Doe entry.authored_date',
  );

  fetchMock.reset().mock('path:' + apiUrl, {
    ...mockEntries,
    results: [],
  });

  const singleWrapperWithoutEntry = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: true},
  });

  await flushPromises();

  [sortButton, previousButton, nextButton].forEach((selector) => {
    expect(singleWrapperWithoutEntry.find(selector).exists()).toBe(false);
  });

  expect(singleWrapperWithoutEntry.find(createButton).exists()).toBe(true);
});

test('thread mode', async () => {
  const previousUrl = '/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=-modified_at&page=1';
  const nextUrl = '/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=-modified_at&page=3';

  const sortButton = '.panel-heading .btn';
  const previousButton = '.btn-default .fa-chevron-left';
  const nextButton = '.btn-default .fa-chevron-right';
  const createButton = '.btn-primary .fa-plus';

  fetchMock.reset().mock('path:' + apiUrl, {
    ...mockEntries,
    previous: previousUrl,
    next: nextUrl,
  });

  const threadWrapperWithEntries = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  });

  await flushPromises();
  expect(fetchMock.lastUrl()).toBe('/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=-modified_at');

  [sortButton, previousButton, nextButton, createButton].forEach((selector) => {
    expect(threadWrapperWithEntries.find(selector).exists()).toBe(true);
  });

  expect(threadWrapperWithEntries.find('.panel-heading').text()).toBe('thread.title  (3) thread.sort');

  expect(
      threadWrapperWithEntries.find('.comment-authoring').text()).toBe(
      'John Doe entry.authored_date',
  );

  fetchMock.reset().mock('path:' + apiUrl, {
    ...mockEntries,
    results: [],
  });

  const threadWrapperWithoutEntries = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  });

  await flushPromises();

  [previousButton, nextButton].forEach((selector) => {
    expect(threadWrapperWithoutEntries.find(selector).exists()).toBe(false);
  });

  [sortButton, createButton].forEach((selector) => {
    expect(threadWrapperWithoutEntries.find(selector).exists()).toBe(true);
  });
});

test('handle pagination', async () => {
  const previousUrl = '/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=-modified_at&page=1';
  const nextUrl = '/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/?limit=10&sort=-modified_at&page=3';
  fetchMock.reset().mock('path:' + apiUrl, {
    ...mockEntries,
    previous: previousUrl,
    next: nextUrl,
  });

  const wrapper = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  });

  await flushPromises();
  const [previousButton, nextButton] = wrapper.findAll('.panel-body:last-child .btn-default');
  await previousButton.trigger('click');
  expect(fetchMock.lastUrl()).toBe(previousUrl);

  await nextButton.trigger('click');
  expect(fetchMock.lastUrl()).toBe(nextUrl);
});

test('add comment', async () => {
  const wrapper = mount(CommentViewer, {
    props: {url: apiUrl, tags: ['foo'], singleMode: false},
  });

  await flushPromises();
  const addButton = wrapper.get('.btn-primary.pull-right');
  expect(addButton.text()).toContain('thread.add_comment');
  expect(addButton.get('i').classes()).toContain('fa-plus');
  await addButton.trigger('click');

  const commentEditor = wrapper.findComponent(CommentEditor);
  expect(commentEditor.exists()).toBe(true);
  await commentEditor.get('textarea').setValue('Foobar');

  await commentEditor.get('button.btn-primary').trigger('click');
  expect(commentEditor.emitted('submit')).toStrictEqual([['Foobar']]);
  await flushPromises();
  const postCall = (fetchMock.calls(true, 'POST')[0][1] as RequestInit).body;
  expect(postCall).toEqual(JSON.stringify({comment: "Foobar", tags: ['foo']}));
});

test('cancel adding comment', async () => {
  const wrapper = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  });

  await flushPromises();
  await wrapper.get('.btn-primary.pull-right').trigger('click');

  const commentEditor = wrapper.findComponent(CommentEditor);
  expect(commentEditor.exists()).toBe(true);
  await commentEditor.get('button.btn-default').trigger('click');
  expect(wrapper.findComponent(CommentEditor).exists()).toBe(false);
});

test('edit comment', async () => {
   const wrapper = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  });

  await flushPromises();
  expect(wrapper.findAll('.comment-actions')).toHaveLength(3);

  const firstComment = wrapper.findAllComponents(CommentEntry)[0];

  const editButton = firstComment.get('.btn-primary');
  expect(editButton.html()).toContain('entry.edit_comment');
  expect(editButton.get('i').classes()).toContain('fa-pencil');
  await editButton.trigger('click');

  const commentEditor = firstComment.findAllComponents(CommentEditor)[0];
  const textarea = commentEditor.find('textarea.form-control').element as HTMLInputElement;
  expect(textarea.value).toBe('Lorem ipsum dolor amet');
  expect(commentEditor.exists()).toBe(true);
  await commentEditor.get('textarea.form-control').setValue('Foobar');

  fetchMock.reset()
      .mock('path:/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f', 200)
      .mock('path:/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/', 200);
  await commentEditor.get('button.btn-primary').trigger('click');
  await flushPromises();
  const postCall = (fetchMock.calls(true, 'PUT')[0][1] as RequestInit).body;
  expect(postCall).toEqual(JSON.stringify({comment: "Foobar"}));
});

test('delete comment', async () => {

   const wrapper = mount(CommentViewer, {
    props: {url: apiUrl, singleMode: false},
  });

  await flushPromises();
  expect(wrapper.findAll('.comment-actions')).toHaveLength(3);

  const firstComment = wrapper.findAllComponents(CommentEntry)[0];

  const editButton = firstComment.get('.btn-danger');
  expect(editButton.html()).toContain('entry.delete_comment');
  expect(editButton.get('i').classes()).toContain('fa-times');

  fetchMock.reset()
      .mock('path:/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f', 200)
      .mock('path:/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/', 200);
  await editButton.trigger('click');
  await flushPromises();
  expect(fetchMock.calls(true, 'DELETE')).toBeTruthy();
});
