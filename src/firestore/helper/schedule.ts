import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { COLLECTIONS } from '../const/collection';
import { store } from '../firestore';
import { toYearMonth } from '@/feature/schedule/const/types';
import type {
  AcademySchedule,
  ClassRoom,
  SeasonType,
  StudentSchedule,
} from '@/feature/schedule/const/types';

export const getClasses = async (): Promise<ClassRoom[]> => {
  const classRef = collection(store, COLLECTIONS.CLASSES);
  const q = query(classRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<ClassRoom, 'id'>),
  }));
};

export const getClass = async (classId: string): Promise<ClassRoom | null> => {
  const docRef = doc(store, COLLECTIONS.CLASSES, classId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...(snapshot.data() as Omit<ClassRoom, 'id'>) };
};

export const createClass = async ({
  grade,
  name,
  year,
  month,
  seasonType,
  durationHours,
}: {
  grade: string;
  name: string;
  year: number;
  month: number;
  seasonType: SeasonType;
  durationHours: number;
}): Promise<string> => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);
  const classRef = collection(store, COLLECTIONS.CLASSES);
  const docRef = await addDoc(classRef, {
    grade,
    name,
    yearMonth: toYearMonth(year, month),
    seasonType,
    expiresAt: Timestamp.fromDate(expiresAt),
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const extendClass = async (
  classId: string,
  addHours: number
): Promise<void> => {
  const docRef = doc(store, COLLECTIONS.CLASSES, classId);
  const newExpiry = new Date(Date.now() + addHours * 60 * 60 * 1000);
  await updateDoc(docRef, { expiresAt: Timestamp.fromDate(newExpiry) });
};

export const closeClass = async (classId: string): Promise<void> => {
  const docRef = doc(store, COLLECTIONS.CLASSES, classId);
  await updateDoc(docRef, { expiresAt: Timestamp.now() });
};

export const deleteStudentSchedule = async (id: string): Promise<void> => {
  await deleteDoc(doc(store, COLLECTIONS.STUDENT_SCHEDULES, id));
};

export const updateStudentSchedule = async (
  id: string,
  data: { studentName: string; academies: AcademySchedule[] }
): Promise<void> => {
  await updateDoc(doc(store, COLLECTIONS.STUDENT_SCHEDULES, id), data);
};

export const deleteClass = async (classId: string): Promise<void> => {
  const schedulesRef = collection(store, COLLECTIONS.STUDENT_SCHEDULES);
  const q = query(schedulesRef, where('classId', '==', classId));
  const snapshot = await getDocs(q);
  await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));
  await deleteDoc(doc(store, COLLECTIONS.CLASSES, classId));
};

export const submitSchedule = async ({
  classId,
  studentName,
  academies,
}: {
  classId: string;
  studentName: string;
  academies: AcademySchedule[];
}): Promise<void> => {
  const scheduleRef = collection(store, COLLECTIONS.STUDENT_SCHEDULES);
  await addDoc(scheduleRef, {
    classId,
    studentName,
    academies,
    submittedAt: Timestamp.now(),
  });
};

export const getStudentSchedules = async (
  classId: string
): Promise<StudentSchedule[]> => {
  const scheduleRef = collection(store, COLLECTIONS.STUDENT_SCHEDULES);
  const q = query(scheduleRef, where('classId', '==', classId));
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<StudentSchedule, 'id'>),
  }));
  return results.sort(
    (a, b) => a.submittedAt.toMillis() - b.submittedAt.toMillis()
  );
};
