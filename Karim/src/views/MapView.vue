<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/axios";
import { useLoginStore } from "@/stores/login";
import { defineComponent } from 'vue';
import PlaceAddModal from "@/components/trip/PlaceAddModal.vue";

defineComponent({
  name: 'LineMdSunnyFilledLoop',
  name: 'MaterialSymbolsSearch',
  name: 'MapGroceryOrSupermarket',
  name: 'MaterialSymbolsLocalConvenienceStoreSharp',
  name: 'MdiParking',
  name: 'MingcuteGasStationFill',
  name: 'IcBaselineSubway',
  name: 'FaSolidWonSign',
  name: 'MaterialSymbolsBrush',
  name: 'MaterialSymbolsAttractionsRounded',
  name: 'MaterialSymbolsHotel',
  name: 'MaterialSymbolsRestaurantMenu',
  name: 'BxCoffeeTogo',
  name: 'RiHospitalFill',
  name: 'GgPill',
});

// 날씨 상태별 아이콘 SVG 매핑 객체 정의
const weatherIconMapping = {
  "맑음": `<svg style="color: #F2B758;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
              viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path fill="currentColor" fill-opacity="0" stroke-dasharray="36" stroke-dashoffset="36"
                  d="M12 7c2.76 0 5 2.24 5 5c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -2.76 2.24 -5 5 -5">
                  <animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.5s" values="0;1" />
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0" />
                </path>
                <path stroke-dasharray="2" stroke-dashoffset="2" d="M12 19v1M19 12h1M12 5v-1M5 12h-1" opacity="0">
                  <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s"
                    values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1" />
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="2;0" />
                  <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
                  <animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate"
                    values="0 12 12;360 12 12" />
                </path>
                <path stroke-dasharray="2" stroke-dashoffset="2"
                  d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5" opacity="0">
                  <animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s"
                    values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="2;0" />
                  <set fill="freeze" attributeName="opacity" begin="0.8s" to="1" />
                  <animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate"
                    values="0 12 12;360 12 12" />
                </path>
              </g>
            </svg>`,
  "맑음 밤": `<svg style="color: #F2B758;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" stroke-dasharray="4" stroke-dashoffset="4" stroke-linecap="round" stroke-linejoin="round">
			<path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
				<animate id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0" fill="freeze" attributeName="stroke-dashoffset" begin="0.6s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+6s" dur="0.4s" values="4;0" />
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+4s" dur="0.4s" values="4;0" />
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+1.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+3.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+5.2s" dur="0.4s" values="0;4" />
				<set fill="freeze" attributeName="d" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+1.8s" to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5" />
				<set fill="freeze" attributeName="d" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+3.8s" to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5" />
				<set fill="freeze" attributeName="d" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+5.8s" to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5" />
			</path>
			<path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
				<animate id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1" fill="freeze" attributeName="stroke-dashoffset" begin="1s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+6s" dur="0.4s" values="4;0" />
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+4s" dur="0.4s" values="4;0" />
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+1.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+3.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+5.2s" dur="0.4s" values="0;4" />
				<set fill="freeze" attributeName="d" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+1.8s" to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5" />
				<set fill="freeze" attributeName="d" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+3.8s" to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5" />
				<set fill="freeze" attributeName="d" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+5.8s" to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5" />
			</path>
			<path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
				<animate id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2" fill="freeze" attributeName="stroke-dashoffset" begin="2.8s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+6s" dur="0.4s" values="4;0" />
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+2s" dur="0.4s" values="4;0" />
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+1.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+3.2s" dur="0.4s" values="0;4" />
				<set fill="freeze" attributeName="d" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+1.8s" to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5" />
				<set fill="freeze" attributeName="d" begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+5.8s" to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5" />
			</path>
		</g>
		<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			<g>
				<path stroke-dasharray="2" stroke-dashoffset="4" d="M12 21v1M21 12h1M12 3v-1M3 12h-1">
					<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;2" />
				</path>
				<path stroke-dasharray="2" stroke-dashoffset="4" d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="4;2" />
				</path>
				<set fill="freeze" attributeName="opacity" begin="0.5s" to="0" />
			</g>
			<path fill="currentColor" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" opacity="0">
				<set fill="freeze" attributeName="opacity" begin="0.5s" to="1" />
			</path>
		</g>
		<mask id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition3">
			<circle cx="12" cy="12" r="12" fill="#fff" />
			<circle cx="22" cy="2" r="3" fill="#fff">
				<animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18" />
				<animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6" />
				<animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="3;12" />
			</circle>
			<circle cx="22" cy="2" r="1">
				<animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18" />
				<animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6" />
				<animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="1;10" />
			</circle>
		</mask>
		<circle cx="12" cy="12" r="6" mask="url(#lineMdSunnyFilledLoopToMoonFilledAltLoopTransition3)" fill="currentColor">
			<animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="6;10" />
			<set fill="freeze" attributeName="opacity" begin="0.5s" to="0" />
		</circle>
	</svg>`,
  "구름 조금": `<svg style="color: #dddddd; xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
		<path fill="currentColor" d="M19.36 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.64-4.96" />
	</svg>`,
  "구름 많음": `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36 36">
		<path fill="#ccd6dd" d="M27 8a7 7 0 0 0-2.015.298c.005-.1.015-.197.015-.298a5.998 5.998 0 0 0-11.785-1.573A6 6 0 0 0 11 6a6 6 0 1 0 0 12a6 6 0 0 0 5.785-4.428A6 6 0 0 0 19 14c.375 0 .74-.039 1.096-.104c-.058.36-.096.727-.096 1.104c0 3.865 3.135 7 7 7s7-3.135 7-7a7 7 0 0 0-7-7" />
		<path fill="#e1e8ed" d="M31 22c-.467 0-.91.085-1.339.204c.216-.526.339-1.1.339-1.704a4.5 4.5 0 0 0-4.5-4.5a4.46 4.46 0 0 0-2.701.921A6.5 6.5 0 0 0 16.5 12a6.5 6.5 0 0 0-6.131 4.357A8 8 0 1 0 8 32h23c2.762 0 5-2.238 5-5s-2.238-5-5-5" />
	</svg>`,
  흐림: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36 36">
		<path fill="#ccd6dd" d="M27 8a7 7 0 0 0-2.015.298c.005-.1.015-.197.015-.298a5.998 5.998 0 0 0-11.785-1.573A6 6 0 0 0 11 6a6 6 0 1 0 0 12a6 6 0 0 0 5.785-4.428A6 6 0 0 0 19 14c.375 0 .74-.039 1.096-.104c-.058.36-.096.727-.096 1.104c0 3.865 3.135 7 7 7s7-3.135 7-7a7 7 0 0 0-7-7" />
		<path fill="#e1e8ed" d="M31 22c-.467 0-.91.085-1.339.204c.216-.526.339-1.1.339-1.704a4.5 4.5 0 0 0-4.5-4.5a4.46 4.46 0 0 0-2.701.921A6.5 6.5 0 0 0 16.5 12a6.5 6.5 0 0 0-6.131 4.357A8 8 0 1 0 8 32h23c2.762 0 5-2.238 5-5s-2.238-5-5-5" />
	</svg>`,
  비: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36 36">
		<path fill="#e1e8ed" d="M28 4c-.825 0-1.62.125-2.369.357A6.5 6.5 0 0 0 19.5 0c-3.044 0-5.592 2.096-6.299 4.921A4.46 4.46 0 0 0 10.5 4A4.5 4.5 0 0 0 6 8.5c0 .604.123 1.178.339 1.704A5 5 0 0 0 5 10c-2.762 0-5 2.238-5 5s2.238 5 5 5h23a8 8 0 1 0 0-16" />
		<path fill="#5dadec" d="m11.999 24.961l-.113-3.421l-2.87 1.708a1.97 1.97 0 0 0-1.036 1.799A2.033 2.033 0 0 0 10.056 27a1.975 1.975 0 0 0 1.943-2.039m-1.979 7.46L9.907 29l-2.87 1.708a1.97 1.97 0 0 0-1.036 1.799a2.033 2.033 0 0 0 2.076 1.953a1.974 1.974 0 0 0 1.943-2.039m-5-4.46l-.113-3.421l-2.87 1.708a1.97 1.97 0 0 0-1.036 1.799A2.034 2.034 0 0 0 3.077 30a1.974 1.974 0 0 0 1.943-2.039m18-3l-.113-3.421l-2.869 1.708a1.96 1.96 0 0 0-1.036 1.799A2.033 2.033 0 0 0 21.078 27a1.974 1.974 0 0 0 1.942-2.039m-6.021 4l-.113-3.421l-2.869 1.708a1.96 1.96 0 0 0-1.036 1.799A2.033 2.033 0 0 0 15.057 31a1.974 1.974 0 0 0 1.942-2.039m5.021 4.46L21.906 30l-2.869 1.708a1.96 1.96 0 0 0-1.036 1.799a2.033 2.033 0 0 0 2.076 1.953a1.974 1.974 0 0 0 1.943-2.039m6.979-5.46l-.113-3.421l-2.869 1.708a1.96 1.96 0 0 0-1.036 1.799A2.033 2.033 0 0 0 27.057 30a1.974 1.974 0 0 0 1.942-2.039" />
	</svg>`,
  "비/눈": `<svg style="color: #999999; xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 17h14a4 4 0 0 0 0-8a5 5 0 0 0-9.88 1.68A4 4 0 0 0 4 17Z"/>
              <path fill="currentColor" d="M9 19a1 1 0 0 1-2 0a1 1 0 0 1 2 0Zm5 0a1 1 0 0 1-2 0a1 1 0 0 1 2 0Zm-3 2a1 1 0 0 1-2 0a1 1 0 0 1 2 0Zm5 2a1 1 0 0 1-2 0a1 1 0 0 1 2 0Z"/>
            </svg>`,
  눈: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 36 36">
		<path fill="#e1e8ed" d="M28 4c-.825 0-1.62.125-2.369.357A6.5 6.5 0 0 0 19.5 0c-3.044 0-5.592 2.096-6.299 4.921A4.46 4.46 0 0 0 10.5 4A4.5 4.5 0 0 0 6 8.5c0 .604.123 1.178.339 1.704A5 5 0 0 0 5 10c-2.762 0-5 2.238-5 5s2.238 5 5 5h23a8 8 0 1 0 0-16" />
		<path fill="#5dadec" d="M6.53 26.75a.5.5 0 0 0-.683-.183L4 27.634V25.5a.5.5 0 0 0-1 0v2.135l-1.849-1.067a.5.5 0 1 0-.5.867L2.499 28.5L.651 29.567a.5.5 0 0 0 .5.867L3 29.366V31.5a.5.5 0 0 0 1 0v-2.133l1.848 1.067a.5.5 0 1 0 .5-.867L4.5 28.5l1.848-1.067a.5.5 0 0 0 .182-.683m10 4a.5.5 0 0 0-.683-.183L14 31.634V29.5a.5.5 0 0 0-1 0v2.135l-1.849-1.067a.5.5 0 1 0-.5.867l1.848 1.067l-1.848 1.067a.5.5 0 0 0 .5.867L13 33.366V35.5a.5.5 0 0 0 1 0v-2.133l1.848 1.067a.5.5 0 1 0 .5-.867L14.5 32.5l1.848-1.067a.5.5 0 0 0 .182-.683M11 27.5a.5.5 0 0 0 1 0v-2.133l1.848 1.067a.5.5 0 1 0 .5-.867L12.5 24.5l1.848-1.067a.501.501 0 0 0-.5-.867L12 23.634V21.5a.5.5 0 0 0-1 0v2.135l-1.849-1.067a.5.5 0 1 0-.5.867l1.848 1.067l-1.848 1.067a.5.5 0 0 0 .5.867L11 25.366zm12.848-.066a.5.5 0 1 0 .5-.867L22.5 25.5l1.848-1.067a.501.501 0 0 0-.5-.867L22 24.634V22.5a.5.5 0 0 0-1 0v2.135l-1.849-1.067a.5.5 0 1 0-.5.867l1.848 1.067l-1.848 1.067a.5.5 0 0 0 .5.867L21 26.366V28.5a.5.5 0 0 0 1 0v-2.133zm10.5-1.867L32.5 24.5l1.848-1.067a.501.501 0 0 0-.5-.867L32 23.634V21.5a.5.5 0 0 0-1 0v2.135l-1.849-1.067a.5.5 0 1 0-.5.867l1.848 1.067l-1.848 1.067a.5.5 0 0 0 .5.867L31 25.366V27.5a.5.5 0 0 0 1 0v-2.133l1.848 1.067a.501.501 0 0 0 .5-.867M29.53 30.75a.5.5 0 0 0-.683-.183L27 31.634V29.5a.5.5 0 0 0-1 0v2.135l-1.849-1.067a.5.5 0 1 0-.5.867l1.848 1.067l-1.848 1.067a.5.5 0 0 0 .5.867L26 33.366V35.5a.5.5 0 0 0 1 0v-2.133l1.848 1.067a.5.5 0 1 0 .5-.867L27.5 32.5l1.848-1.067a.5.5 0 0 0 .182-.683" />
	</svg>`,
  소나기: `<svg style="color: #999999; xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 56 56">
		<path fill="currentColor" d="M12.262 36.098h29.086c7.43 0 13.172-5.625 13.172-12.82c0-7.29-6-12.75-13.946-12.68c-3-6.047-8.507-9.54-15-9.54c-8.648 0-15.937 6.82-16.617 15.563c-4.547 1.242-7.477 5.063-7.477 9.68c0 5.812 4.36 9.797 10.782 9.797m19.265 11.226l3.047-5.273c.422-.727.188-1.547-.515-1.946c-.703-.421-1.5-.187-1.922.54l-3.094 5.32c-.375.68-.187 1.5.54 1.922a1.43 1.43 0 0 0 1.944-.563m5.438 6.703l6.914-12c.422-.703.21-1.5-.469-1.922c-.656-.398-1.5-.187-1.945.516l-6.867 11.953c-.399.727-.211 1.547.492 1.969c.68.375 1.476.164 1.875-.516m-24.094-6.68l3.047-5.273c.422-.726.211-1.547-.492-1.945c-.727-.422-1.524-.188-1.946.539l-3.07 5.32c-.398.68-.187 1.5.516 1.899a1.403 1.403 0 0 0 1.945-.54m5.438 6.704l6.937-12c.399-.703.188-1.5-.469-1.922a1.4 1.4 0 0 0-1.945.516l-6.89 11.953c-.399.726-.188 1.547.515 1.968c.68.375 1.477.164 1.852-.515" />
	</svg>`,
};

const showModal = ref(false);
const app_key = import.meta.env.VITE_KAKAOMAP_API_KEY;
const loginStore = useLoginStore();
const router = useRouter();

const emit = defineEmits("close");

let ps = null;
let map = null;
let markers = [];
let position = null;
const places = ref([]);
const weather = ref({});
const weatherIcon = ref(null);
const keyword = ref("");
const address = ref("");
const result_msg = ref("카테고리를 선택하면 주변 정보가 보여집니다.");

// 기본 위치는 서울역 아니고 유성연수원
// let latitude = 37.554678, longitude = 126.970606;
let latitude = 36.354946759143, longitude = 127.29980994578;

onMounted(() => {
  // 현재 위치를 지도 첫 시작점으로 잡기
  navigator.geolocation.getCurrentPosition((cur) => {
    latitude = cur.coords.latitude;
    longitude = cur.coords.longitude;
  });

  // 카카오맵 로딩
  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${app_key}&libraries=services&autoload=false&v=1`;
  script.onload = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("map"); // 맵을 표시할 div
      if (!container) {
        console.error("#map 요소를 찾을 수 없습니다.");
        return;
      }
      position = new kakao.maps.LatLng(latitude, longitude);
      const options = {
        center: position, 
        level: 3,
      };
      map = new kakao.maps.Map(container, options);
      const content = `
        <div class="marker-index">
          <h5>1</h5>
        </div>
      `;
      const marker = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
      });

      markers.push(marker);

      // 현재 위치로 지역 정보 표시하기
      if (!(kakao.maps && kakao.maps.services)) return;
      let geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(map.getCenter().getLng(), map.getCenter().getLat(), function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          for (var i = 0; i < result.length; i++) {
            if (result[i].region_type === 'H') { // 행정동의 region_type 값 'H'
              address.value = result[i].address_name;
              break;
            }
          }
        }
      });

      // 카테고리 검색용
      ps = new kakao.maps.services.Places(map);
    });
  };
  script.onerror = () => {
    console.error("카카오맵 API 로딩 실패");
  };
  document.head.appendChild(script);
  getWeather();
});

