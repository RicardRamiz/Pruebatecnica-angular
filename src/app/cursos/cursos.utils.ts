import { CursoCardItem, Inscription, Person } from './cursos.types';

export function getFirstName(person?: Person): string {
  return person?.name ?? '';
}

export function getCoursesInProgressCount(courses: CursoCardItem[]): number {
  return courses.filter((c) => !c.isFinished).length;
}

export function getUniqueSectors(courses: CursoCardItem[]): string[] {
  return [...new Set(courses.map((c) => c.sectorName))];
}

export function mapInscriptionToCourseCard(inscription: Inscription): CursoCardItem {
  return {
    id: inscription.courseId,
    title: inscription.course.name,
    imageUrl: inscription.course.imageUrl,
    sectorName: inscription.course.sector.name,
    sectorColor: inscription.course.sector.colorTheme,
    progress: inscription.advance,
    score: inscription.scoreCourse,
    inscriptionDate: inscription.inscripcionDate,
    certificationDate: inscription.certificationDate,
    certificateFolio: inscription.folioCertificate,
    hasTest: inscription.anyTest,
    isFinished: inscription.advance === 100, 
    isFavorite: false,
  };
}