
import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';
import { BehaviorSubject, Observable } from 'rxjs';

class DataStore {

    private lessonsListSubject = new BehaviorSubject([]);

    public lessonsList$: Observable<Lesson[]> = this.lessonsListSubject.asObservable();

    public initializeLessonsList(newList: Lesson[]) {
        this.broadcast(_.cloneDeep(newList));
    }

    addLesson(newLesson: Lesson) {
        const lessons = this.getValueFromSubject();
        lessons.push(_.cloneDeep(newLesson));
        this.broadcast(lessons);
    }

    deleteLesson(deleted: Lesson) {
        const lessons = _.remove(this.getValueFromSubject(),
            lesson => lesson.id === deleted.id);
        this.broadcast(lessons);
    }

    toggleLessonViewed(toggled: Lesson) {
        const lessons = this.getValueFromSubject();
        const toggledLesson = lessons.find(element => element.id === toggled.id);
        toggledLesson.completed = !toggledLesson.completed;
        this.broadcast(lessons);
    }

    broadcast(lessons: Lesson[]) {
        this.lessonsListSubject.next(lessons);
    }

    getValueFromSubject() {
        return _.cloneDeep(this.lessonsListSubject.getValue());
    }
}

export const store = new DataStore();







