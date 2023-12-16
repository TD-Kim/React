import { useLocale, useSetLocale } from "../contexts/LocaleContext";

// function LocaleSelect({ value, onChange }) {
function LocaleSelect() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  // const handleChange = (e) => onChange(e.target.value);
  const handleChange = (e) => setLocale(e.target.value);

  return (
    // <select value={value} onChange={handleChange}>
    <select value={locale} onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelect;
