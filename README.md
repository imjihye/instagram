# Instagram by React

## 모듈 설치
```
npm install 
```
- react
- react-dom
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- webpack
- webpack-dev-server
- remarkable
- jquery
- bootstrap-css
- style-loader
- css-loader

## 서버 띄우기 (clean -> build -> start)
```
npm run start
```

## 테스트
```
http://localhost:8123/
```

## Directory
```
├── package.json                # npm 설정파일
├── webpack.config.js           # webpack 설정파일 
├── src                         # 클라이언트 디렉토리
│   ├── static                  # 클라이언트 static 디렉토리
│   │   └── css                 # 클라이언트 css 디렉토리
│   │       ├── base.css        # 클라이언트 base css
│   │       └── style.css       # 클라이언트 style css
│   ├── instagram.js            # 클라이언트 컴포넌트
│   └── index.js                # 클라이언트 메인 스크립트
└── dist                        # webpack으로 컴파일된 클라이언트 빌드 디렉토리
    ├── bundle.js               # webpack으로 컴파일된 클라이언트 메인 스크립트
    └── index.html              # 메인 페이지
```
