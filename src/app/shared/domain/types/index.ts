// export type ModuleName = 'auth' | 'dashboard' | 'registro' | 'financeiro' | 'logistica' | 'energia' | 'details' | 'visualization' | 'access-control' ;
export type ModuleName = 'auth' | 'estagios' | 'dashboard' | 'vagas' ;

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