const getWeather = async () => {
  // 현재 위치의 날씨 표시하기
  try {
    let today = new Date();
    let date = "" + today.getFullYear() + (today.getMonth() + 1) + today.getDate();
    let time = (today.getHours() - (today.getMinutes() < 10 ? 1 : 0) < 0 ? 23 : today.getHours() - (today.getMinutes() < 10 ? 1 : 0));
    if (time < 10) time = "0" + time;
    time += "00";
    const response = await axios.get("/weather", {
      params: {
        date: date,
        time: time,
        nx: latitude,
        ny: longitude
      }
    });
    weather.value = response.data;

    // 아이콘 추가
    if (weather.value.weatherStatus) {
      let weather_icon = weather.value.weatherStatus;
      // 낮 밤 추가
      if (weather.value.weatherStatus === "맑음") {
        if (time >= "0600" && time <= "1800") weather_icon += "";
        else weather_icon += " 밤";
      }
      weatherIcon.value.innerHTML = weatherIconMapping[weather_icon] || "";
    }

  } catch (error) {
    console.error("Weather API 호출 실패", error);
  }
}

// 키워드로 장소 api 요청 부분
const search = (keyword) => {
  ps.keywordSearch(keyword, function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      places.value = [];
      for (var i = 0; i < data.length; i++) {
        places.value.push({ id: data[i].id, name: data[i].place_name, address: data[i].address_name, latitude: data[i].y, longitude: data[i].x }); // road_address_name (도로명주소) 도 존재는 함
      }
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      places.value = [];
      result_msg.value = "검색 결과가 없습니다.";
    } else if (status === kakao.maps.services.Status.ERROR) {
      places.value = [];
      result_msg.value = "다시 시도해 주세요.";
    }
    addMarkers();
  });
}

