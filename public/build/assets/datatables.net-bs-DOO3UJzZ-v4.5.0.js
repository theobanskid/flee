import{j as u}from"./jquery-BDaHQXZF-v4.5.0.js";import{D as e}from"./datatables.net-DZXX4CZW-v4.5.0.js";/*! DataTables Bootstrap 3 integration
 * © SpryMedia Ltd - datatables.net/license
 */let t=u;t.extend(!0,e.defaults,{renderer:"bootstrap"});t.extend(!0,e.ext.classes,{container:"dt-container form-inline dt-bootstrap",search:{input:"form-control input-sm"},length:{select:"form-control input-sm"},processing:{container:"dt-processing panel panel-default"},layout:{row:"row dt-layout-row",cell:"dt-layout-cell",tableCell:"col-12",start:"dt-layout-start col-sm-6",end:"dt-layout-end col-sm-6",full:"dt-layout-full col-sm-12"}});e.ext.renderer.pagingButton.bootstrap=function(r,n,s,i,l){var a=["dt-paging-button","page-item"];i&&a.push("active"),l&&a.push("disabled");var o=t("<li>").addClass(a.join(" ")),p=t("<a>",{href:l?null:"#",class:"page-link"}).html(s).appendTo(o);return{display:o,clicker:p}};e.ext.renderer.pagingContainer.bootstrap=function(r,n){return t("<ul/>").addClass("pagination").append(n)};
