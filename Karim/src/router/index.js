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
      path: "/password",
      name: "findpwd",
      component: () => import("@/components/member/FindPwd.vue"),
    },
    {
      path: "/me",
      name: "mypage",
      component: () => import("@/views/MyPageView.vue"),
      redirect: { name: "profile" },
      children: [
        {
          path: "",
          name: "profile",
          component: () => import("@/components/member/MyPage.vue"),
        },
        {
          path: "/edit",
          name: "memberedit",
          component: () => import("@/components/member/MemberEdit.vue"),
        },
      ],
    },
    {
      path: "/hotplace",
      name: "hotplace",
      component: () => import("@/views/HotplaceView.vue"),
    },
    {
      path: "/map",
      name: "map",
      component: () => import("@/views/MapView.vue"),
    },
    {
      path: "/plan/:id",
      name: "place",
      component: () => import("@/views/PlanView.vue"),
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
          name: "new",
          component: () => import("@/components/board/BoardNew.vue"),
        },
        {
          path: "post/:id",
          name: "detail",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "edit/:id",
          name: "update",
          component: () => import("@/components/board/BoardUpdate.vue"),
        },
      ],
    },
  ],
});

export default router;
