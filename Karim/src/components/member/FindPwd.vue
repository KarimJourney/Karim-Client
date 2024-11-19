<script setup>
import findPwd from '@/assets/js/findpwd'

const params = ref({
    userid: '',
    userpwd: ''
})
</script>

<template>
    <div id="container">
        <h1>비밀번호 찾기</h1>
        <form @submit.prevent="findPwd.handleFindBtn" method="POST">
            <div class="row">
                <div>아이디</div>
                <input id="finduserid" name="userid" class="btnCustom inputs" v-model="params.value.userid" />
                <input type="submit" value="찾기" id="findBtn" class="btnCustom">
            </div>

            <div class="row findPwd">
                <div>기존 비밀번호</div>
                <input id="finduserpwd" name="userpwd" class="btnCustom inputs" v-model="params.value.userpwd"
                    readonly />
            </div>

        </form>
    </div>
</template>

<style scoped></style>