var r=Object.defineProperty;var t=(e,n)=>r(e,"name",{value:n,configurable:!0});import{k as a,m as i,t as u,y as m}from"./vue.esm-bundler-13202d4b.js";import{E as c}from"./event-bus-a688bd49.js";import{_ as l}from"./plugin-vueexport-helper-a0691a9b.js";const o=a({name:"CommentCount",props:{url:{type:String,required:!0}},data:function(){return{value:null,loading:!0,error:""}},mounted(){this.loadCount(),c.on("REFRESH_COMMENTS_EVENT",()=>void this.loadCount())},methods:{async loadCount(){const n=await(await fetch(this.url,{mode:"same-origin",headers:{"Content-Type":"application/json;charset=utf-8"}})).json();this.value=n.count}}});const p={class:"badge badge-compteur"};function d(e,n,C,g,y,v){return m(),i("div",p,u(e.value),1)}t(d,"_sfc_render");const s=l(o,[["render",d]]);o.__docgenInfo={displayName:"CommentCount",exportName:"default",description:"",tags:{},props:[{name:"url",type:{name:"string"},required:!0}],sourceFiles:["/home/runner/work/osis-comment/osis-comment/frontend/components/CommentCount.vue"]};const w={parameters:{storySource:{source:`/*
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

import type {Meta, StoryFn} from "@storybook/vue3";
import CommentCount from "./CommentCount.vue";

export default {
  title: 'CommentCount',
  component: CommentCount,
} as Meta;

const Template: StoryFn<typeof CommentCount> = (args) => ({
  components: {CommentCount},
  setup() {
    return {args};
  },
  template: '<CommentCount v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  count: 0,
};
`,locationsMap:{default:{startLoc:{col:47,line:35},endLoc:{col:2,line:41},startBody:{col:47,line:35},endBody:{col:2,line:41}}}}},title:"CommentCount",component:s},f=t(e=>({components:{CommentCount:s},setup(){return{args:e}},template:'<CommentCount v-bind="args" />'}),"Template"),h=f.bind({});h.args={count:0};const E=["Default"];export{h as Default,E as __namedExportsOrder,w as default};
//# sourceMappingURL=CommentCount.stories-2e0284c0.js.map
