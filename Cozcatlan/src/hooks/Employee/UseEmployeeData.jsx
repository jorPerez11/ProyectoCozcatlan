import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../UseAuthAdmin.js";
import { Link, useNavigate } from "react-router";

const UseClientData = () => {
    const navigate = useNavigate();
    const API_BASE = "http://localhost:4000/api/employee";
    const API_REGISTER = `${API_BASE}/registerEmployee`;
    const API_USERS = `${API_BASE}`;
    const TOKEN_KEY = "accessTokenAdmin";

    const [activeTab, setActiveTab] = useState("list");
    // Campos de Admin
    const [id, setId] = useState("");
    const [firstName, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [dui, setDui] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");



    const [userType, setUserType] = useState("employee");
    const [isVerified, setIsVerified] = useState(false);
    const [errorUser, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const { logout } = useAuth();
    const authExpiredHandledRef = useRef(false);

    const handleUnauthorized = useCallback(async () => {
        if (authExpiredHandledRef.current) {
            return;
        }

        authExpiredHandledRef.current = true;
        await logout({ reason: "expired", callApi: false });
    }, [logout]);

    const getAccessToken = () => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

    const buildHeaders = (withBody = false) => {
        const token = getAccessToken();
        const headers = {
            ...(withBody ? { "Content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        return headers;
    };

    const parseBoolean = (value) => {
        if (typeof value === "boolean") {
            return value;
        }

        if (typeof value === "string") {
            const normalized = value.trim().toLowerCase();
            return normalized === "true" || normalized === "1";
        }

        if (typeof value === "number") {
            return value === 1;
        }

        return false;
    };

    const normalizeUser = (apiUser = {}) => ({
        id: apiUser._id || apiUser.id || "",
        firstName: apiUser.firstName || "",
        lastName: apiUser.lastName || "",
        email: apiUser.email || "",
        birthday: apiUser.birthday ? String(apiUser.birthday).slice(0, 10) : "",
        dui: apiUser.dui || "",
        phone: apiUser.phone || "",
        address: apiUser.address || "",


        isVerified: parseBoolean(apiUser.isVerified),
    });

    const extractApiPayload = (payload = {}) => {
        const data = payload?.employees ?? null;
        return {
            data,
            message: payload?.message || "",
            errors: payload?.meta?.errors || [],
        };
    };

    const cleanForm = () => {
        setId("");
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setDui("");
        setPhone("");
        setAddress("");
        setBirthday("");

        setIsVerified(false);
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getAccessToken();
            if (!token) {
                await handleUnauthorized();
                return;
            }

            const response = await fetch(API_USERS, {
                method: "GET",
                headers: buildHeaders(),
                credentials: "include",
            });

            const payload = await response.json().catch(() => ({}));
            const { data, message } = extractApiPayload(payload);

            if (!response.ok) {
                if (response.status === 401) {
                    await handleUnauthorized();
                    return;
                }
                throw new Error(message || "Error al obtener los usuarios");
            }

            const userList = Array.isArray(data) ? data.map(normalizeUser) : [];
            setUsers(userList);
        } catch (error) {
            setUsers([]);
            setError(error.message);
            toast.error(error.message || "Error al obtener los usuarios");
        } finally {
            setLoading(false);
        }
    };



    const handleaSubmit = async (formData = null) => {
        const payloadData = formData || {
            firstName,
            lastName,
            email,
            password,
            dui,
            phone,
            address,
            birthday,
            isVerified,
        };

        const normalizedPayload = {
            firstName: payloadData.firstName?.trim() || "",
            lastName: payloadData.lastName?.trim() || "",
            email: payloadData.email?.trim() || "",
            password: payloadData.password || "",
            birthDate: payloadData.birthDate || "",
            dui: payloadData.dui || "",
            address: payloadData.address || "",
            phone: payloadData.phone || "",

            isVerified: parseBoolean(payloadData.isVerified),
        };

        if (!normalizedPayload.firstName || !normalizedPayload.lastName || !normalizedPayload.email || !normalizedPayload.password) {
            const message = "Todos los campos deben ser completados";
            setError(message);
            toast.error(message);
            return false;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(API_REGISTER, {
                method: "POST",
                headers: buildHeaders(true),
                body: JSON.stringify(normalizedPayload),
                credentials: "include",
            });

            const payload = await response.json().catch(() => ({}));
            const { message, errors } = extractApiPayload(payload);

            if (!response.ok) {
                if (response.status === 401) {
                    await handleUnauthorized();
                    return false;
                }
                const backendErrors = Array.isArray(errors) && errors.length > 0 ? `: ${errors.join(", ")}` : "";
                throw new Error((message || "Error al registrar el usuario") + backendErrors);
            }
            //Guardamos los datos para que "Reenviar Código" pueda leerlos
            sessionStorage.setItem("pendingRegistration", JSON.stringify(normalizedPayload));
            toast.success(message || "Usuario registrado exitosamente");
            cleanForm();
            await fetchData();
            navigate("/employees/verifyEmail");
            setSuccess(message || "Usuario registrado exitosamente");
        } catch (error) {
            setError(error.message);
            toast.error(error.message || "Error al registrar el usuario");
            return false;
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = async (userId) => {
        if (!userId) {
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${API_USERS}/${userId}`, {
                method: "DELETE",
                headers: buildHeaders(),
                credentials: "include",
            });

            const payload = await response.json().catch(() => ({}));
            const { message } = extractApiPayload(payload);

            if (!response.ok) {
                if (response.status === 401) {
                    await handleUnauthorized();
                    return;
                }
                throw new Error(message || "Error al eliminar el usuario");
            }

            toast.success(message || "Usuario eliminado exitosamente");
            setSuccess(message || "Usuario eliminado exitosamente");
            await fetchData();
        } catch (error) {
            setError(error.message);
            toast.error(error.message || "Error al eliminar el usuario");
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (userData) => {
        const normalized = normalizeUser(userData);
        setId(normalized.id);
        setName(normalized.firstName);
        setLastName(normalized.lastName);
        setEmail(normalized.email);
        setPassword("");
        setDui(normalized.dui);
        setBirthday(normalized.birthday);
        setAddress(normalized.address);
        setPhone(normalized.phone);

        setIsVerified(normalized.isVerified);
        setError(null);
        setSuccess(null);
        setActiveTab("form");
    };

    const handleUpdateSubmit = async (formData = null, userId = null) => {
        const targetId = userId || id;
        const payloadData = formData || {
            firstName,
            lastName,
            email,
            dui,
            birthday,
            phone,
            address
        };

        const normalizedPayload = {
            firstName: payloadData.firstName?.trim() || "",
            lastName: payloadData.lastName?.trim() || "",
            email: payloadData.email?.trim() || "",
            dui: payloadData.dui?.trim() || "",
            birthday: payloadData.birthday?.trim() || "",
            phone: payloadData.phone?.trim() || "",
            address: payloadData.address?.trim() || "",


        };

        if (!targetId) {
            const message = "No se encontró el usuario a actualizar";
            setError(message);
            toast.error(message);
            return false;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${API_USERS}/${targetId}`, {
                method: "PUT",
                headers: buildHeaders(true),
                body: JSON.stringify(normalizedPayload),
                credentials: "include",
            });

            const payload = await response.json().catch(() => ({}));
            const { message, errors } = extractApiPayload(payload);

            if (!response.ok) {
                if (response.status === 401) {
                    await handleUnauthorized();
                    return false;
                }
                const backendErrors = Array.isArray(errors) && errors.length > 0 ? `: ${errors.join(", ")}` : "";
                throw new Error((message || "Error al actualizar el usuario") + backendErrors);
            }

            toast.success(message || "Usuario actualizado exitosamente");
            setSuccess(message || "Usuario actualizado exitosamente");
            cleanForm();
            setActiveTab("list");
            await fetchData();
            return true;
        } catch (error) {
            setError(error.message);
            toast.error(error.message || "Error al actualizar el usuario");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        activeTab,
        setActiveTab,
        id,
        setId,
        firstName,
        setName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        dui,
        setDui,
        phone,
        setDui,
        address,
        setAddress,
        birthday,
        setBirthday,
        isVerified,
        setIsVerified,
        errorUser,
        setError,
        success,
        setSuccess,
        loading,
        setLoading,
        users,
        setUsers,
        cleanForm,
        handleaSubmit,
        fetchData,
        deleteUser,
        updateUser,
        handleUpdateSubmit,
    };
};

export default UseClientData;