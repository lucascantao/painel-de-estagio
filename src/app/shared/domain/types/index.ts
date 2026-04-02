export type ModuleName = 'auth' | 'estagios' | 'dashboard' | 'vagas' | 'alunos';

export type MappedModule = {
  [key: string]: {
    logo?: string;
    title: string;
    sidenavTitle: string;
    browserTitle: string;
    route: string;
  };
}

export type Module = {
  logo?: string;
  title: string;
  browserTitle: string;
  route: string;
}