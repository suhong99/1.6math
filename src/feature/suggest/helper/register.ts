import { writeSuggest } from '@/firestore/helper/suggest';

export type State = {
  errors?: {
    grade?: string;
    category?: string;
    title?: string;
    content?: string;
  };
  message?: string | null;
};

export const registerForm = async (_: State, formData: FormData) => {
  const grade = formData.get('grade') as string;
  const category = formData.get('category') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const errors: {
    grade?: string;
    category?: string;
    title?: string;
    content?: string;
  } = {};

  if (!grade) {
    errors.grade = '빈값이면 안됩니다';
  }
  if (!category) {
    errors.category = '빈값이면 안됩니다';
  }
  if (!title) {
    errors.title = '빈값이면 안됩니다';
  }
  if (!content) {
    errors.content = '빈값이면 안됩니다';
  }

  if (Object.keys(errors).length > 0) return { errors };

  const result = await writeSuggest({
    grade,
    category,
    title,
    content,
  });

  return {
    message: result.message,
  };
};
