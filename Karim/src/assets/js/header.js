let ID = "";
let PWD = "";
let PWDConfirm = "";
let NAME = "";
let EMAIL = "";

//아이디 입력값 핸들러
function handleIdChange(e) {
  ID = e.target.value;
}

//비밀번호 입력값 핸들러
function handlePWDChange(e) {
  PWD = e.target.value;
}

//비밀번호 확인 핸들러
function handlePWDConfirmChange(e) {
  PWDConfirm = e.target.value;
}

//닉네임 입력값 핸들러
function handleNameChange(e) {
  NAME = e.target.value;
}

//이메일 입력값 핸들러
function handleEmailChange(e) {
  EMAIL = e.target.value;
}

// 로그인 '확인' 클릭 핸들러
function handleClickConfirm(e) {
  e.preventDefault();
  
  /*document.getElementById("loginForm").action =  `${root}/user/login`;
  document.getElementById("loginForm").submit();*/
  
  fetch(`${root}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
			userId : ID,
			userPwd : PWD
		})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('로그인에 실패했습니다.');
        }
  	  else {
  		location.href = `${root}/`;
  	  }
    })
  /*   .then(data => {
        const member = data.member;
        makeForm(member);
    })*/
    .catch(error => {
        console.error('로그인 에러:', error);
        alert('로그인 중 오류가 발생했습니다.');
    });

  closeLoginModal(e);
}

// 회원가입 확인 클릭 핸들러
function handleClickSignupConfirm(e) {
  e.preventDefault();

  /*document.getElementById("signupForm").action = `${root}/user/join`;
  document.getElementById("signupForm").submit();*/
  fetch(`${root}/user/join`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
  			userId : ID,
  			userPwd : PWD,
			userName: NAME,
			emailId: document.querySelector(`#emailid`).value,
			emailDomain: document.querySelector(`#emaildomain`).value
  		})
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('회원가입에 실패했습니다.');
          }
    	  else {
    		location.href = `${root}/`;
    	  }
      })
      .catch(error => {
          console.error('회원가입 에러:', error);
          alert('회원가입 중 오류가 발생했습니다.');
      });

  closeSignupModal(e);
}

//로그인 성공 시 헤더 변경
 function showLogout() {
    const logoutSection = document.getElementById('header_logout');
    logoutSection.style.display = 'flex'; // display를 flex로 변경
    
    const loginSection = document.getElementById('header_login');
    loginSection.style.display = 'none'; // 로그인 섹션은 숨김
	
	
  }

// 모달창 열기
const loginmodal = document.getElementById("loginModalContainer");
const signupmodal = document.getElementById("signupModalContainer");

function openLoginModal(e) {
  e.preventDefault();
  loginmodal.style.display = "flex";
}

function openSignupModal(e) {
  e.preventDefault();
  signupmodal.style.display = "flex";
}

//모달창 닫기
function closeLoginModal(e) {
  e.preventDefault();
  document.querySelector("#userid").value = null;
  document.querySelector("#userpwd").value = null;
  loginmodal.style.display = "none";
}

function closeSignupModal(e) {
  e.preventDefault();
  document.querySelector("#userid").value = null;
  document.querySelector("#userpwd").value = null;
  document.querySelector("#pwdcheck").value = null;
  document.querySelector("#username").value = null;
  document.querySelector("#emailid").value = null;
  document.querySelector("#emaildomain").value = null;
  signupmodal.style.display = "none";
}
