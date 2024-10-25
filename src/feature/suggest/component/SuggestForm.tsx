'use client';

import { registerForm } from '@/feature/suggest/helper/register';
import { GRADE_OPTION, SURVEY_TYPE } from '@/shared/const';
import { useFormState } from 'react-dom';

export type State = {
  errors?: {
    grade?: string;
    category?: string;
    title?: string;
    content?: string;
  };
  message?: string | null;
};

export default function SuggestForm() {
  const initialState: State = { message: '', errors: {} };

  const [state, dispatch] = useFormState(registerForm, initialState);

  return (
    <form action={dispatch} className="space-y-4 w-full mx-auto">
      <div>
        <label
          htmlFor="grade"
          className="block text-sm font-medium text-gray-700"
        >
          학년:
        </label>
        <select
          id="grade"
          name="grade"
          defaultValue=""
          aria-describedby="grade-error"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            선택하세요
          </option>
          {GRADE_OPTION.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
        <div id="grade-error" aria-live="polite" aria-atomic="true">
          {state.errors?.grade && (
            <p className="mt-2 text-sm text-red-500">{state.errors.grade}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          분류:
        </label>
        <select
          id="category"
          name="category"
          defaultValue=""
          aria-describedby="category-error"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            선택하세요
          </option>
          {SURVEY_TYPE.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div id="category-error" aria-live="polite" aria-atomic="true">
          {state.errors?.category && (
            <p className="mt-2 text-sm text-red-500">{state.errors.category}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          제목:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력해주세요"
          aria-describedby="title-error"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title && (
            <p className="mt-2 text-sm text-red-500">{state.errors.title}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          내용:
        </label>
        <textarea
          id="content"
          name="content"
          aria-describedby="content-error"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md min-h-64"
        />
        <div id="content-error" aria-live="polite" aria-atomic="true">
          {state.errors?.content && (
            <p className="mt-2 text-sm text-red-500">{state.errors.content}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        제출
      </button>
    </form>
  );
}
