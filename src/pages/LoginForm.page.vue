<template>
    <n-card>
        <n-tabs v-model:value="activeTab" type="line" animated>
            <n-tab-pane name="login" tab="Connexion">
                <LoginForm @switch-to-register="activeTab = 'register'"/>
            </n-tab-pane>
            <n-tab-pane name="register" tab="Inscription">
                <RegisterForm @switch-to-login="activeTab = 'login'"/>
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

<script setup>
    import LoginForm from "../components/auth/LoginForm.component.vue"
    import RegisterForm from "../components/auth/RegisterForm.component.vue"

    const activeTab = ref("login");
</script>

<style scoped>

</style>