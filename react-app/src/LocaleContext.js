import React from 'react'

const DEFAULT_LOCALE = 'en';

const LocaleContext = React.createContext({
    locale: DEFAULT_LOCALE,
    setLocale: () => {}
});

export default LocaleContext;
