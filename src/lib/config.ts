export const appConfig = {
  workspaceId: process.env.NEXT_PUBLIC_WORKSPACE_ID?.trim() ?? '',
  apiBase: process.env.NEXT_PUBLIC_API_BASE?.trim() ?? '',
  operatorName: process.env.NEXT_PUBLIC_OPERATOR_NAME?.trim() || 'Workspace Operator',
  operatorRole: process.env.NEXT_PUBLIC_OPERATOR_ROLE?.trim() || 'Honcho user',
};

export function getMissingConfig(): string[] {
  const missing: string[] = [];

  if (!appConfig.workspaceId) {
    missing.push('NEXT_PUBLIC_WORKSPACE_ID');
  }

  if (!appConfig.apiBase) {
    missing.push('NEXT_PUBLIC_API_BASE');
  }

  return missing;
}

export function isConfigured(): boolean {
  return getMissingConfig().length === 0;
}
