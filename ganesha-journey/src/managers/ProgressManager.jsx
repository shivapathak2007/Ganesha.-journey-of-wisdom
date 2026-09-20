import React,{createContext,useContext,useState,useEffect} from 'react';
import {audio} from './AudioManager';
const KEY='ganesha-wisdom-v1';
const fresh={wisdom:0,scores:{},played:[],stories:[],achievements:[],storyScenes:{},settings:{language:'en',music:.45,sfx:.6,narration:.7,quality:'medium',reduceMotion:false,subtitles:true,sensitivity:1},theme:'sunrise'};
const Context=createContext(null);
function read(){try{const d=JSON.parse(localStorage.getItem(KEY));return d?{...fresh,...d,settings:{...fresh.settings,...d.settings}}:fresh;}catch{return fresh;}}
export function Provider({children}){const [profile,setProfile]=useState(read),[toast,setToast]=useState(null);useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(profile));}catch{}document.documentElement.lang=profile.settings.language;document.body.classList.toggle('reduce-motion',profile.settings.reduceMotion);audio.setVolumes(profile.settings.music,profile.settings.sfx);audio.savedMusic=profile.settings.music*.45;},[profile]);useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(null),4200);return()=>clearTimeout(t);}},[toast]);
const t=(en,hi)=>profile.settings.language==='hi'?(hi||en):en;
const unlock=(name)=>{setProfile(p=>p.achievements.includes(name)?p:{...p,achievements:[...p.achievements,name],wisdom:p.wisdom+25});setToast(name);};
const finish=(id,score,extra={})=>{setProfile(p=>{const played=[...new Set([...p.played,id])],ach=[...p.achievements];if(!ach.includes('First Steps'))ach.push('First Steps');if(id==='diya'&&!ach.includes('Light of Devotion'))ach.push('Light of Devotion');if(id==='mouse'&&extra.distance>=1000&&!ach.includes('Kailash Runner'))ach.push('Kailash Runner');if(id==='rhythm'&&extra.accuracy>=90&&!ach.includes('Rhythm Master'))ach.push('Rhythm Master');if(played.length===9&&!ach.includes('Devoted Explorer'))ach.push('Devoted Explorer');if(ach.length>p.achievements.length)setToast(ach.at(-1));return {...p,played,achievements:ach,wisdom:p.wisdom+Math.max(10,Math.min(150,Math.round(score/10))),scores:{...p.scores,[id]:Math.max(p.scores[id]||0,score)}};});audio.bell();};
return <Context.Provider value={{profile,setProfile,t,toast,unlock,finish,settings:(s)=>setProfile(p=>({...p,settings:{...p.settings,...s}})),reset:()=>setProfile(structuredClone(fresh))}}>{children}</Context.Provider>;
}
export const useGame=()=>useContext(Context);
export const achievementHindi={'First Steps':'पहला कदम','Light of Devotion':'भक्ति का प्रकाश','Kailash Runner':'कैलाश धावक','Wisdom Wins':'बुद्धि की विजय','Rhythm Master':'ताल के उस्ताद','Devoted Explorer':'समर्पित खोजकर्ता'};
