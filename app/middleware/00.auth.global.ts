export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  const runtimeConfig = useRuntimeConfig()

  const token = useCookie("token-auth", runtimeConfig.public.cookieConfig)

  const publicRoutes = ["/", "/auth/login", "/auth/register"]

  const isPublicRoute = publicRoutes.includes(to.path)

  if (!token.value) {
    if (!isPublicRoute) {
      return navigateTo("/auth/login")
    }
    return
  }

  try {
    await authStore.setAuth()
    if (to.path === "/auth/login" || to.path === "/auth/register") return navigateTo("/")
  } catch (e) {
    token.value = null

    if (!isPublicRoute) return navigateTo("/auth/login")
  }
})