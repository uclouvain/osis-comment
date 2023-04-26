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

import CommentEntry from './CommentEntry.vue';
import {Entry} from "../types";
import type {Meta, StoryFn} from "@storybook/vue3";

export default {
  title: 'CommentEntry',
  component: CommentEntry,
} as Meta;

const Template: StoryFn<typeof CommentEntry> = (args) => ({
  components: {CommentEntry},
  setup() {
    return {args};
  },
  template: '<CommentEntry v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entry: new Entry({
    uuid: "8784bf99-d4f6-4971-99cf-5227afbeca0f",
    comment: "Lorem ipsum dolor amet",
    created_at: "2023-03-02T11:37:05.493008",
    modified_at: "2023-03-02T11:37:05.493008",
    author: "John Doe",
    tags: [],
    extra_data: {},
    links: {
      "edit": "/comment-test-api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",
      "delete": "/comment-test-api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",
    },
  }),
};
export const RichText = Template.bind({});
RichText.args = {
  richTextConfig: {},
  entry: new Entry({
    uuid: "8784bf99-d4f6-4971-99cf-5227afbeca0f",
    comment: "<p>Lorem ipsum <strong>dolor</strong> amet</p>",
    created_at: "2023-03-02T11:37:05.493008",
    modified_at: "2023-03-02T11:37:05.493008",
    author: "John Doe",
    tags: [],
    extra_data: {},
    links: {
      "edit": "/comment-test-api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",
      "delete": "/comment-test-api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",
    },
  }),
};

export const WithoutButtons = Template.bind({});
WithoutButtons.args = {
  entry: new Entry({
    uuid: "8784bf99-d4f6-4971-99cf-5227afbeca0f",
    comment: "Lorem ipsum dolor amet",
    created_at: "2023-03-02T11:37:05.493008",
    modified_at: "2023-03-02T11:37:05.493008",
    author: "John Doe",
    tags: [],
    extra_data: {},
    links: {
      edit: {error: "Permission error"},
      delete: {error: "Permission error"},
    },
  }),
};
