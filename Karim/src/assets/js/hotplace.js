// hotplace.jsp 전용 설정
const currentPath = "hotplace";
const paginationId = "hotpagination";
let currentPage = 1;
let currentHotPage = 1;


//검색어 입력시 실행
function fetchListPage(page) {
	const sortBy = document.getElementById("search-area").value;
	const keyword = document.getElementById("searchKeyword").value;
	console.log(keyword)
	const url = `${root}/${currentPath}/hotplacelist`;

	// 요청 본문에 보낼 데이터 구성
	const bodyData = {
		page: page,
		sort: sortBy,
		keyword: keyword
	};

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(bodyData)
	})
		.then(response => {
			console.log(response)
			if (response.status === 401) {
				alert("로그인이 필요합니다.");
				throw new Error("Unauthorized");
			}
			return response.json();
		})
		.then(data => {
			if (data.res === "ok") {
				console.log(data.hotplaceList)
				console.log(data.pageNavigation)
				makeList(data.hotplaceList);
				renderPagination(data.pageNavigation, 'hotpagination');
			} else {
				document.querySelector(".result_list").innerHTML = "<li>검색 결과가 없습니다.</li>";
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert("핫리스트를 불러오는데 실패했습니다.");
		});
}


function fetchPage(page) {

	// 검색어와 정렬 기준을 URL 파라미터로 전달
	/*fetch(`${root}/trip/hotplacelist/${page}?sort=${sortBy}&keyword=${encodeURIComponent(keyword)}`, {*/
	fetch(`${root}/hotplace/movehotlist/${page}`, {
		method: 'GET',
		credentials: 'include'
	})
		.then(response => {
			if (response.status === 401) {
				alert("로그인이 필요합니다.");
				throw new Error("Unauthorized");
			}
			return response.json();
		})
		.then(data => {
			if (data.res === "ok") {
				makeList(data.hotplaceList);
				renderPagination(data.pageNavigation, 'hotpagination');
			} else {
				document.querySelector(".result_list").innerHTML = "<li>검색 결과가 없습니다.</li>";
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert("핫리스트를 불러오는데 실패했습니다.");
		});
}


// 페이지네이션을 렌더링하는 함수 수정 (hotplacelist용)
function renderPagination(navigatorHtml, paginationId = 'pagination') {
	const paginationContainer = document.getElementById(paginationId);
	paginationContainer.innerHTML = navigatorHtml;

	// 페이지네이션 클릭 이벤트 추가
	paginationContainer.addEventListener('click', (e) => {
		if (e.target.tagName === 'A') {
			e.preventDefault();
			const pgNo = parseInt(e.target.getAttribute('data-pg'));
			if (!isNaN(pgNo)) {
				if (paginationId === 'hotpagination') {
					fetchHotplacePage(pgNo);
					currentPage = pgNo;
				} else {
					// 기존 페이지네이션 로직
					let search_area = document.querySelector("#search-area");
					let search_keyword = document.querySelector("#search-keyword");

					let tripDto = {
						area_code: search_area.value,
						title: search_keyword.value,
					};
					let config = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(tripDto),
					};

					fetch(`${root}/hotplace/searchhotplace/${pgNo}`, config)
						.then(response => response.json())
						.then(data => {
							makeList(data.tripList); // 기존 리스트를 대체
							renderPagination(data.pageNavigation, paginationId);
							currentPage = pgNo;
						})
						.catch(error => {
							console.error('Error:', error);
							alert("데이터를 로딩하는 중 오류가 발생했습니다.");
						});
				}
			}
		}
	}); // 이벤트 리스너 닫는 괄호
}

//검색 버튼 클릭 시 실행되는 함수
document.getElementById("searchButton").addEventListener("click", () => {
	fetchListPage(1);

})