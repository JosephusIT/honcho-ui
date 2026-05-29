export interface AppConfig {
  workspaceId: string;
  apiBase: string;
  operatorName: string;
  operatorRole: string;
}

export function readAppConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    workspaceId: env.NEXT_PUBLIC_WORKSPACE_ID?.trim() ?? '',
    apiBase: env.NEXT_PUBLIC_API_BASE?.trim() ?? '',
    operatorName: env.NEXT_PUBLIC_OPERATOR_NAME?.trim() || 'Workspace Operator',
    operatorRole: env.NEXT_PUBLIC_OPERATOR_ROLE?.trim() || 'Honcho user',
  };
}

export const appConfig = readAppConfig();

export function getMissingConfig(config: AppConfig): string[] {
  const missing: string[] = [];

  if (!config.workspaceId) {
    missing.push('NEXT_PUBLIC_WORKSPACE_ID');
  }

  if (!config.apiBase) {
    missing.push('NEXT_PUBLIC_API_BASE');
  }

  return missing;
}

export function isConfigured(config: AppConfig): boolean {
  return getMissingConfig(config).length === 0;
}
