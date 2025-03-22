document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const button = document.getElementById("ctaButton");

    // 계좌번호 복사 기능
    document.querySelectorAll(".copy-btn").forEach(btn => {
        btn.addEventListener("click", (event) => {
            const targetId = event.target.getAttribute("data-target");
            const text = document.getElementById(targetId).getAttribute("data-number");

            navigator.clipboard.writeText(text)
                .then(() => alert("계좌번호 복사되었습니다!"))
                .catch(err => console.error("복사 실패:", err));
        });
    });



    // 팝업 열고 닫기 기능
    button.addEventListener("click", () => {
        const isOpen = popup.style.display === "flex";

        if (isOpen) {
            popup.style.display = "none"; // 팝업 닫기
            button.innerText = "참석 여부"; // 버튼 텍스트 변경
            document.body.style.overflow = "auto"; // 스크롤 가능
        } else {
            popup.style.display = "flex"; // 팝업 열기
            button.innerText = "팝업 닫기"; // 버튼 텍스트 변경
            document.body.style.overflow = "hidden"; // 스크롤 막기
        }

        button.classList.toggle("popup-open", !isOpen); // 버튼 색상 변경
    });
});

// 네이버 맵
var elluce = new naver.maps.LatLng(37.471108, 126.629816)
var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.471108, 126.629816),
    zoom: 17,
    minZoom: 8, //지도의 최소 줌 레벨
    zoomControl: true, //줌 컨트롤의 표시 여부
    zoomControlOptions: { //줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_RIGHT
}});
var marker = new naver.maps.Marker({
    icon: {
        url: "./heart-icon.png",
        scaledSize: new naver.maps.Size(30, 37),
        origin: new naver.maps.Point(0, 0),
    },
    position: elluce,
    map: map
});

var contentString = [
'<div class="iw_inner gsap-opacity" style="padding:5px; margin: 5px 0px 5px 0px; width: 155px; height: 45px; text-align: center; ">',
'   <p style="foint-size: 2rem; margin: 0;">주교좌 답동성당</p>',
'   <p style="font-size: 0.8rem; margin: 0;">인천 중구 우현로50번길 2</p>',
'</div>'
].join('');

var infowindow = new naver.maps.InfoWindow({
    content: contentString,
    maxWidth: 200,
    height: 50,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    disableAnchor: true,
    textAlign: "center",
    margin: "auto",

    pixelOffset: new naver.maps.Point(0, -5)
});

naver.maps.Event.addListener(marker, "click", function(e) {
    if (infowindow.getMap()) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
});

infowindow.open(map, marker);

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return year + month + day + hours + minutes + seconds;

  }