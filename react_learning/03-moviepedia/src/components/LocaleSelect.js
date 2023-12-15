function LocaleSelect({ value, onChange }) {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <select value={value} onCahnge={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelect;
