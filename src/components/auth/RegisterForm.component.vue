<template>
    <n-form>
        <n-form-item path="email" label="Email">
            <n-input v-model:value="email" placeholder="Entrez votre email"></n-input>
        </n-form-item>
        <n-form-item path="password" label="Mot de passe">
            <n-input
                v-model:value="password"
                :status="inputStatus"
                type="password"
                placeholder="Entrez votre mot de passe"
                show-password-on="click">
            </n-input>
        </n-form-item>
        <n-form-item path="password" label="Confirmer le mot de passe">
            <n-input
                v-model:value="confirmPassword"
                :status="inputStatus"
                type="password"
                placeholder="Confirmez votre mot de passe"
                show-password-on="click">
            </n-input>
        </n-form-item>
        <n-button @click="register" type="primary" block>
            S'inscrire
        </n-button>
        <p>Déjà inscrit ? <a href="#" @click="switchToLogin">Se connecter</a></p>
    </n-form>
</template>




<script setup lang="ts">
    import { ref } from 'vue';
    import type { User } from '../../types/common.type';
    import { useUserStore } from '../../stores/user.store';
    import { useMessage } from 'naive-ui';

    const emit = defineEmits(["switchToLogin"]);

    const switchToLogin = () => {
        emit("switchToLogin");
    }

    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const message = useMessage()
    const inputStatus = ref("");

    const userStore = useUserStore();

    const register = () => {
        if (password.value !== confirmPassword.value) {
            message.error("Le mot de passe et la confirmation sont différents");
            inputStatus.value = "error";
            return -1;
        };

        const user: User = {
            email: email.value,
            password: password.value
        }
        try {
            userStore.register(user);
            message.success("Utilisateur créé");
            switchToLogin();
        } catch (error: any) {
            message.error("Erreur");
        }
    }
</script>




<style scoped>

</style>