var r=Object.defineProperty;var t=(e,n)=>r(e,"name",{value:n,configurable:!0});import{k as a,m as i,t as u,q as m,y as c}from"./vue.esm-bundler-13202d4b.js";import{E as l}from"./event-bus-a688bd49.js";import{_ as p}from"./plugin-vueexport-helper-a0691a9b.js";const o=a({name:"CommentCount",props:{url:{type:String,required:!0}},data:function(){return{value:null,loading:!0,error:""}},mounted(){this.loadCount(),l.on("REFRESH_COMMENTS_EVENT",()=>void this.loadCount())},methods:{async loadCount(){const n=await(await fetch(this.url,{mode:"same-origin",headers:{"Content-Type":"application/json;charset=utf-8"}})).json();this.value=n.count}}});const d={key:0,class:"badge badge-compteur"};function f(e,n,y,g,v,_){return e.value!=0?(c(),i("div",d,u(e.value),1)):m("",!0)}t(f,"_sfc_render");const s=p(o,[["render",f]]);o.__docgenInfo={displayName:"CommentCount",exportName:"default",description:"",tags:{},props:[{name:"url",type:{name:"string"},required:!0}],sourceFiles:["/home/runner/work/osis-comment/osis-comment/frontend/components/CommentCount.vue"]};const E={parameters:{storySource:{source:`/*
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
`,locationsMap:{default:{startLoc:{col:47,line:35},endLoc:{col:2,line:41},startBody:{col:47,line:35},endBody:{col:2,line:41}}}}},title:"CommentCount",component:s},h=t(e=>({components:{CommentCount:s},setup(){return{args:e}},template:'<CommentCount v-bind="args" />'}),"Template"),C=h.bind({});C.args={count:0};const N=["Default"];export{C as Default,N as __namedExportsOrder,E as default};
//# sourceMappingURL=CommentCount.stories-37aaa1a7.js.map
