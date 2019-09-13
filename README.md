## Structure
```
v2_order_form
├── README.md
├── package.json
├── .gitignore
│── .github/
│── internals/
│   │── modules/
|   │   └──css.js - postcss for webpack
│   └── webpack/ - webpack configs
│── node_modules/
├── server/ - local server
└── app
    │── api
    │   ├── auth/ - class AuthAPI
    │   ├── main/ - class MainAPI
    │   ├── orders/ - class OrderAPI
    │   ├── payment/ - class PaymentAPI
    │   └── index.js - class BaseAPI
    │── components
    │   ├── Catcher/ - error catcher
    │   ├── common/ - common ui components 
    │   ├── HOC/ - High Order Components
    │   ├── layout/ - layout elements
    │   ├── pages/ - router pages
    │   └── ui/ - unique ui components
    │── containers
    │    └── App/ - container for the whole application 
    │── fonts/
    │── images/
    │── instruments/ - some js functions for comfortable work
    │── theme/ - main styles
    │── .nginx.conf
    │── app.js
    │── config.js
    └── index.html
```

## Quick start

1.  Make sure that you have Node.js v8.10 and npm v5 or above installed.
2.  Clone this repo using `git clone https://frontend_denis_yatsko@bitbucket.org/dexdig/v2_order_form.git`
3.  Move to the appropriate directory: `cd v2_order_form`.
4.  Run `npm install` in order to install dependencies.
5.  Run `npm run start` and open http://localhost:3000 to view it in the browser.
5.  Run `npm run build` for builds the app for production to the `build` folder.

## Configuration

Configuration file

```
v2_order_form
└── app
    └── config.js
```

Available options: 

var              | info
-----------------|----------------------
END_POINT        | Communication endpoint for api
apiURL           | URL for api
dropZoneConfig   | array options for input type='file' 
month            | month name for view in deadline input
tootTipText      | text for tooltips
redirectPayError | links for declined/approved pay

## Custom Styles

```
v2_order_form
└── app
    └── theme
         └── vars.css
```

CSS vars for customize theme


