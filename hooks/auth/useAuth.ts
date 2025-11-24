import { useLogin } from "./useLogin";
import { useLogout } from "./useLogout";
import { useAuthStore } from "./auth.store";
import { LoginFormType } from "@/domain/auth";
import { useValidateUser } from "./useValidate";

export function useAuth() {
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const validateUserMutation = useValidateUser();

  const { user, token, loading, setUser, setToken, setLoading, logout } =
    useAuthStore();

  const login = async (data: LoginFormType) => {
    try {
      setLoading(true);
      const result = await loginMutation.mutateAsync(data);

      setUser(result.user);
      setToken(result.token);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const validate = async () => {
    setLoading(true);

    try {
      await validateUserMutation.mutateAsync({
        token: token ?? "",
        userId: user?.id ?? "",
      });
    } catch {
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      await logoutMutation.mutateAsync(user?.id ?? "");
      logout();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    token,
    loading,

    login,
    logout: logoutUser,
    validate,
    setUser,
  };
}
