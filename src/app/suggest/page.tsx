import { GRADE_OPTION, SURVEY_TYPE } from '@/shared/const';

export default function Suggest() {
  return (
    <form>
      <label htmlFor="grade">학생 학년:</label>
      <select
        id="grade"
        name="grade"
        defaultValue=""
        aria-describedby="grade-error"
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

      <label htmlFor="category">분류:</label>
      <select
        id="category"
        name="category"
        defaultValue=""
        aria-describedby="category-error"
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

      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="제목을 입력해주세요"
        aria-describedby="title-error"
      />

      <label htmlFor="content">내용:</label>
      <textarea id="content" name="content" aria-describedby="content-error" />

      <button type="submit">제출</button>
    </form>
  );
}
