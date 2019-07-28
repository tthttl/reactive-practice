import { LessonsPagerService } from './../services/lessons-pager.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../shared/model/lesson';
import { CoursesHttpService } from '../services/courses-http.service';
import { Course } from '../shared/model/course';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    providers: [LessonsPagerService]
})
export class CourseComponent implements OnInit, OnDestroy {

    @Input()
    id: number;

    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;
    detail$: Observable<Lesson>;

    constructor(
        private coursesService: CoursesHttpService,
        private lessonPagerService: LessonsPagerService) {

    }

    ngOnInit() {
        this.course$ = this.coursesService.findCourseById(this.id);
        this.lessons$ = this.lessonPagerService.lessonsPage$;
        this.lessonPagerService.loadFirstPage(this.id);
    }

    previousLessonsPage() {
        this.lessonPagerService.previous();
    }

    nextLessonsPage() {
        this.lessonPagerService.next();
    }

    selectDetail(lesson: Lesson) {
        this.detail$ = this.coursesService.findLessonDetailByUrl(lesson.url);
    }

    backToMaster() {
        this.detail$ = undefined;
    }

    ngOnDestroy() {
        console.log('destroying CourseComponent ...');
    }

}








