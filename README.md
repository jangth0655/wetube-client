![header](https://capsule-render.vercel.app/api?type=rounded&color=auto&height=120&section=header&text=Wetube&fontSize=70)

<div align="center">
    <br />
    <div>
      <img style="border-radius:10px" height="70" src="./assets/wetube-logo.png" />
    </div>
    <a display="block" href="https://wetube-client.vercel.app/" >
      https://wetube-client.vercel.app/
    </a>
    <br />
</div>

<br></br><br></br>

## Content

- 🛠 [Built with](#built-with)
- 🚀 [Project](#project)
- ✓ [Features](#features)
- 🔥 [Code](#code)

---

## Built with

### Front-end

- `Next JS`
- `Typescript`
- `tailwindCSS`
- `Framer-motion`
- `swr, axios`
- `React-hook-form`
- `ffmpeg`

### Back-end

- `Express`
- `Mongoose`
- `MongoDB`
- `Vercel`
- `aws`
- code : <a>https://github.com/jangth0655/wetube-server</a>

### Deploy

- Client : `Vercel`
- Server : `Heroku` , `AWS S3`

<br></br><br></br>

## Project

- 영상을 업로드 하거나 웹캠으로 녹화하여 업로드할 수 있는 애플리케이션으로, 서로 다른 사람들끼리 영상을 공유하고 의견을 나눌 수 있는 애플리케이션입니다.

> 회원가입, 로그인, 로그아웃

- 유저네임, 이메일, 이름, 지역, 패스워드, 패스워드 확인을 입력하여 회원가입을 할 수 있습니다.
- 유저네임과, 이메일은, 패스워드는 필수조건이며 유저네임과 이메일은 중복이 불가능하도록 하였습니다.
- 로그인시 유저가 입력한 비밃번호는 `bcrypt`로 이전 해쉬화된 비밀번호와 비교하여 확인했습니다.  
  → express-session의 세션 ID를 MongoStore를 활용하여 MongoDB에 저장하고,  
  → 쿠키를 통해 세션 ID를 주고 받으면서 인증을 구현했습니다.
- 유저의 아바타를 클릭하여 로그인 유저는 로그아웃, 그렇지 않으면 로그인을 할 수있습니다.

  <br />
  <img height="500" src="./public/image/preview/login.gif" />
  <br /><br />

> 메인(홈)

- 유저가 업로드한 비디오(유저, 제목, 조회수, 만든 날짜)를 확인할 수 있습니다.
- 비디오를 클릭하면 비디오 상세페이지로 이동할 수 있습니다.
  <br></br>

> 비디오 업로드

- PC에서 비디오를 업로드 할 수 있습니다.
- 제목과 해쉬태그, 설명을 입력하여 업로드 할 수 있습니다.

  <br />
  <img height="500" src="./public/image/preview/upload-video.gif" />
  <br /><br />

> 상세 페이지

- 비디오를 커스트마이징하여 재생, 정지, progress bar 조절, 볼륨 조절, 전체화면을 할 수 있습니다.
- 댓글을 남길 수 있습니다.

  <br />
  <img height="500" src="./public/image/preview/videao-detail.gif" />
  <br /><br />

> 비디오 편집 및 삭제

- 해당 비디오 유저만 편집 페이지로 이동할 수 있습니다.
- 비디오의 제목과 해쉬태그, 설명을 수정할 수 있습니다.
- 비디오를 삭제할 수 있습니다.  
  → aws 버킷에서도 삭제됩니다.

  <br />
  <img height="500" src="./public/image/preview/video-edit.gif" />
  <br /><br />

> 검색

- 비디오 제목으로 비디오를 검색할 수 있습니다.

  <br />
  <img height="500" src="./public/image/preview/search-video.gif" />
  <br /><br />

> 프로필

- 프로필 페이지에서 자신이 업로드한 비디오를 확인할 수 있습니다.
- 로그인하지 않은 유저도 다른 유저의 프로필을 확인할 수 있습니다.
- 해당 로그인 유저만 프로필 수정페이지로 이동할 수 있습니다.
  <br></br>

> 프로필 및 패스워드 편집

- 유저의 아바타를 변경할 수 잇습니다.
- 유저네임과 이메일, 이름, 지역을 편집할 수 있습니다.
- 패스워드 페이지로 이동하여 패스워드 편집을 할 수 있습니다.  
  → bcrypt를 이용하여 패스워드를 비교합니다.  
  → 패스워드 확인을 하여 최종적으로 패스워드를 변경할 수 있습니다.

  <br />
  <img height="500" src="./public/image/preview/profile-edit.gif" />
  <br /><br />

> 비디오 녹화 및 다운로드

- 시작하기를 클릭하여 웹캠 통해 녹화 화면을 확인할 수 있습니다.
- 비디오 아이콘을 클릭하여 녹화를 진행할 수 있습니다.
- 녹화가 완료되면 PC에 다운로드할 수 있습니다.

  <br />
  <img height="500" src="./public/image/preview/video-recoding.gif" />
  <br /><br />

## Features

### 🌈 Video

- Info
- 댓글작성
- 조회수, 업로드 날짜 확인
- 비디오
  <br />

### 💻 Community

- 게시글 업로드
- 게시글 삭제
  <br />

### 🙋‍♂️ User

- 로그인
- 아바타 업로드 (포토 미리보기)
- 프로필 수정 (포토 미리보기, 삭제)
- 회원정보 변경
- 업로드 비디오 확인

  <br></br><br></br>

## Code

<a href="https://github.com/jangth0655/nextjs-girnmarket">🔥 GitHub</a>
<br></br><br></br>
