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

import CommentThread from './CommentThread.vue';
import fetchMock from 'fetch-mock';
import type {Meta, StoryFn} from "@storybook/vue3";
import type {EntriesResponse} from "./interfaces";

export default {
  title: 'CommentThread',
  component: CommentThread,
} as Meta;

const Template: StoryFn<typeof CommentThread> = (args) => ({
  components: {CommentThread},
  setup() {
    fetchMock.restore().mock('path:/api', mockEntries);
    return {args};
  },
  template: `
    <CommentThread v-bind="args" url="/api" />
  `,
});

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
  create: "/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/",
};

export const Default = Template.bind({});
Default.args = {
  headerTitle: "Comments about object",
};

export const NoComments = () => {
  fetchMock.restore().mock('path:/api', {...mockEntries, results: []});
  return {
    components: {CommentThread},
    template: '<CommentThread url="/api"/>',
  };
};

export const HttpError = () => {
  fetchMock.restore().mock('path:/api', 404);
  return {
    components: {CommentThread},
    template: '<CommentThread url="/api"/>',
  };
};

export const Exception = () => {
  fetchMock.restore().mock('path:/api', {throws: new Error('Some network error')});
  return {
    components: {CommentThread},
    template: '<CommentThread url="/api"/>',
  };
};

export const WithoutAdding = () => {
  fetchMock.restore().mock('path:/api', {...mockEntries, create: {error: "Nope"}});
  return {
    components: {CommentThread},
    template: '<CommentThread url="/api"/>',
  };
};

export const Paginated = () => {
  fetchMock.restore().mock('path:/api', {...mockEntries, next: "/api?next", previous: "/api?previous"});
  return {
    components: {CommentThread},
    template: '<CommentThread url="/api" />',
  };
};


export const Ckeditor = () => {
  fetchMock.restore().mock('path:/api', {...mockEntries, results: []});
  return {
    components: {CommentThread},
    template: '<CommentThread url="/api" :rich-text-config="{}" />',
  };
};
