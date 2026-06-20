/**
 * A* pathfinding over a tilemap's solid grid.
 */
export function findPath(tilemap, start, goal) {
  const key = (c, r) => `${c},${r}`;
  const open = [{ c: start.c, r: start.r, g: 0, f: 0, parent: null }];
  const came = new Map();
  const gScore = new Map([[key(start.c, start.r), 0]]);

  const h = (c, r) => Math.abs(c - goal.c) + Math.abs(r - goal.r);

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const cur = open.shift();
    if (cur.c === goal.c && cur.r === goal.r) {
      return reconstruct(came, cur);
    }

    for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nc = cur.c + dc;
      const nr = cur.r + dr;
      if (tilemap.tileAt(nc, nr) === -1 || tilemap.solid[nr * tilemap.width + nc] === 1) continue;
      const tentative = cur.g + 1;
      const k = key(nc, nr);
      if (tentative < (gScore.get(k) ?? Infinity)) {
        gScore.set(k, tentative);
        came.set(k, cur);
        open.push({ c: nc, r: nr, g: tentative, f: tentative + h(nc, nr), parent: cur });
      }
    }
  }
  return [];
}

function reconstruct(came, node) {
  const path = [];
  let cur = node;
  while (cur) {
    path.unshift({ c: cur.c, r: cur.r });
    cur = cur.parent;
  }
  return path;
}
