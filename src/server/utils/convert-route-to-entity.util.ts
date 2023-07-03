const mapping: Record<string, string> = {
  clients: 'client',
  companies: 'company',
  equipment: 'equipment',
  lendings: 'lending',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
