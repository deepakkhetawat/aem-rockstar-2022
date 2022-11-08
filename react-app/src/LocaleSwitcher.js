import React, {useContext} from 'react';
import LocaleContext from "./LocaleContext";

export default function LocaleSwitcher() {
  const { locale, setLocale } = useContext(LocaleContext);
  return (
  <div>
    <select className="localeDrodown" value={locale}
      onChange={e => setLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="nl">Dutch</option>
      <option value="de">Germany</option>
      <option value="fr">French</option>
      <option value="ja">Japanese</option>
      <option value="es">Español</option>
      <option value="it">Italian</option>
      <option value="ko">Korean</option>
      <option value="zh">Chinese</option>
     <option value="tr">Turkish</option>
    </select>
    </div>
  );
}

