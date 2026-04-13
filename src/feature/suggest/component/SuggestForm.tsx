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

const fieldClass =
  'w-full mt-1 p-3 border border-slate-200 rounded-xl text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors';

const labelClass = 'block text-sm font-semibold text-slate-700 mb-0.5';

export default function SuggestForm() {
  const initialState: State = { message: '', errors: {} };

  const [state, dispatch] = useFormState(registerForm, initialState);

  return (
    <form action={dispatch} className="space-y-5 w-full">
      <div>
        <label htmlFor="grade" className={labelClass}>
          학년
        </label>
        <select
          id="grade"
          name="grade"
          defaultValue=""
          aria-describedby="grade-error"
          className={fieldClass}
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
            <p className="mt-1.5 text-sm text-red-500">{state.errors.grade}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>
          분류
        </label>
        <select
          id="category"
          name="category"
          defaultValue=""
          aria-describedby="category-error"
          className={fieldClass}
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
            <p className="mt-1.5 text-sm text-red-500">{state.errors.category}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력해주세요"
          aria-describedby="title-error"
          className={fieldClass}
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title && (
            <p className="mt-1.5 text-sm text-red-500">{state.errors.title}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="content" className={labelClass}>
          내용
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="내용을 자유롭게 작성해주세요"
          aria-describedby="content-error"
          className={`${fieldClass} min-h-48 resize-none`}
        />
        <div id="content-error" aria-live="polite" aria-atomic="true">
          {state.errors?.content && (
            <p className="mt-1.5 text-sm text-red-500">{state.errors.content}</p>
          )}
        </div>
      </div>

      {state.message && (
        <p className="text-sm text-amber-600 font-medium">{state.message}</p>
      )}

      <button
        type="submit"
        className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors text-base shadow-md shadow-amber-500/20"
      >
        제출하기
      </button>
    </form>
  );
}
