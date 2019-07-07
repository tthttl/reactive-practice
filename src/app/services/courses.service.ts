import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'app/shared/model/course';
import { AngularFireDatabase } from '@angular/fire/database';
import { Lesson } from '../shared/model/lesson';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses').valueChanges().do(console.log);
  }

  findLatestLessons(): Observable<Lesson[]> {
    return this.db.list('lessons', ref => ref.orderByKey().limitToLast(10))
      .valueChanges()
      .do(console.log);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list('courses', ref => ref.orderByChild('url')
      .equalTo(courseUrl))
      .snapshotChanges()
      .pipe(
        map(data => {
          return <Course>{
            id: data[0].payload.key,
            ...data[0].payload.val()
          }
        })
      );
  }

  findLessonsForCourse(courseId: string): Observable<Lesson[]> {
    const result: Lesson[] = [];
    return Observable.create(observer => {
      this.db.list('lessons', ref => ref.orderByChild('courseId')
        .equalTo(courseId))
        .snapshotChanges()
        .subscribe(data => {
          data.forEach(element => {
            result.push(<Lesson>{
              id: element.payload.key,
              ...element.payload.val()
            });
          });
          observer.next(result);
        });
    });

  }

}