// 주변 장소 api 요청 부분
const nearby = (category) => {
  ps.categorySearch(category, function (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      places.value = [];
      for (var i = 0; i < data.length; i++) {
        places.value.push({ id: data[i].id, name: data[i].place_name, address: data[i].address_name, latitude: data[i].y, longitude: data[i].x }); // road_address_name (도로명주소) 도 존재는 함
      }
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      places.value = [];
      result_msg.value = "검색 결과가 없습니다.";
    } else if (status === kakao.maps.services.Status.ERROR) {
      places.value = [];
      result_msg.value = "다시 시도해 주세요.";
    }
    addMarkers();
  }, { useMapBounds: true, location: position });
}

const addMarkers = () => {
  if (!map) return;
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
  var index = 1;

  places.value.forEach((place) => {
    if (!place.latitude || !place.longitude) {
      console.warn(`Trip ID ${place.name}의 좌표 정보가 누락되었습니다.`);
      return;
    }

    const position = new kakao.maps.LatLng(place.latitude, place.longitude);
    const content = `
      <div class="marker-index">
        <h5>${ index }</h5>
      </div>
    `;

    const marker = new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      title: place.name,
      content: content,
    });

    markers.push(marker);

    index++;

    kakao.maps.event.addListener(marker, "click", () => {
      map.panTo(
        position, {
        animate: {
          duration: 550
        }
      }
      );
    });
  });

  if (
    places.value.length > 0 &&
    places.value[0].latitude &&
    places.value[0].longitude
  ) {
    map.panTo(
      new kakao.maps.LatLng(places.value[0].latitude, places.value[0].longitude), {
          animate: {
              duration: 550
          }
      }
    );
  }
};

