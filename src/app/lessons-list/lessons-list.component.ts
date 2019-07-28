import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lesson } from '../shared/model/lesson';
import * as _ from 'lodash';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent {

    @Input()
    lessons: Lesson[];

    @Output()
    selected = new EventEmitter<Lesson>();

    select(lesson: Lesson) {
        this.selected.next(lesson);
    }

}



