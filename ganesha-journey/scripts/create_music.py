"""Create original instrumental compositions, not copies of commercial recordings."""
import numpy as np, subprocess, pathlib
sr=22050; duration=96
out=pathlib.Path(__file__).resolve().parents[1]/'public/assets/audio';out.mkdir(parents=True,exist_ok=True)
tracks=[('jaidev-instrumental',108,0),('ganesh-vandana-original',96,1),('morning-temple',84,2),('festival-lights',120,3),('kailash-meditation',64,4),('lotus-garden',88,5),('evening-aarti',100,6)]
for name,bpm,seed in tracks:
 rng=np.random.default_rng(seed+24); mix=np.zeros((sr*duration,2),np.float32)
 def add(signal,start,pan=0):
  i=int(start*sr);n=min(len(signal),len(mix)-i)
  if i<0 or n<=0:return
  mix[i:i+n,0]+=signal[:n]*(.7-pan*.3);mix[i:i+n,1]+=signal[:n]*(.7+pan*.3)
 def flute(freq,dur,vol=.11):
  t=np.arange(int(sr*dur))/sr
  vib=.003*np.sin(2*np.pi*5*t);phase=2*np.pi*freq*(t+vib*.03)
  wave=np.sin(phase)+.18*np.sin(2*phase)+.06*np.sin(3*phase)
  env=np.minimum(t/.075,1)*np.minimum((dur-t)/.2,1)
  return (wave*env*vol).astype(np.float32)
 def pluck(freq,dur=1.6,vol=.1):
  t=np.arange(int(sr*dur))/sr;w=sum(np.sin(2*np.pi*freq*k*t)*np.exp(-t*(1.5+k*.6))/k**1.4 for k in range(1,7));return (w*np.minimum(t/.006,1)*vol).astype(np.float32)
 def drum(lane):
  t=np.arange(int(sr*.5))/sr;f=[76,160,270,460][lane];phase=2*np.pi*(f*t+f*.14*(1-np.exp(-18*t)));sig=np.sin(phase)*np.exp(-t*(9+lane*4))*.22;sig+=rng.normal(0,1,len(t))*np.exp(-t*60)*.04
  if lane==3:sig+=sum(np.sin(2*np.pi*f*k*t)*np.exp(-t*12)*.024 for k in [2.13,3.27,4.51])
  return sig.astype(np.float32)
 root=[196,220,174.61,220,164.81,196,207.65][seed];scale=np.array([1,9/8,5/4,4/3,3/2,5/3,15/8,2])*root;beat=60/bpm
 seq=[0,2,4,2,1,0,4,5,4,2,1,2,0,4,3,2]
 for k in range(int(duration/beat)):
  st=k*beat
  if seed!=4 or k%2==0:
   if k%4 in [0,2]:add(drum(0 if k%4==0 else 1),st,-.15)
   add(drum(3),st,.25)
   if k%4==3:add(drum(2),st+beat*.5,-.2)
  if k%2==0:
   n=seq[(k//2+seed*2)%len(seq)];octv=2 if (k//32)%2 else 1
   add(flute(scale[n]*octv,beat*1.8,.11 if seed!=4 else .075),st+.035,.3)
  if k%4==0:add(pluck(root/2,beat*4,.15),st,-.3);add(pluck(root*1.5,beat*4,.07),st+.08,.4)
  if k%8==4:add(pluck(scale[(k//8+seed)%7],beat*2,.055),st,-.4)
 # Stereo room reflections, then soft limiting and gentle fades.
 dry=mix.copy()
 for delay,gain in [(.071,.16),(.137,.13),(.229,.09),(.413,.06)]:
  d=int(delay*sr);mix[d:]+=dry[:-d,::-1]*gain
 mix=np.tanh(mix*1.6)*.78;fade=int(sr*2);mix[:fade]*=np.linspace(0,1,fade)[:,None];mix[-fade:]*=np.linspace(1,0,fade)[:,None]
 p=subprocess.run(['ffmpeg','-y','-loglevel','error','-f','f32le','-ar',str(sr),'-ac','2','-i','pipe:0','-codec:a','libmp3lame','-b:a','128k',str(out/(name+'.mp3'))],input=mix.astype('<f4').tobytes(),check=True)
 print(name,flush=True)
