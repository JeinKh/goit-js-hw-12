import{a as p,i as l,S as g}from"./assets/vendor-c493984e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();async function m(t,s=1,a=15){const i="https://pixabay.com/api/",e="44085737-801aedd726c9c1496368a8656",r=`${i}`;try{return(await p(r,{params:{key:e,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:a}})).data}catch(n){l.error({title:"Error",message:`Something went wrong. ${n.message}`})}}function y({webformatURL:t,largeImageURL:s,tags:a,likes:i,views:e,comments:r,downloads:n}){return`
    <li class="gallery-item">
        <a class="gallery-link" href="${s}">
        <img class="gallery-image" src="${t}" alt="${a}"/>
        <ul class="info">
        <li class="info-item"> <h3 class="info-title">Likes</h3><p class="info-text">${i}</p></li>
        <li class="info-item"> <h3 class="info-title">Views</h3><p class="info-text">${e}</p></li>
        <li class="info-item"> <h3 class="info-title">Comments</h3><p class="info-text">${r}</p></li>
        <li class="info-item"> <h3 class="info-title">Downloads</h3><p class="info-text">${n}</p></li>
        </ul>
        </a>
    </li>
    `}function f(t){return t.map(y).join("")}const h=new g(".gallery a",{captionDelay:250,captionsData:"alt"}),o={form:document.querySelector("#search-form"),input:document.querySelector("#search-input"),loader:document.querySelector(".loader"),postsGallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector("#load-more-btn")};o.loader.classList.add("hidden");o.loadMoreBtn.classList.add("hidden");let c=1,d=0,u="";async function L(t){if(t.preventDefault(),o.postsGallery.innerHTML="",c=1,u=t.target.elements.searchQuery.value.trim(),!u){l.info({title:"No data",message:"Please enter a search query"});return}o.loader.classList.remove("hidden");try{const s=await m(u,c);d=s.totalHits,d===0&&(l.warning({title:"No result",message:"Sorry, there are no images matching your search query. Please try again!"}),o.loadMoreBtn.classList.add("hidden"));const a=f(s.hits);o.postsGallery.insertAdjacentHTML("beforeend",a),h.refresh(),d>15&&o.loadMoreBtn.classList.remove("hidden")}catch(s){l.error({title:"Error",message:`Something went wrong. ${s.message}`})}finally{o.loader.classList.add("hidden"),t.target.reset()}}o.form.addEventListener("submit",L);async function w(){c+=1,o.loader.classList.remove("hidden");try{const t=await m(u,c),s=f(t.hits);o.postsGallery.insertAdjacentHTML("beforeend",s),h.refresh();const i=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:i*2,behavior:"smooth"}),d=t.totalHits,(t.hits.length<15||d<=c*15)&&(o.loadMoreBtn.classList.add("hidden"),l.info({title:"End of results",message:"We're sorry, but you've reached the end of search results."}))}catch(t){l.error({title:"Error",message:`Something went wrong. ${t.message}`})}finally{o.loader.classList.add("hidden")}}o.loadMoreBtn.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map