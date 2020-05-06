# i18n
Lightweight simple translation module for React SPA.

# Ussage
### TranslateProvider
```
import { TranslateProvider } from 'djangostars/i18n'
fucntion APP () {
    return (
        <TranslateProvider
          defaultLanguage={navigator.language}
          storage={localStorage}
          url={'jsi18n'}
          api={api}
        >
            <Provider .../>
        </TranslateProvider>
    )
}
```

|  name  |  type  | default  |  description |
|---|---|---|---|
| defaultLanguage  |  `String` | en  | Default language code that will be used when app opened at first time. `navigator.language || navigator.userLanguage` for Web apps  |   
| langKey  | `String`  |  lang |  Key that will be used for caching userSelected language code in strorage  |   
| translationsKey  | `String`  | translations  | Key that will be used for caching translations  |
| storage  | `Object`  | required  | Mostly it will be AsyncStorage for react-native projects and localstorage for Web apps |
| url  | `String`  |  required | API endpoint for tranlations |
| api  | `Object`  | required  | instance of [API](https://github.com/django-stars/ds-frontend-api)  |
| reload  | `Function`  |   | function that will be used when switching from rtl-ltr to reload page. Mostly it will be `window.reload` for Web apps |

# gettext(message)
Returns the localized translation of message, based on the current language.

```
import { gettext } from 'djangostars/i18n'
function Title(props){
    return <h1>{ gettext("Hello") }</h1>
}
```

# pgettext(domain, message)
Like gettext(), but looks the message up in the specified domain

```
import { pgettext } from 'djangostars/i18n'
function Title(props){
    return <h1>{ pgettext("pageid", "Hello") }</h1>
}
```

# ngettext(singular, plural, n)
Like gettext(), but consider plural forms. If a translation is found, apply the plural formula to n, and return the resulting message. If no translation is found, return singular if n is 1; return plural otherwise.
```
import { ngettext } from 'djangostars/i18n'
function Title(props){
    return <h1>{ ngettext("Car", "Cars", 2) }</h1>
}
```

# npgettext(domain, singular, plural, n)
Like ngettext(), but look the message up in the specified domain.
```
import { npgettext } from 'djangostars/i18n'
function Title(props){
    return <h1>{ npgettext("loginPage", "Car", "Cars", 2) }</h1>
}
```

# interpolate(message, config, named)
The interpolate function supports dynamically populating a format string.

 - Positional interpolation: obj contains a JavaScript Array object whose elements values are then sequentially interpolated in their corresponding fmt placeholders in the same order they appear.
```
import { gettext, interpolate } from 'djangostars/i18n'
var fmts = gettext('There are %s objects. Remaining: %s')
 interpolate(fmts, [11, 20]) => 'There are 11 objects. Remaining: 20'
```
 - Named interpolation: This mode is selected by passing the optional boolean named parameter as true. 
```
import { gettext, interpolate } from 'djangostars/i18n'
const d = {
    count: 10,
    total: 50
}
var fmts = gettext('There are %(count)s of a total of %(total)s objects')
interpolate(fmts, d, true) => There are 10 of a total of 50 objects
```

# withTranslations (HOC)
Hight Order Component to pass transtation props to React component

```
import { withTranslations } from ''djangostars/i18n'
function MyComponent({
    gettext,
    pgettext,
    ngettext,
    npgettext,
    setLanguage,
    language
}){
    retrun ...
}

export default withTranslations(MyComponent)
```


# useTranslations (hook)
Hook to use transtation in React component

```
import { useTranslations } from ''djangostars/i18n'
function MyComponent(){
    const { gettext, pgettext, ngettext, npgettext, setLanguage, language } = useTranslations()
    retrun ...
}
```

# Translator (render props)
React component to use tarnslations as Render prop

```
import { Translator } from ''djangostars/i18n'
function MyComponent(){
    retrun (
        <Translator>
            {({ gettext, pgettext, ngettext, npgettext, setLanguage, language })=>{
                return <SomeJSX/>
            }
        </Translator>
    )
}
```
