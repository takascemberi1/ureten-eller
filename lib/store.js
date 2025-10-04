// lib/store.js
// Basit JSON tabanlı depo (demo/sandbox için). Prod'da DB kullanın.

import fs from "fs";
import path from "path";

const ROOT = process.env.DATA_DIR || "/tmp/ue_store";

function filePath(name) {
  if (!fs.existsSync(ROOT)) fs.mkdirSync(ROOT, { recursive: true });
  return path.join(ROOT, `${name}.json`);
}

export function readAll(name) {
  try {
    const p = filePath(name);
    if (!fs.existsSync(p)) return [];
    const txt = fs.readFileSync(p, "utf8");
    return txt ? JSON.parse(txt) : [];
  } catch {
    return [];
  }
}

export function writeAll(name, arr) {
  const p = filePath(name);
  fs.writeFileSync(p, JSON.stringify(arr, null, 2));
}

export function upsert(name, item, idKey = "id") {
  const list = readAll(name);
  const i = list.findIndex((x) => x[idKey] === item[idKey]);
  if (i > -1) list[i] = item;
  else list.push(item);
  writeAll(name, list);
  return item;
}

export function byId(name, id, idKey = "id") {
  return readAll(name).find((x) => x[idKey] === id);
}
