var i=Object.defineProperty;var o=(e,r)=>i(e,"name",{value:r,configurable:!0});import{a,E as t}from"./CommentEntry-bef07900.js";import"./vue.esm-bundler-c2f1cd55.js";const l={parameters:{storySource:{source:`/*
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
`,locationsMap:{default:{startLoc:{col:47,line:36},endLoc:{col:2,line:42},startBody:{col:47,line:36},endBody:{col:2,line:42}},"rich-text":{startLoc:{col:47,line:36},endLoc:{col:2,line:42},startBody:{col:47,line:36},endBody:{col:2,line:42}},"without-buttons":{startLoc:{col:47,line:36},endLoc:{col:2,line:42},startBody:{col:47,line:36},endBody:{col:2,line:42}}}}},title:"CommentEntry",component:a},n=o(e=>({components:{CommentEntry:a},setup(){return{args:e}},template:'<CommentEntry v-bind="args" />'}),"Template"),d=n.bind({});d.args={entry:new t({uuid:"8784bf99-d4f6-4971-99cf-5227afbeca0f",comment:"Lorem ipsum dolor amet",created_at:"2023-03-02T11:37:05.493008",modified_at:"2023-03-02T11:37:05.493008",author:"John Doe",tags:[],extra_data:{},links:{edit:"/comment-test-api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",delete:"/comment-test-api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f"}})};const s=n.bind({});s.args={richTextConfig:{},entry:new t({uuid:"8784bf99-d4f6-4971-99cf-5227afbeca0f",comment:"<p>Lorem ipsum <strong>dolor</strong> amet</p>",created_at:"2023-03-02T11:37:05.493008",modified_at:"2023-03-02T11:37:05.493008",author:"John Doe",tags:[],extra_data:{},links:{edit:"/comment-test-api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f",delete:"/comment-test-api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/8784bf99-d4f6-4971-99cf-5227afbeca0f"}})};const f=n.bind({});f.args={entry:new t({uuid:"8784bf99-d4f6-4971-99cf-5227afbeca0f",comment:"Lorem ipsum dolor amet",created_at:"2023-03-02T11:37:05.493008",modified_at:"2023-03-02T11:37:05.493008",author:"John Doe",tags:[],extra_data:{},links:{edit:{error:"Permission error"},delete:{error:"Permission error"}}})};const u=["Default","RichText","WithoutButtons"];export{d as Default,s as RichText,f as WithoutButtons,u as __namedExportsOrder,l as default};
//# sourceMappingURL=CommentEntry.stories-e58adeaa.js.map
