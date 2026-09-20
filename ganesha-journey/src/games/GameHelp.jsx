import React,{useState} from 'react';
import {HelpCircle,X} from 'lucide-react';
import {useGame} from '../managers/ProgressManager';
export default function GameHelp({steps}){const {t}=useGame(),[open,setOpen]=useState(false);return <div className="game-help"><button className="help-toggle" aria-expanded={open} onClick={()=>setOpen(!open)}><HelpCircle size={15}/>{t('Instructions','निर्देश')}</button>{open&&<div className="help-popover"><button className="icon-button" onClick={()=>setOpen(false)} aria-label={t('Close instructions','निर्देश बंद करें')}><X size={16}/></button><h3>{t('How to play','कैसे खेलें')}</h3><ol>{steps.map(([en,hi],i)=><li key={i}>{t(en,hi)}</li>)}</ol></div>}</div>}
