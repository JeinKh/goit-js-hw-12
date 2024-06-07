import{i as m,S as f}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();async function d(o){const r="https://pixabay.com/api/",i=new URLSearchParams({key:"44085737-801aedd726c9c1496368a8656",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}),a=`${r}?${i}`;try{return(await axios.get(a)).data}catch{throw new Error(res.statusText)}}function y({webformatURL:o,largeImageURL:r,tags:i,likes:a,views:e,comments:t,downloads:n}){return`
    <li class="gallery-item">
        <a class="gallery-link" href="${r}">
        <img class="gallery-image" src="${o}" alt="${i}"/>
        </a>
        <ul class="info">
        <li class="info-item"> <b>Likes</b> ${a} </li>
        <li class="info-item"> <b>Views</b> ${e} </li>
        <li class="info-item"> <b>Comments</b> ${t} </li>
        <li class="info-item"> <b>Downloads</b> ${n} </li>
        </ul>
    </li>
    `}function p(o){return o.map(y).join("")}const c=document.querySelector("#search-form");document.querySelector("#search-input");const u=document.querySelector(".loader"),l=document.querySelector(".gallery");let s="";c.addEventListener("input",o=>{s=o.target.value.trim()});c.addEventListener("submit",g);async function g(o){if(o.preventDefault(),h(),s!=="")try{const r=await d(s);if(r.hits.length===0){return l.innerHTML="",m.error({...L});const i=p(r.hits);l.innerHTML=i,S.refresh()}}catch(r){console.log(r)}finally{b()}}function h(){u.style.display="inline-block"}function b(){u.style.display="none"}const L={position:"topRight",timeout:1800,maxWidth:300,icon:"none",message:"Sorry, there are no images matching your search query. Please try again!"};let S=new f(".gallery a",{captionDelay:250,captionsData:"alt"});
//# sourceMappingURL=commonHelpers.js.map
