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

import {vi, expect, test, beforeEach} from 'vitest';
import * as exports from '@vue/runtime-dom';
import CommentViewer from "./CommentViewer.vue";
import {createApp} from "vue";
import fetchMock from "fetch-mock";

beforeEach(() => {
  fetchMock.reset().mock('path:/api', {
    results: [],
    count: 0,
    next: null,
    previous: null,
    create: null,
  });
});

test('mount app', async () => {
  document.body.innerHTML = `<div class="comment-thread-viewer" data-url="/api"></div>
    <div class="comment-count" data-url="/api"></div>
    <input name="csrfmiddlewaretoken"/>`;

  const spy = vi.spyOn(exports, 'createApp').mockImplementation(createApp);

  // Executes main file
  await import('./main');

  expect(document.body.innerHTML).toMatchSnapshot();
  const pElement = document.querySelector('[data-v-app]');
  expect(pElement).toBeTruthy();

  expect(spy).toHaveBeenCalledWith(CommentViewer, {
    url: '/api',
    singleMode: false,
  });
});


test('mount app in single mode', async () => {
  document.body.innerHTML = `<div class="comment-viewer" data-url="/api"></div>
    <div class="comment-count" data-url="/api"></div>
    <input name="csrfmiddlewaretoken"/>`;

  const spy = vi.spyOn(exports, 'createApp').mockImplementation(createApp);

  // Executes main file
  await import('./main');

  expect(document.body.innerHTML).toMatchSnapshot();
  const pElement = document.querySelector('[data-v-app]');
  expect(pElement).toBeTruthy();

  expect(spy).toHaveBeenCalledWith(CommentViewer, {
    url: '/api',
    singleMode: true,
  });
});


test('mount app on invalid element', async () => {
  document.body.innerHTML = `<div class="comment-thread-viewer" data-url="/api"></div>
    <input name="csrfmiddlewaretoken"/>`;

  const spy = vi.spyOn(exports, 'createApp').mockImplementation(createApp);

  // Executes main file
  await import('./main');

  expect(document.body.innerHTML).toMatchSnapshot();
  const pElement = document.querySelector('[data-v-app]');
  expect(pElement).toBeTruthy();

  expect(spy).toHaveBeenCalledWith(CommentViewer, {
    url: '/api',
    singleMode: false,
  });
});


test('correct conversions', async () => {
  document.body.innerHTML = `
    <div class="comment-thread-viewer"
      data-url="/api"
      data-page-size="2"
      data-tags="foo,bar"
      data-rich-text-config="{&quot;toolbar&quot;: &quot;Custom&quot;, &quot;toolbar_Custom&quot;: [[&quot;Bold&quot;, &quot;Italic&quot;, &quot;Underline&quot;]], &quot;autoParagraph&quot;: false}"></div>
    <input name="csrfmiddlewaretoken"/>`;

  const spy = vi.spyOn(exports, 'createApp').mockImplementation(createApp);

  // Executes main file
  await import('./main');
  expect(spy).toHaveBeenCalledWith(CommentViewer, {
    url: '/api',
    singleMode: false,
    "pageSize": 2,
    "tags": [
      "foo",
      "bar",
    ],
    richTextConfig: {
      "toolbar": "Custom", "toolbar_Custom": [["Bold", "Italic", "Underline"]], "autoParagraph": false,
    },
  });
});
