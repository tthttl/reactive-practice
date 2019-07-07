import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../shared/model/course';
import { Lesson } from '../shared/model/lesson';
import { CoursesService } from './../services/courses.service';


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course;
  lessons: Lesson[];

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {
    route.params
      .subscribe(params => {
        this.coursesService.findCourseByUrl(params['id']).subscribe(course => {
          this.course = course;
          this.coursesService.findLessonsForCourse(course.id).subscribe(lessons => {
            this.lessons = lessons;
          });
        });
      });
  }

  ngOnInit() {

  }

}
