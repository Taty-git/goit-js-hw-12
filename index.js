import{a as E,S as h,i as l}from"./assets/vendor-BjRz3xa9.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const M="49366539-6fd412d088ca04dcc1c9b4bd7";let P=15;const b=async(e,a)=>{try{return(await E.get("https://pixabay.com/api/",{params:{key:M,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:P,page:a}})).data}catch(t){return console.error("Error fetching images:",t),[]}};let d=new h(".gallery a",{captionsData:"alt",captionDelay:250});function S(){const e=document.querySelector(".loader");e&&(e.style.display="inline-block")}function c(){const e=document.querySelector(".loader");e&&(e.style.display="none")}const $=()=>{const e=document.querySelector(".gallery");e.innerHTML="",m()};function w(e){document.querySelector(".gallery").insertAdjacentHTML("beforeend",e.map(({webformatURL:t,largeImageURL:i,tags:r,likes:o,views:s,comments:v,downloads:x})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img class="gallery-image" src="${t}" alt="${r}" loading="lazy" />
        </a>
        <div class="info">
                <p><b>Likes</b><br>${o}</p>
                <p><b>Views</b><br>${s}</p>
                <p><b>Comments</b><br>${v}</p>
                <p><b>Downloads</b><br>${x}</p>
            </div>
      </li>`).join("")),d.refresh()}function L(){d||(d=new h(".gallery a",{captionsData:"alt",captionDelay:250})),d.refresh()}function m(){const e=document.querySelector(".gallery-item");if(e){const a=e.getBoundingClientRect().height;window.scrollBy({top:a*2,left:0,behavior:"smooth"})}}function q(){const e=document.querySelector(".load-more");e&&(e.style.display="flex")}function f(){const e=document.querySelector(".load-more");e&&(e.style.display="none")}const y=document.querySelector(".form");let n=1,u="",g=0;c();f();y.addEventListener("submit",async function(e){e.preventDefault();const a=y.querySelector('input[name="search-text"]').value.trim();if(!a){l.error({title:"Error",message:"Please, enter the text for search!"});return}a!==u&&(n=1,$(),m(),u=a),S();try{const t=await b(u,n);if(c(),!t||!t.hits||t.hits.length===0){l.warning({title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!"}),f();return}const i=t.hits;g=t.totalHits,w(i),L(),q(),n*15>=g&&f()}catch(t){c(),l.error({title:"Error",message:"Illegal operation."}),console.error(t)}});const p=document.querySelector(".load-more");p&&p.addEventListener("click",async()=>{n+=1,S();try{const e=await b(u,n);if(c(),!e||!e.hits||e.hits.length===0||e.totalHits<=n*15){l.warning({title:"Caution",message:"Sorry, no more images available."}),f();return}else q();w(e.hits),L(),m()}catch(e){c(),l.error({title:"Error",message:"Error loading more images."}),console.error(e)}});
//# sourceMappingURL=index.js.map
