import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionsTypes";

const CHANGE_EVENT = "change";
let _courses: any = [];

class CourseStore extends EventEmitter {
  //hey i would like to know when store changes
  addChangeListener(callback: any) {
    this.on(CHANGE_EVENT, callback);
  }
  //unsubscribe from the store
  removeChangeListener(callback: any) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug: any) {
    return _courses.find((course: any) => course.slug === slug);
  }
}

const store = new CourseStore();
Dispatcher.register((action: any) => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map((course: any) =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(
        (course: any) => course.id !== parseInt(action.id, 10) //iterate over courses and filter out the course id that was just deleted
      );
      store.emitChange();
      break;
    default:
    //nothing to do here
  }
});

export default store;