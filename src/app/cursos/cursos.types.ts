export interface TestReportResponse {
    email: string;
    people: Person[];
    inscriptions: Inscription[];
  }
  
  export interface Person {
    name: string;
    lastName: string;
  }
  
  export interface Inscription {
    courseId: number;
    reactionId?: number;
    inscripcionDate: string;
    certificationDate: string;
    advance: number;
    scoreCourse: number;
    folioCertificate: string;
    anyTest: boolean;
    course: Curso;
  }
  
  export interface Curso {
    name: string;
    imageUrl: string;
    sector: Sector;
  }
  
  export interface Sector {
    id: number;
    name: string;
    colorTheme: string;
  }
  
  export interface CursoCardItem {
    id: number;
    title: string;
    imageUrl: string;
    sectorName: string;
    sectorColor: string;
    progress: number;
    score: number;
    inscriptionDate: string;
    certificationDate: string;
    certificateFolio: string;
    hasTest: boolean;
    isFinished: boolean;
    isFavorite: boolean;
  }
  
  export type CursoTab = 'all' | 'in-progress' | 'finished' | 'favorites';
  
  export type SortOption =
    | 'default'
    | 'name-asc'
    | 'progress-desc'
    | 'progress-asc'
    | 'score-desc';