const getPlace = (place) => {
  const position = new kakao.maps.LatLng(place.latitude, place.longitude);
  map.panTo(position, {
    animate: {
      duration: 550
    }
  }
  );
}

watch(
  () => places.value, // places 배열이 바뀔 때마다 마커 갱신
  () => {
    addMarkers();
  },
  { immediate: true }
);
</script>

<template>
  <section>
    <aside>
      <form class="search" @submit.prevent="search(keyword)">
        <input type="text" placeholder="장소 검색" v-model="keyword" />
        <span class="icon search-icon" @click="search(keyword)"><svg xmlns="http://www.w3.org/2000/svg" width="1.3em"
            height="1.3em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
          </svg></span>
      </form>
      <div class="name">
        <p>{{ address }}</p>
      </div>
      <div class="weather">
        <div class="weather-info">
          <div class="weather-icon" ref="weatherIcon"></div>
          <div class="main-info">
            <div class="temperature">{{ weather.temperature }}°</div>
            <div class="weather-description">{{ weather.weatherStatus }}</div>
          </div>
        </div>
        <div class="additional-info">
          <p>체감온도 <span>{{ weather.perceivedTemperature }}°</span></p>
          <p>습도 <span>{{ weather.humidity }}%</span></p>
        </div>
      </div>
      <div class="line">
        <hr>
        <p class="nearby">주변</p>
      </div>
      <div class="nearby-info">
        <ul class="nearby-items">
          <li class="nearby-item" @click="nearby('MT1')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 50 50">
              <circle cx="44" cy="42" r="4" fill="currentColor" />
              <circle cx="15" cy="42" r="4" fill="currentColor" />
              <path fill="currentColor"
                d="M47 33H15.771l.667-1.082c.286-.464.37-1.025.233-1.553l-.651-2.506l28.983-1.506C46.102 26.297 47 25.35 47 24.25V11c0-1.1-.9-2-2-2H11.119l-.391-1.503A2 2 0 0 0 8.792 6H2a2 2 0 0 0 0 4h5.246l5.34 20.545l-2.1 3.405a2 2 0 0 0-.043 2.024A2 2 0 0 0 12.188 37H47a2 2 0 0 0 0-4" />
            </svg>
            <p>마트</p>
          </li>
          <li class="nearby-item" @click="nearby('CS2')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M21.025 11.05V21h-18v-9.95q-.575-.525-.887-1.35t-.013-1.8L3.65 3H20.4l1.525 4.9q.3.975-.013 1.775t-.887 1.375m-6.8-1.05q.675 0 1.025-.462t.275-1.038l-.55-3.5h-1.95v3.7q0 .525.35.913t.85.387m-4.5 0q.575 0 .938-.388t.362-.912V5h-1.95l-.55 3.5q-.1.6.262 1.05t.938.45m-4.45 0q.45 0 .787-.325t.413-.825L7.025 5h-1.95l-1 3.35q-.15.5.162 1.075T5.275 10m13.5 0q.725 0 1.05-.575t.15-1.075L18.925 5h-1.9l.55 3.85q.075.5.413.825t.787.325m-10.75 8h3v-1h-2v-1h2v-3h-3v1h2v1h-2zm7 0h1v-5h-1v2h-1v-2h-1v3h2z" />
            </svg>
            <p>편의점</p>
          </li>
          <li class="nearby-item" @click="nearby('PK6')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M13.2 11H10V7h3.2a2 2 0 0 1 2 2a2 2 0 0 1-2 2M13 3H6v18h4v-6h3a6 6 0 0 0 6-6c0-3.32-2.69-6-6-6" />
            </svg>
            <p>주차장</p>
          </li>
          <li class="nearby-item" @click="nearby('OL7')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <g fill="none" fill-rule="evenodd">
                <path
                  d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path fill="currentColor"
                  d="M5 3a2 2 0 0 0-2 2v14a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2v-5h1v2.5a2.5 2.5 0 0 0 5 0v-6.086A2 2 0 0 0 20.414 9l-2.707-2.707a1 1 0 1 0-1.414 1.414l1.1 1.101A1.999 1.999 0 0 0 19 12l.001 4.5a.5.5 0 0 1-1 0V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2zm8 7V5H5v5z" />
              </g>
            </svg>
            <p>주유소,<br>충전소</p>
          </li>
          <li class="nearby-item" @click="nearby('SW8')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <circle cx="15.5" cy="16" r="1" fill="currentColor" />
              <circle cx="8.5" cy="16" r="1" fill="currentColor" />
              <path fill="currentColor"
                d="M7.01 9h10v5h-10zM17.8 2.8C16 2.09 13.86 2 12 2s-4 .09-5.8.8C3.53 3.84 2 6.05 2 8.86V22h20V8.86c0-2.81-1.53-5.02-4.2-6.06m.2 13.08c0 1.45-1.18 2.62-2.63 2.62l1.13 1.12V20H15l-1.5-1.5h-2.83L9.17 20H7.5v-.38l1.12-1.12C7.18 18.5 6 17.32 6 15.88V9c0-2.63 3-3 6-3c3.32 0 6 .38 6 3z" />
            </svg>
            <p>지하철역</p>
          </li>
          <li class="nearby-item" @click="nearby('BK9')"><svg xmlns="http://www.w3.org/2000/svg" width="5.13em"
              height="5em" viewBox="0 0 576 512">
              <path fill="currentColor"
                d="M564 192c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-48l18.6-80.6c1.7-7.5-4-14.7-11.7-14.7h-46.1c-5.7 0-10.6 4-11.7 9.5L450.7 128H340.8l-19.7-86c-1.3-5.5-6.1-9.3-11.7-9.3h-44c-5.6 0-10.4 3.8-11.7 9.3l-20 86H125l-17.5-85.7c-1.1-5.6-6.1-9.6-11.8-9.6H53.6c-7.7 0-13.4 7.1-11.7 14.6L60 128H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h62.3l7.2 32H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h83.9l40.9 182.6c1.2 5.5 6.1 9.4 11.7 9.4h56.8c5.6 0 10.4-3.9 11.7-9.3L259.3 288h55.1l42.4 182.7c1.3 5.4 6.1 9.3 11.7 9.3h56.8c5.6 0 10.4-3.9 11.7-9.3L479.1 288H564c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-70.1l7.4-32zM183.8 342c-6.2 25.8-6.8 47.2-7.3 47.2h-1.1s-1.7-22-6.8-47.2l-11-54h38.8zm27.5-118h-66.8l-6.5-32h80.8zm62.9 0l2-8.6c1.9-8 3.5-16 4.8-23.4h11.8c1.3 7.4 2.9 15.4 4.8 23.4l2 8.6zm130.9 118c-5.1 25.2-6.8 47.2-6.8 47.2h-1.1c-.6 0-1.1-21.4-7.3-47.2l-12.4-54h39.1zm25.2-118h-67.4l-7.3-32h81.6z" />
            </svg>
            <p>은행</p>
          </li>
          <li class="nearby-item" @click="nearby('CT1')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M6 21q-1.125 0-2.225-.55T2 19q.65 0 1.325-.513T4 17q0-1.25.875-2.125T7 14t2.125.875T10 17q0 1.65-1.175 2.825T6 21m5.75-6L9 12.25l8.95-8.95q.275-.275.688-.288t.712.288l1.35 1.35q.3.3.3.7t-.3.7z" />
            </svg>
            <p>문화시설</p>
          </li>
          <li class="nearby-item" @click="nearby('AT4')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="m6.35 20.8l.825-1.85q-.35-.275-.675-.537t-.625-.563q-.2.075-.387.113T5.075 18q-.825 0-1.412-.587T3.075 16q0-.5.213-.913t.587-.687q-.2-.575-.275-1.162T3.525 12t.075-1.237t.275-1.163q-.375-.275-.587-.687T3.075 8q0-.825.588-1.412T5.075 6q.225 0 .413.038t.387.112q.825-.9 1.888-1.5t2.262-.9q.125-.75.688-1.25t1.312-.5t1.313.513t.687 1.237q1.2.3 2.263.888T18.175 6.1q.2-.075.375-.112t.375-.038q.825 0 1.413.588t.587 1.412q0 .5-.2.888t-.55.662q.2.6.275 1.225T20.525 12t-.075 1.263t-.275 1.187q.35.275.55.663t.2.887q0 .825-.587 1.412T18.925 18q-.2 0-.375-.038t-.375-.112q-.3.3-.612.587t-.688.563l.775 1.825q.2.425-.062.8t-.713.375q-.275 0-.475-.15t-.3-.375l-.725-1.675q-.35.15-.675.263t-.675.187q-.125.725-.688 1.238T12.025 22t-1.312-.5t-.688-1.25q-.375-.075-.712-.187t-.688-.263L7.9 21.5q-.1.225-.312.363T7.125 22q-.45 0-.712-.387T6.35 20.8m1.375-3.15l1.55-3.5q-.35-.45-.55-1t-.2-1.15q0-1.425 1.038-2.463T12.025 8.5t2.463 1.038T15.525 12q0 .6-.213 1.175t-.587 1.025l1.55 3.45q.225-.2.438-.362t.412-.388q-.125-.2-.162-.437T16.925 16q0-.8.55-1.375t1.35-.625q.15-.5.225-.987T19.125 12t-.075-1.037t-.225-1.013q-.8-.05-1.35-.625t-.55-1.375q0-.225.063-.437t.137-.413q-.725-.725-1.6-1.225t-1.85-.775q-.275.425-.7.663t-.95.237t-.95-.238t-.7-.662q-1.025.275-1.9.788t-1.6 1.262q.075.2.138.413T7.075 8q0 .8-.525 1.363T5.225 10q-.15.5-.225.988T4.925 12T5 13.013t.225.987q.8.05 1.325.625T7.075 16q0 .225-.037.438t-.163.412q.2.225.413.413t.437.387m1.5.85q.275.125.563.225t.587.175q.275-.425.7-.662t.95-.238t.95.238t.7.662q.3-.075.562-.175t.538-.225l-1.45-3.25q-.3.125-.625.188t-.675.062q-.375 0-.713-.075t-.637-.225z" />
            </svg>
            <p>관광명소</p>
          </li>
          <li class="nearby-item" @click="nearby('AD5')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M1 19V4h2v10h8V6h8q1.65 0 2.825 1.175T23 10v9h-2v-3H3v3zm6-6q-1.25 0-2.125-.875T4 10t.875-2.125T7 7t2.125.875T10 10t-.875 2.125T7 13" />
            </svg>
            <p>숙박</p>
          </li>
          <li class="nearby-item" @click="nearby('FD6')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="m4.375 21l-1.4-1.4l10.25-10.25q-.45-1.05-.125-2.375T14.525 4.6q1.325-1.325 2.95-1.55t2.65.8t.8 2.65t-1.55 2.95q-1.05 1.1-2.375 1.425t-2.375-.125L13.375 12l7.6 7.6l-1.4 1.4l-7.6-7.55zm2.95-8.55l-3-3q-1.35-1.35-1.35-3.225T4.325 3l6.2 6.25z" />
            </svg>
            <p>음식점</p>
          </li>
          <li class="nearby-item" @click="nearby('CE7')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M7 22h10a1 1 0 0 0 .99-.858L19.867 8H21V6h-1.382l-1.724-3.447A1 1 0 0 0 17 2H7c-.379 0-.725.214-.895.553L4.382 6H3v2h1.133L6.01 21.142A1 1 0 0 0 7 22m10.418-11H6.582l-.429-3h11.693zm-9.551 9l-.429-3h9.123l-.429 3zM7.618 4h8.764l1 2H6.618z" />
            </svg>
            <p>카페</p>
          </li>
          <li class="nearby-item" @click="nearby('HP8')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M21 20h2v2H1v-2h2V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1zM11 8H9v2h2v2h2v-2h2V8h-2V6h-2zm3 12h2v-6H8v6h2v-4h4z" />
            </svg>
            <p>병원</p>
          </li>
          <li class="nearby-item" @click="nearby('PM9')"><svg xmlns="http://www.w3.org/2000/svg" width="5em"
              height="5em" viewBox="0 0 24 24">
              <path fill="currentColor" fill-rule="evenodd"
                d="M12.657 2.757a6 6 0 1 1 8.485 8.486l-9.9 9.9a6 6 0 1 1-8.485-8.486zm7.07 7.071l-4.242 4.243l-5.657-5.657l4.243-4.242a4 4 0 1 1 5.657 5.656"
                clip-rule="evenodd" />
            </svg>
            <p>약국</p>
          </li>
        </ul>
      </div>

      <div class="result">
        <ul>
          <template v-if="places.length">
            <li v-for="(place, index) in places">
              <h5>{{ index + 1 }}</h5>
              <div class="name" @click="getPlace(place)">{{ place.name }}</div>
              <div class="address">{{ place.address }}</div>
              <button v-if="loginStore.getId" @click="attraction = place; showModal = true">추가</button>
            </li>
          </template>
          <template v-else>
            <li>
              <div class="address" style="width: 100%;">{{ result_msg }}</div>
            </li>
          </template>
        </ul>
      </div>
    </aside>
    <div class="map-wrapper">
      <div id="map"></div>
    </div>
  </section>

  <PlaceAddModal v-show="showModal" :place=attraction @close="showModal = false" />
