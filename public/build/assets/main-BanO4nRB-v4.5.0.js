import{V as s}from"./vue-DkJ1Kgzj-v4.5.0.js";import{s as i}from"./simplebar-vue-DfYPHKB5-v4.5.0.js";import{a as r}from"./axios-DsPaXkF5-v4.5.0.js";import"./simplebar-core-DYbHMHSm-v4.5.0.js";import"./lodash-es-BnWRvFhx-v4.5.0.js";import"./vue-demi-NUwgaeZN-v4.5.0.js";class o{constructor(){this.errors={}}record(t){this.errors=t}any(){return Object.keys(this.errors).length>0}has(t){return this.errors.hasOwnProperty(t)}get(t){if(this.errors[t])return this.errors[t][0]}clear(t){t!==void 0&&s.delete(this.errors,t)}reset(){this.errors={}}}const n={components:{simplebar:i},props:["requirementSatisfied","permissionProvided"],data(){return{step:1,formSubmitting:!1,animateAlert:!1,appInstalled:!1,errorMessage:null,form:{db_host:"127.0.0.1",db_port:3306,store_search_engine:"mysql"},errors:new o}},computed:{isShowPrev(){return this.step===2||this.step===3},isPrevDisabled(){return this.formSubmitting},isNextDisabled(){if(this.step===1)return!this.requirementSatisfied||this.formSubmitting;if(this.step===2)return!this.permissionProvided||this.formSubmitting;if(this.step===3)return this.formSubmitting},hasErrorMessage(){return this.errorMessage!==null}},methods:{prevStep(){this.isPrevDisabled||this.step>1&&this.step--},nextStep(){if(!this.isNextDisabled){if(this.step===3){this.submitForm();return}this.step++,this.focusInitialFormField()}},focusInitialFormField(){this.step===3&&this.$nextTick(()=>{this.$refs.configurationForm.elements[0].focus()})},setErrorMessage(e){this.errorMessage=e,this.triggerAlertAnimation()},resetErrorMessage(){this.errorMessage=null},triggerAlertAnimation(){this.animateAlert=!0,setTimeout(()=>{this.animateAlert=!1},1e3)},scrollToTop(){this.$nextTick(()=>{this.$refs.configurationContent.SimpleBar.getScrollElement().scrollTo({top:0,left:0,behavior:"smooth"})})},scrollToBottom(e){e!=="mysql"&&this.$nextTick(()=>{const t=this.$refs.configurationForm.elements;this.$refs.configurationContent.SimpleBar.getScrollElement().scrollTo({top:t[t.length-1].offsetTop,left:0,behavior:"smooth"}),t[t.length-2].focus()})},focusFirstErrorField(e){[...this.$refs.configurationForm.elements].some(t=>{if(t.name===Object.keys(e)[0])return this.$nextTick(()=>{this.$refs.configurationContent.SimpleBar.getScrollElement().scrollTo({top:t.offsetTop-10,left:0,behavior:"smooth"})}),t.focus(),!0})},resetForm(){this.form={db_host:"127.0.0.1",db_port:3306,store_search_engine:"mysql"}},submitForm(){this.formSubmitting=!0,axios.post(route("install.do"),this.form).then(()=>{this.appInstalled=!0,this.resetForm(),this.resetErrorMessage(),this.errors.reset()}).catch(({response:e})=>{if(e.status===422){const t=e.data.errors;this.resetErrorMessage(),this.errors.record(t),this.focusFirstErrorField(t);return}this.setErrorMessage(e.data.message),this.scrollToTop()}).finally(()=>{this.formSubmitting=!1})}}};window.axios=r;const a=document.querySelector('meta[name="csrf-token"]').content;r.defaults.headers.common["X-CSRF-TOKEN"]=a;r.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";new s({el:"#app",components:{Install:n}});
