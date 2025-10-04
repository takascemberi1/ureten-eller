// Evrensel, dosyasız demo store (client: localStorage, server: memory)
// UYARI: Demo içindir. Üretimde DB/PSP ile değiştirin.

const isBrowser = typeof window !== "undefined";
const MEM = {}; // server-side memory

function _read(name){
  if(isBrowser){
    try{ return JSON.parse(localStorage.getItem("__db_"+name) || "[]"); }catch{ return []; }
  }else{
    return Array.isArray(MEM[name]) ? MEM[name] : [];
  }
}

function _write(name, arr){
  if(isBrowser){
    localStorage.setItem("__db_"+name, JSON.stringify(arr));
  }else{
    MEM[name] = Array.isArray(arr) ? arr : [];
  }
  return arr;
}

export function readAll(name){ return _read(name); }
export function writeAll(name, arr){ return _write(name, arr); }

export function byId(name, id){
  const arr = _read(name);
  return arr.find(x => String(x.id) === String(id));
}

function _genId(){
  const s = Math.random().toString(36).slice(2,8);
  return `id_${Date.now().toString(36)}_${s}`;
}

export function upsert(name, item){
  const arr = _read(name);
  let it = { ...item };
  if(!it.id) it.id = _genId();
  const now = new Date().toISOString();
  if(!it.createdAt) it.createdAt = now;
  it.updatedAt = now;

  const i = arr.findIndex(x => String(x.id) === String(it.id));
  if(i >= 0) arr[i] = it; else arr.push(it);
  _write(name, arr);
  return it;
}

export function genId(){ return _genId(); }