</template>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 85px);
}

aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  min-width: 320px;
  max-width: 500px;
  gap: 20px;
  box-sizing: border-box;
  padding: 10px 25px;
}

.line {
  position: relative;
  height: 0.5px;
  width: 100%;
}

hr {
  margin: 0;
  width: 100%;
  height: 1px;
  color: var(--light-grey);
}

.search {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.search input {
  padding: 10px 50px;
  font-size: 16px;
  border: solid 1px var(--navy);
}

.search .icon {
  position: absolute;
  left: 40px;
  transform: translateY(5%);
  z-index: 5;
  color: var(--light-grey);
}

.name {
  width: 90%;
}

.name p {
  text-align: left;
  font-weight: 700;
  color: var(--grey);
}

.weather {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 0 5%;
}

.weather .weather-icon {
  width: 85px;
}

.weather-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.main-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85px;
}

.main-info .temperature {
  font-size: 2.4em;
  font-weight: 700;
  text-align: left;
  color: black;
}

.main-info .weather-description {
  font-size: 1.2em;
  text-align: left;
}

.additional-info {
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
}

.additional-info p {
  font-size: 0.7em;
}

.additional-info span {
  color: var(--navy);
}

.nearby {
  position: absolute;
  text-align: center;
  background-color: var(--white);
  width: 20%;
  font-size: 0.4em;
  left: 50%;
  color: var(--black);
  transform: translate(-50%, -75%);
}

.nearby-info {
  width: 100%;
}

.nearby-items {
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  overflow-x: scroll;
  gap: 10px;
}

.nearby-item {
  width: 50px;
  flex-shrink: 0;
  text-align: center;
  font-size: 0.4em;
  cursor: pointer;
  color: var(--black);
  margin-bottom: 10px;
}

.result {
  width: 100%;
  height: calc(100vh - 55%);
  overflow-y: auto;
}

.result ul {
  overflow-y: auto;
}

.result li {
  border-bottom: solid 1px var(--light-grey);
  padding: 15px;
  position: relative;
  word-break: keep-all;
}

.result li:last-child {
  border: none;
}

.result .name {
  color: var(--black);
  font-size: 1em;
  width: 75%;
}

.result .address {
  font-size: 0.7em;
  width: 75%;
}

.result button {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--navy);
  color: var(--white);
  font-size: 0.6em;

}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  margin-left: 10px;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
