// 비밀번호 찾기 클릭 핸들러
function handleFindBtn() {
    
  fetch(`${root}/user/find`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
  			userId : params.value.userid
  		})
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('비밀번호 찾기에 실패했습니다.');
          }
		  return response.json();
      })
     .then(data => {
          const password = data.password;
          params.value.userpwd = password;
      })
      .catch(error => {
          console.error('비밀번호 찾기 에러:', error);
          alert('비밀번호 찾기 중 오류가 발생했습니다.');
      });
}