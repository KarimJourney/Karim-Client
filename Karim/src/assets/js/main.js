document.getElementById("btnCustom").addEventListener("click", () => {
	fetch(`${root}/trip/listform`)
		.then(response => {
			if (!response.ok) {
				throw new Error('로그인이 필요한 서비스 입니다..');
			}

			document.getElementById("mappage").style.display="none";
			document.getElementById("hotlist").style.display="block";
			window.location.href = `${root}/trip/list`;
		})
		.catch(error => {
			console.error('로그인 필요:', error);
			alert('로그인이 필요한 서비스 입니다.');
		});
});

function movemap(e) {
	e.preventDefault();
	fetch(`${root}/trip/listform`)
	.then(response => {
		if (!response.ok) {
			throw new Error('로그인이 필요한 서비스 입니다..');
		}
		document.getElementById("mappage").style.display="none";
		document.getElementById("hotlist").style.display="block";
		window.location.href = `${root}/trip/list`;
	})
	.catch(error => {
		console.error('로그인 필요:', error);
		alert('로그인이 필요한 서비스 입니다.');
	});
	
}

document.getElementById("hotlist").addEventListener("click", () => {
	document.getElementById("hotlist").style.display="none";
	document.getElementById("mappage").style.display="block";
});

document.getElementById("mappage").addEventListener("click", () => {
	document.getElementById("mappage").style.display="none";
	document.getElementById("hotlist").style.display="block";
});