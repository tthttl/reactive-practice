import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/model/lesson';
import * as _ from 'lodash';
import { store } from '../event-bus-experiments/app-data';
import { Observer } from 'rxjs';
import { testLessons } from 'app/shared/model/test-lessons';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {

    lessons: Lesson[] = [];

    ngOnInit() {
        store.lessonsList$.subscribe(this);
    }

    next(data: Lesson[]) {
        console.log('Lessons list component received data ..');
        this.lessons = data;
        console.log(this.lessons);
    }

    error(error: any) {
        console.log(error);
    }

    complete() {
        console.log('LessonsList completed');
    }

    toggleLessonViewed(lesson: Lesson) {
        console.log('toggling lesson ...');
        store.toggleLessonViewed(lesson);
    }

    delete(deleted: Lesson) {
        store.deleteLesson(deleted);
    }



}



