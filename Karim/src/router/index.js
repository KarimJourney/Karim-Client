import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/kakaojoin",
      name: "kakaojoin",
      component: () => import("@/components/member/KakaoJoin.vue"),
    },
    {
      path: "/password",
      name: "findpwd",
      component: () => import("@/components/member/FindPwd.vue"),
    },
    {
      path: "/profile",
      name: "mypage",
      component: () => import("@/views/MyPageView.vue"),
      redirect: { name: "profile" },
      children: [
        {
          path: ":id",
          name: "profile",
          component: () => import("@/components/member/Profile.vue"),
        },
        {
          path: "edit",
          name: "memberedit",
          component: () => import("@/components/member/MemberEdit.vue"),
        },
      ],
    },
    {
      path: "/map",
      name: "map",
      component: () => import("@/views/MapView.vue"),
    },
    {
      path: "/plan/:id",
      name: "place",
      component: () => import("@/views/TripView.vue"),
    },
    {
      path: "/board",
      name: "board",
      component: () => import("@/views/BoardView.vue"),
      redirect: { name: "boardlist" },
      children: [
        {
          path: "",
          name: "boardlist",
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "new",
          name: "boardnew",
          component: () => import("@/components/board/BoardNew.vue"),
        },
        {
          path: "post/:id",
          name: "boarddetail",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "edit/:id",
          name: "boardupdate",
          component: () => import("@/components/board/BoardUpdate.vue"),
        },
      ],
    },
    {
      path: "/help",
      name: "help",
      component: () => import("@/views/HelpView.vue"),
    },
  ],
});

export default router;
