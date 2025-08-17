import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for handling errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.client.post('/auth/login', { email, password });
  }

  async register(email, password, name, role = 'student') {
    return this.client.post('/auth/register', { email, password, name, role });
  }

  async setupAdmin(email, password, name) {
    return this.client.post('/auth/setup-admin', { email, password, name });
  }

  async getCurrentUser() {
    return this.client.get('/auth/me');
  }

  async logout() {
    return this.client.post('/auth/logout');
  }

  // Course endpoints
  async getCourses() {
    return this.client.get('/courses');
  }

  async getCourse(courseId) {
    return this.client.get(`/courses/${courseId}`);
  }

  async createCourse(courseData) {
    return this.client.post('/courses', courseData);
  }

  async updateCourse(courseId, courseData) {
    return this.client.put(`/courses/${courseId}`, courseData);
  }

  async deleteCourse(courseId) {
    return this.client.delete(`/courses/${courseId}`);
  }

  // Lesson endpoints
  async getLesson(lessonId) {
    return this.client.get(`/lessons/${lessonId}`);
  }

  async submitCode(lessonId, code) {
    return this.client.post(`/lessons/${lessonId}/submit`, { lessonId, code });
  }

  async createLesson(lessonData) {
    return this.client.post('/lessons', lessonData);
  }

  async updateLesson(lessonId, lessonData) {
    return this.client.put(`/lessons/${lessonId}`, lessonData);
  }

  async deleteLesson(lessonId) {
    return this.client.delete(`/lessons/${lessonId}`);
  }

  // Progress endpoints
  async getMyProgress() {
    return this.client.get('/progress/me');
  }

  async getCourseProgress(courseId) {
    return this.client.get(`/progress/me/course/${courseId}`);
  }

  async getProgressDashboard() {
    return this.client.get('/progress/dashboard');
  }

  async createProgress(progressData) {
    return this.client.post('/progress', progressData);
  }

  async updateProgress(progressId, progressData) {
    return this.client.put(`/progress/${progressId}`, progressData);
  }

  // Classroom endpoints
  async getMyClassrooms() {
    return this.client.get('/classrooms');
  }

  async getClassroom(classroomId) {
    return this.client.get(`/classrooms/${classroomId}`);
  }

  async createClassroom(classroomData) {
    return this.client.post('/classrooms', classroomData);
  }

  async updateClassroom(classroomId, classroomData) {
    return this.client.put(`/classrooms/${classroomId}`, classroomData);
  }

  async deleteClassroom(classroomId) {
    return this.client.delete(`/classrooms/${classroomId}`);
  }

  async joinClassroom(inviteCode) {
    return this.client.post('/classrooms/join', { invite_code: inviteCode });
  }

  async leaveClassroom(classroomId) {
    return this.client.delete(`/classrooms/${classroomId}/leave`);
  }

  async getClassroomStudents(classroomId) {
    return this.client.get(`/classrooms/${classroomId}/students`);
  }

  async getClassroomProgress(classroomId) {
    return this.client.get(`/classrooms/${classroomId}/progress`);
  }

  // Achievement endpoints
  async getMyAchievements() {
    return this.client.get('/achievements/me');
  }

  // Analytics endpoints
  async getAdminDashboard() {
    return this.client.get('/analytics/dashboard');
  }

  async getCourseAnalytics() {
    return this.client.get('/analytics/courses');
  }

  async getStudentAnalytics(studentId) {
    return this.client.get(`/analytics/student/${studentId}`);
  }

  async getClassroomAnalytics(classroomId) {
    return this.client.get(`/analytics/classroom/${classroomId}`);
  }

  // Health check
  async healthCheck() {
    return this.client.get('/health');
  }
}

export const apiService = new ApiService();