import{C as l}from"./chart.js-B787hJUy-v4.5.0.js";import"./@kurkle-BZxJdD1U-v4.5.0.js";$(function(){$.ajax({type:"GET",url:route("admin.sales_analytics.index"),success(t){let a={labels:t.labels,sales:[],formatted:[],totalOrders:[]};for(let s of t.data)a.sales.push(s.total.amount),a.formatted.push(s.total.formatted),a.totalOrders.push(s.total_orders);r(a)}})});function r(t){new l($(".sales-analytics .chart"),{type:"bar",data:{labels:t.labels,datasets:[{data:t.sales,backgroundColor:["rgba(255, 99, 132, 0.5)","rgba(54, 162, 235, 0.5)","rgba(255, 206, 86, 0.5)","rgba(75, 192, 192, 0.5)","rgba(153, 102, 255, 0.5)","rgba(255, 159, 64, 0.5)"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:!1,tooltip:{displayColors:!1,callbacks:{label(a){let s=`${trans("admin::dashboard.sales_analytics.orders")}: ${t.totalOrders[a.dataIndex]}`,e=`${trans("admin::dashboard.sales_analytics.sales")}: ${t.formatted[a.dataIndex]}`;return[s,e]}}}},scales:{y:{beginAtZero:!0,ticks:{callback:function(a){return t.formatted[0].charAt(0)+a}}}}}})}
