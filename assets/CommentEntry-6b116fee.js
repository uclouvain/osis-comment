var p=Object.defineProperty;var V=(e,t,n)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var s=(e,t)=>p(e,"name",{value:t,configurable:!0});var c=(e,t,n)=>(V(e,typeof t!="symbol"?t+"":t,n),n);import{h as g,k as C,y as l,l as m,z as O,A as S,v as $,m as d,t as h,x as b,n as w,F as I,u as v}from"./vue.esm-bundler-b973b992.js";class k{constructor({uuid:t,comment:n,author:a,tags:i,extra_data:u,links:r,created_at:o}){c(this,"uuid");c(this,"comment");c(this,"author");c(this,"tags");c(this,"extra_data");c(this,"links");c(this,"created_at");this.uuid=t,this.comment=n,this.author=a,this.tags=i,this.extra_data=u,this.links=r,this.created_at=new Date(o)}}s(k,"Entry");/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */function N(e,t,n){var a=document.head||document.getElementsByTagName("head")[0],i=document.createElement("script");typeof t=="function"&&(n=t,t={}),t=t||{},n=n||function(){},i.type=t.type||"text/javascript",i.charset=t.charset||"utf8",i.async="async"in t?!!t.async:!0,i.src=e,t.attrs&&R(i,t.attrs),t.text&&(i.text=String(t.text));var u="onload"in i?E:j;u(i,n),i.onload||E(i,n),a.appendChild(i)}s(N,"loadScript");function R(e,t){for(var n in t)e.setAttribute(n,t[n])}s(R,"setAttributes");function E(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}s(E,"stdOnEnd");function j(e,t){e.onreadystatechange=function(){this.readyState!="complete"&&this.readyState!="loaded"||(this.onreadystatechange=null,t(null,e))}}s(j,"ieOnEnd");var f;function y(e,t){return"CKEDITOR"in window?Promise.resolve(CKEDITOR):typeof e!="string"||e.length<1?Promise.reject(new TypeError("CKEditor URL must be a non-empty string.")):(f||(f=y.scriptLoader(e).then(function(n){return t&&t(n),n})),f)}s(y,"getEditorNamespace");y.scriptLoader=function(e){return new Promise(function(t,n){N(e,function(a){if(f=void 0,a)return n(a);if(!window.CKEDITOR)return n(new Error("Script loaded from editorUrl doesn't provide CKEDITOR namespace."));t(CKEDITOR)})})};function K(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a;return function(){clearTimeout(a);for(var i=arguments.length,u=new Array(i),r=0;r<i;r++)u[r]=arguments[r];a=setTimeout(e.bind.apply(e,[n].concat(u)),t)}}s(K,"debounce");const B={name:"ckeditor",render(){return g("div",{},[g(this.tagName)])},props:{modelValue:{type:String,default:""},type:{type:String,default:"classic",validator:e=>["classic","inline"].includes(e)},editorUrl:{type:String,default:"https://cdn.ckeditor.com/4.17.2/standard-all/ckeditor.js"},config:{type:Object,default:()=>{}},tagName:{type:String,default:"textarea"},readOnly:{type:Boolean,default:null},throttle:{type:Number,default:80}},mounted(){y(this.editorUrl,e=>{this.$emit("namespaceloaded",e)}).then(()=>{if(this.$_destroyed)return;const e=this.prepareConfig(),t=this.type==="inline"?"inline":"replace",n=this.$el.firstElementChild;CKEDITOR[t](n,e)})},data(){return{readyEmitted:!1}},beforeDestroy(){this.instance&&this.instance.destroy(),this.$_destroyed=!0},watch:{modelValue(e){this.instance&&this.instance.getData()!==e&&this.instance.setData(e)},readOnly(e){this.instance&&this.instance.setReadOnly(e)}},methods:{prepareConfig(){const e=this.config||{};e.on=e.on||{},e.delayIfDetached===void 0&&(e.delayIfDetached=!0),this.readOnly!==null&&(e.readOnly=this.readOnly);const t=e.on.instanceReady;return e.on.instanceReady=n=>{this.instance=n.editor,this.$nextTick().then(()=>{this.prepareComponentData(),t&&t(n)})},e},prepareComponentData(){const e=this.modelValue;this.instance.fire("lockSnapshot"),this.instance.setData(e,{callback:()=>{this.$_setUpEditorEvents();const t=this.instance.getData();e!==t?(this.readyEmitted||(this.$emit("ready",this.instance),console.log("Emitting Ready"),this.readyEmitted=!0),this.$emit("update:modelValue",t)):this.readyEmitted||(this.$emit("ready",this.instance),console.log("Emitting Ready"),this.readyEmitted=!0),this.instance.fire("unlockSnapshot")}})},$_setUpEditorEvents(){const e=this.instance,t=K(n=>{const a=e.getData();this.modelValue!==a&&this.$emit("update:modelValue",a,n,e)},this.throttle);e.on("change",t),e.on("focus",n=>{this.$emit("focus",n,e)}),e.on("blur",n=>{this.$emit("blur",n,e)})}}},T=C({name:"CommentEditor",components:{ckeditor:B},props:{richTextConfig:{type:Object,default:()=>{}},defaultValue:{type:String,default:""}},emits:["cancel","submit"],data:function(){return{value:this.defaultValue}}}),_=s((e,t)=>{const n=e.__vccOpts||e;for(const[a,i]of t)n[a]=i;return n},"_export_sfc"),L=["placeholder"],U={class:"text-right"};function M(e,t,n,a,i,u){const r=b("ckeditor");return l(),m("div",null,[e.richTextConfig?(l(),$(r,{key:1,modelValue:e.value,"onUpdate:modelValue":t[1]||(t[1]=o=>e.value=o),config:e.richTextConfig},null,8,["modelValue","config"])):O((l(),m("textarea",{key:0,"onUpdate:modelValue":t[0]||(t[0]=o=>e.value=o),class:"form-control",placeholder:e.$t("entry.placeholder")},null,8,L)),[[S,e.value]]),d("div",U,[d("button",{class:"btn btn-sm btn-success",onClick:t[2]||(t[2]=o=>e.$emit("submit",e.value))},h(e.$t("entry.submit_comment")),1),d("button",{class:"btn btn-sm btn-default",onClick:t[3]||(t[3]=o=>e.$emit("cancel"))},h(e.$t("entry.cancel_edit")),1)])])}s(M,"_sfc_render$1");const A=_(T,[["render",M]]);T.__docgenInfo={displayName:"CommentEditor",exportName:"default",description:"",tags:{},props:[{name:"richTextConfig",type:{name:"object"},defaultValue:{func:!0,value:"() => undefined"}},{name:"defaultValue",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"submit"},{name:"cancel"}]};const D=C({name:"CommentEntry",components:{CommentEditor:A},props:{richTextConfig:{type:Object,default:()=>{}},entry:{type:k,required:!0}},emits:["edit","delete"],data:function(){return{isEditing:!1}}});const H={class:"panel-body clearfix"},F={class:"comment-authoring"},P={class:"pull-right comment-actions"},q=["title"],z=d("i",{class:"fas fa-pencil"},null,-1),G=[z],J=["title"],Q=d("i",{class:"fas fa-trash-alt"},null,-1),W=[Q],X={key:0,class:"comment-content"},Y=["innerHTML"],Z=["innerHTML"];function x(e,t,n,a,i,u){const r=b("CommentEditor");return l(),m("div",H,[d("div",F,[d("strong",null,h(e.entry.author||e.$t("entry.anonymous")),1),w(" "+h(e.$t("entry.authored_date",{date:e.entry.created_at.toLocaleDateString(),time:e.entry.created_at.toLocaleTimeString()})),1)]),e.isEditing?(l(),$(r,{key:1,"default-value":e.entry.comment,"rich-text-config":e.richTextConfig,onSubmit:t[2]||(t[2]=o=>e.$emit("edit",e.entry.links.edit,o)),onCancel:t[3]||(t[3]=o=>e.isEditing=!1)},null,8,["default-value","rich-text-config"])):(l(),m(I,{key:0},[d("div",P,[typeof e.entry.links.edit=="string"?(l(),m("button",{key:0,class:"btn btn-sm btn-default",title:e.$t("entry.edit_comment"),onClick:t[0]||(t[0]=o=>e.isEditing=!0)},G,8,q)):v("",!0),typeof e.entry.links.delete=="string"?(l(),m("button",{key:1,class:"btn btn-sm btn-danger",title:e.$t("entry.delete_comment"),onClick:t[1]||(t[1]=o=>e.$emit("delete",e.entry.links.delete))},W,8,J)):v("",!0)]),e.richTextConfig?(l(),m("div",{key:1,class:"comment-content",innerHTML:e.entry.comment},null,8,Z)):(l(),m("div",X,[d("p",{innerHTML:e.entry.comment.replace(/\n/g,"<br/>")},null,8,Y)]))],64))])}s(x,"_sfc_render");const ne=_(D,[["render",x]]);D.__docgenInfo={displayName:"CommentEntry",exportName:"default",description:"",tags:{},props:[{name:"richTextConfig",type:{name:"object"},defaultValue:{func:!0,value:"() => undefined"}},{name:"entry",type:{name:"Entry"},required:!0}],events:[{name:"delete"},{name:"edit"}]};export{A as C,k as E,_,ne as a};
//# sourceMappingURL=CommentEntry-6b116fee.js.map
