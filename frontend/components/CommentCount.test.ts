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
import {flushPromises, mount} from '@vue/test-utils';
import CommentCount from "./CommentCount.vue";
import fetchMock, {type MockResponse} from "fetch-mock";
import EventBus from "../event-bus";

const apiUrl = "/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/count";
test('comment count', async () => {

  fetchMock.mock('path:'+apiUrl, JSON.parse('{"count": 2}') as MockResponse);

  expect(CommentCount).toBeTruthy();

  const wrapper = mount(CommentCount, {
    props: {
      url: 'path:'+apiUrl,
    },
  });
  await flushPromises();

  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.exists()).toBe(true);
});

test('refresh count on update event', async () => {

  fetchMock.mock('path:'+apiUrl, JSON.parse('{"count": 2}') as MockResponse, {overwriteRoutes: false});

  expect(CommentCount).toBeTruthy();
  const wrapper = mount(CommentCount, {
    props: {
      url: 'path:'+apiUrl,
    },
  });

  await flushPromises();
  expect(wrapper.text()).toBe('2');

  fetchMock.mock('path:'+apiUrl, JSON.parse('{"count": 3}') as MockResponse, {overwriteRoutes: true});
  EventBus.emit("REFRESH_COMMENTS_EVENT");

  await flushPromises();
  expect(wrapper.text()).toBe('3');
});
