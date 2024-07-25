# MyLog

**🔗 데모 URL : https://mylog-437d4.web.app/**

## 1. 개요
글을 업로드하고 다른 사람의 글을 확인할 수 있는 블로그 서비스입니다. 구글 회원가입 및 로그인으로 서비스를 이용할 수 있어 안정적이고 접근이 용이하도록 구성하였습니다. 로그인, 글 작성, 글 확인 기능을 제공합니다. 백엔드  서비스 구현의 부담을 줄이기 위해 Firebase를 사용하였습니다.


## 2. 기술 스택
- FrontEnd: React, HTML5, Tailwind CSS, JavaScript
- BackEnd: Firebase

## 3. UI 및 기능
**1. 메인 페이지**

|<img src="https://user-images.githubusercontent.com/97442475/216751020-0d4cf34e-1b42-4bac-ba6f-4a020e5aa23d.gif" width="900">|
|---|
|포스트가 로딩되는 동안 메세지가 나타납니다.|

<br>
<table>
    <tbody>
        <tr>
         <td>업로드 된 포스트가 없을 경우</td>
         <td>업로드 된 포스트가 있을 경우</td>
        </tr>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/97442475/215925913-8c6d58bc-fb5b-4f0b-8f0b-bfc657138149.png"></td>
            <td><img src="https://user-images.githubusercontent.com/97442475/215928165-1c5b4ebd-4c16-4f5e-a9e3-56b85f46b906.png"></td>
        </tr>
        <tr>
            <td>'포스트가 없습니다.' 라는 메세지가 출력됩니다.</td>
            <td>모든 포스트를 출력하고 포스트 작성자와 로그인한 사용자가 동일할 때 삭제 버튼이 표시됩니다.</td>
        </tr>
    </tbody>
</table>

<br>
<br>

**2. 로그인 페이지**
<table>
    <tbody>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/97442475/215926116-3f178ded-ff0e-4ed7-97b7-de4e0b8bf6ca.gif"></td>
        </tr>
        <tr>
            <td>Firebase의 Authentication 기능으로 구글 회원가입 및 로그인이 가능합니다.</td>
        </tr>
    </tbody>
</table>

<br>
<br>

**3. 포스트 작성 페이지**
<table>
    <tbody>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/97442475/215926127-b1f5c140-97a4-496c-ab5d-14c5330616ab.gif"></td>
        </tr>
        <tr>
            <td>포스트 업로드 시 Firebase의 Firestore DB와 Stroage에 포스트 내용과 이미지가 각각 실시간으로 업로드 됩니다.</td>
        </tr>
    </tbody>
</table>

<br>
<br>

**4. 상세 페이지**
<table>
    <tbody>
        <tr>
            <td><img src="https://user-images.githubusercontent.com/97442475/215926141-75af6e31-45de-4f62-8629-33b09767c31d.gif"></td>
        </tr>
        <tr>
            <td>클릭된 해당 글의 내용이 출력됩니다.</td>
        </tr>
    </tbody>
</table>

<br>
<br>

## 4. 폴더 구조
```
📦src
 ┣ 📂components
 ┃ ┣ 📂Footer
 ┃ ┃ ┗ 📜Footer.jsx
 ┃ ┣ 📂Header
 ┃ ┃ ┗ 📜Header.jsx
 ┃ ┣ 📂Post
 ┃ ┃ ┗ 📜Post.jsx
 ┃ ┗ 📂PostList
 ┃ ┃ ┗ 📜PostList.jsx
 ┣ 📂firebase_setup
 ┃ ┗ 📜firebase.js
 ┣ 📂handles
 ┃ ┗ 📜handleSubmit.js
 ┣ 📂pages
 ┃ ┣ 📂LoginPage
 ┃ ┃ ┗ 📜LoginPage.jsx
 ┃ ┣ 📂MainPage
 ┃ ┃ ┗ 📜MainPage.jsx
 ┃ ┣ 📂ViewPage
 ┃ ┃ ┗ 📜ViewPage.jsx
 ┃ ┗ 📂WritePage
 ┃ ┃ ┗ 📜WritePage.jsx
 ┣ 📂plugins
 ┣ 📂template
 ┃ ┗ 📜BasicTemplate.jsx
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜index.js
 ```
 
 ----
 ## 5. 트러블 슈팅

 **1. 로그인 하지 않고 수동으로 '/write' 페이지로 이동하여 글 작성이 가능한 오류 발생**
 <br>
 <img src="https://user-images.githubusercontent.com/97442475/216513983-ca4912c9-3227-4123-8e4f-4b421d242a50.png" width="400">
   <br>
  * 해결: useEffect 훅 함수를 이용하여 첫 렌더링에 로그인 여부를 담고 있는 state인 isAuth가 false 일 때, login 페이지로 이동하도록 수정함
```js
  useEffect(() => {
    if (!isAuth) navigate('/login');
  }, []);
```

 **2. 새로고침 하면 로그인이 해제되는 문제**
 * 원인: useState(false)로 초기 렌더링 값을 false로 고정시켜 놓았기 때문에 새로고침을 할때마다 isAuth 값에 false 값이 들어가서 로그아웃 상태가 됨
```js
// 수정 전 코드
  const [isAuth, setIsAuth] = useState(false);
```

 * 해결: 로그인을 했을 때 저장했던 localStorage의 isAuth 값(true 상태)을 반영하도록 수정함. 새로고침을 해도 localStorage에 값이 남아있기 때문에 로그인이 풀리지 않음.
```js
// 수정 후 코드
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
```

 **3. 로그아웃 시 404 페이지로 이동하는 문제**
 * 원인: 보통 클라이언트 사이드 렌더링을 하는 SPA에서 발생하는 문제로, 서버에 존재하지 않는 url을 입력함으로써 생기는 문제
 * 참고: [참고글1](https://stackoverflow.com/questions/34415725/when-i-refresh-my-website-i-get-a-404-this-is-with-angular2-and-firebase), [참고글2](https://bejda.medium.com/fixing-the-angular-404-on-refresh-issue-in-firebase-f462124afe40), [참고글3](https://viblo.asia/p/spa-get-404-error-when-refreshing-the-page-or-access-directly-and-seo-3RlL5YkzLbB)

 * 해결: 호스팅 서비스인 파이어베이스의 rewrites 기능을 이용하여 해결함. 
```js
//firebase.json 에 다음과 같은 규칙을 추가
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
```
 
