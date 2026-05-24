import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { DashboardService } from './cursos.service';
import { CursoCardItem, CursoTab, SortOption, TestReportResponse } from './cursos.types';
import {
  getCoursesInProgressCount,
  getFirstName,
  getUniqueSectors,
  mapInscriptionToCourseCard,
} from './cursos.utils';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
})
export class DashboardComponent {
  private service = inject(DashboardService);

  // Estado del API
  data = signal<TestReportResponse | null>(null);
  status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  error = signal<string | null>(null);

  // Estado de filtros
  searchTerm = signal('');
  activeTab = signal<CursoTab>('all');
  selectedSector = signal<string>('all');
  sortOption = signal<SortOption>('default');
  favoriteIds = signal<number[]>([]);

  // Computed
  courses = computed(() => {
    const d = this.data();
    if (!d) return [];
    return d.inscriptions.map(mapInscriptionToCourseCard);
  });

  firstName = computed(() => getFirstName(this.data()?.people[0]));
  coursesInProgress = computed(() => getCoursesInProgressCount(this.courses()));
  sectors = computed(() => getUniqueSectors(this.courses()));

  filteredCourses = computed(() => {
    let result = this.courses().map((course) => ({
      ...course,
      isFavorite: this.favoriteIds().includes(course.id),
    }));

    const tab = this.activeTab();
    if (tab === 'in-progress') result = result.filter((c) => !c.isFinished);
    if (tab === 'finished') result = result.filter((c) => c.isFinished);
    if (tab === 'favorites') result = result.filter((c) => c.isFavorite);

    const sector = this.selectedSector();
    if (sector !== 'all') {
      result = result.filter((c) => c.sectorName === sector);
    }

    const search = this.searchTerm().toLowerCase().trim();
    if (search) {
      result = result.filter((c) => c.title.toLowerCase().includes(search));
    }

    const sort = this.sortOption();
    if (sort === 'name-asc') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === 'progress-desc') {
      result = [...result].sort((a, b) => b.progress - a.progress);
    }
    if (sort === 'progress-asc') {
      result = [...result].sort((a, b) => a.progress - b.progress);
    }
    if (sort === 'score-desc') {
      result = [...result].sort((a, b) => b.score - a.score);
    }

    return result;
  });

  constructor() {
    this.loadData();
  }

  async loadData() {
    this.status.set('loading');
    try {
      const res = await firstValueFrom(this.service.getTestReport());
      this.data.set(res);
      this.status.set('success');
    } catch (err: any) {
      this.error.set(err?.message ?? 'Ocurrió un error inesperado');
      this.status.set('error');
    }
  }

  toggleFavorite(courseId: number) {
    this.favoriteIds.update((ids) =>
      ids.includes(courseId) ? ids.filter((id) => id !== courseId) : [...ids, courseId]
    );
  }

  // Helpers
  updateSearchTerm(e: Event) {
    this.searchTerm.set((e.target as HTMLInputElement).value);
  }

  updateSector(e: Event) {
    this.selectedSector.set((e.target as HTMLInputElement).value);
  }

  updateSort(e: Event) {
    this.sortOption.set((e.target as HTMLInputElement).value as SortOption);
  }
}