const transitions = {
  buyer: ['revision_requested', 'completed', 'disputed', 'canceled'],
  seller: ['in_progress', 'delivered', 'canceled'],
}

export function canTransition(actorRole, targetStatus) {
  return Boolean(transitions[actorRole]?.includes(targetStatus))
}
