// Archivo sin "use client" para poder usarlo en layout.tsx (componente de servidor)
/** Script que corre antes de pintar: aplica tema guardado (o el del sistema) y activa animaciones */
export const themeInitScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}d.dataset.theme=t;var l=localStorage.getItem('lang');if(l==='en'||l==='es'){d.lang=l;}}catch(e){document.documentElement.dataset.theme='dark';}})();`;
