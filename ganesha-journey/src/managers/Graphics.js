let supported;
export function supportsWebGL(){if(supported!==undefined)return supported;try{const c=document.createElement('canvas');const gl=c.getContext('webgl2');supported=!!gl;gl?.getExtension('WEBGL_lose_context')?.loseContext();}catch{supported=false;}return supported;}
