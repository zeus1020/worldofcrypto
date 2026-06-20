/**
 * Combat resolution helpers shared across heroes and enemies.
 */
export function resolveHit(attacker, target, baseDamage) {
  let damage = baseDamage;

  if (attacker.lastCrit) {
    damage *= 2;
    attacker.lastCrit = false;
  }

  const variance = 0.9 + Math.random() * 0.2;
  damage = Math.round(damage * variance);

  target.takeDamage(damage);
  return damage;
}

export function inRange(a, b, range) {
  return Math.hypot(a.x - b.x, a.y - b.y) <= range;
}

export function applyKnockback(target, fromX, fromY, force) {
  const dx = target.x - fromX;
  const dy = target.y - fromY;
  const dist = Math.hypot(dx, dy) || 1;
  target.x += (dx / dist) * force;
  target.y += (dy / dist) * force;
}
