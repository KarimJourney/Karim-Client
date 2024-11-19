/**
 * trip.js
 */
// trip.jsp 전용 설정
const currentPath = "trip";
const paginationId = "pagination";
let currentPage = 1;

// 페이지네이션과 함께 페이지를 가져오는 함수
function fetchPage(page) {
	fetch(`${root}/trip/list/${page}`)
		.then(response => response.json())
		.then(data => {
			makeList(data.tripList); // 기존 리스트를 업데이트
			makeOption(data.siList);
			//setupPagination(data.pageNavigation);
			renderPagination(data.pageNavigation);
			console.log(data);
		})
		.catch(error => {
			console.error('Error:', error);
			alert("데이터를 불러오는 데 실패했습니다.");
		});
}



// 옵션 생성 함수
function makeOption(data) {
	const sel = document.getElementById("search-area");
	//sel.innerHTML = ""; // 기존 옵션 초기화
	data.forEach((area) => {
		const opt = document.createElement("option");
		opt.value = area.sido_code;
		opt.textContent = area.sido_name;
		sel.appendChild(opt);
	});
}


// 검색 버튼 클릭 시 실행되는 함수
document.getElementById("btn-search").addEventListener("click", () => {
	let search_area = document.querySelector("#search-area");
	let select_content = document.querySelector("#search-content-id");
	let search_keyword = document.querySelector("#search-keyword");

	let tripdto = {
		area_code: search_area.value,
		content_type_id: select_content.value,
		title: search_keyword.value,
	};
	let config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(tripdto),
	};
	currentPage = 1;
	fetch(`${root}/trip/search/${currentPage}`, config)
		.then(response => response.json())
		.then(data => {
			makeList(data.tripList); // 기존 리스트를 대체
			renderPagination(data.pageNavigation);
		})
		.catch(error => {
			console.error('Error:', error);
			alert("검색을 수행하는 데 실패했습니다.");
		});
});


//페이지 네이션 처리
// 페이지네이션 클릭 이벤트
document.getElementById('pagination').addEventListener('click', (e) => {
	if (e.target.tagName === 'A') {
		e.preventDefault();
		const pgNo = parseInt(e.target.getAttribute('data-pg'));
		if (!isNaN(pgNo)) {
			//loadPage(pgNo);
			let search_area = document.querySelector("#search-area");
			let select_content = document.querySelector("#search-content-id");
			let search_keyword = document.querySelector("#search-keyword");

			let tripdto = {
				area_code: search_area.value,
				content_type_id: select_content.value,
				title: search_keyword.value,
			};
			let config = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(tripdto),
			};

			fetch(`${root}/trip/search/${pgNo}`, config)
				.then(response => response.json())
				.then(data => {
					makeList(data.tripList); // 기존 리스트를 대체
					//setupPagination(data.pageNavigation);
					renderPagination(data.pageNavigation);
					currentPage = pgNo;
				})
				.catch(error => {
					console.error('Error:', error);
					alert("데이터를 로딩하는 중 오류가 발생했습니다.");
				});

		}
	}

});

function renderPagination(navigatorHtml) {
	const paginationContainer = document.getElementById('pagination');
	paginationContainer.innerHTML = navigatorHtml;
}


//let currentHotPage = 1;  // 현재 Hotplace 페이지를 추적

function renderPagination(navigatorHtml, paginationId = 'pagination') {
    const paginationContainer = document.getElementById(paginationId);
    paginationContainer.innerHTML = navigatorHtml;

    // 페이지네이션 클릭 이벤트 추가
    paginationContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const pgNo = parseInt(e.target.getAttribute('data-pg'));
            if (!isNaN(pgNo)) {
                fetchListPage(pgNo);
            }
        }
    });
}