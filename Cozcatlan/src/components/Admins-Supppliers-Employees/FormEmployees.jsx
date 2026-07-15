import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const NAME_PATTERN = {
  value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/,
  message: "Solo se permiten letras",
};

const EMAIL_PATTERN = {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Formato de correo inválido",
};

const DUI_PATTERN = {
  value: /^\d{8}-\d{1}$/,
  message: "Formato de DUI inválido (12345678-9)",
};

const PHONE_PATTERN = {
  value: /^[0-9-]{8,}$/,
  message: "Formato de teléfono inválido",
};

const calculateAge = (birthDateStr) => {
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const FormEmployee = ({ formData, isEditing, onValidSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  return (
    <form id="employeeForm" className="container-fluid px-0" onSubmit={handleSubmit(onValidSubmit)} noValidate>
      <div className="row g-3">
        {/* NOMBRE */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Nombre:</label>
          <input
            type="text"
            className="form-control cozca-input"
            {...register("firstName", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Debe tener al menos 2 caracteres" },
              pattern: NAME_PATTERN,
            })}
          />
          {errors.firstName && <span className="cozca-error-text">{errors.firstName.message}</span>}
        </div>

        {/* APELLIDO */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Apellido:</label>
          <input
            type="text"
            className="form-control cozca-input"
            {...register("lastName", {
              required: "El apellido es obligatorio",
              minLength: { value: 2, message: "Debe tener al menos 2 caracteres" },
              pattern: NAME_PATTERN,
            })}
          />
          {errors.lastName && <span className="cozca-error-text">{errors.lastName.message}</span>}
        </div>

        {/* CORREO */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Correo electrónico:</label>
          <input
            type="email"
            className="form-control cozca-input"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: EMAIL_PATTERN,
            })}
          />
          {errors.email && <span className="cozca-error-text">{errors.email.message}</span>}
        </div>

        {/* CONTRASEÑA - Solo al crear, se cambia por recuperación de contraseña */}
        {!isEditing && (
          <div className="col-md-6">
            <label className="cozca-label mb-1">Contraseña:</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control cozca-input"
                placeholder="**********"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
                })}
              />
              <button
                type="button"
                className="position-absolute end-0 top-50 translate-middle-y me-2 btn border-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </button>
            </div>
            {errors.password && <span className="cozca-error-text">{errors.password.message}</span>}
          </div>
        )}

        {/* FECHA DE NACIMIENTO */}
        <div className="col-md-4">
          <label className="cozca-label mb-1">Fecha nacimiento:</label>
          <input
            type="date"
            className="form-control cozca-input cozca-calendar-input"
            {...register("birthday", {
              required: "La fecha de nacimiento es obligatoria",
              validate: {
                notFuture: (value) => new Date(value) <= new Date() || "La fecha no puede ser futura",
                minAge: (value) => calculateAge(value) >= 18 || "El empleado debe ser mayor de 18 años",
              },
            })}
          />
          {errors.birthday && <span className="cozca-error-text">{errors.birthday.message}</span>}
        </div>

        {/* DUI */}
        <div className="col-md-4">
          <label className="cozca-label mb-1">DUI:</label>
          <input
            type="text"
            className="form-control cozca-input"
            placeholder="12345678-9"
            {...register("dui", {
              required: "El DUI es obligatorio",
              pattern: DUI_PATTERN,
            })}
          />
          {errors.dui && <span className="cozca-error-text">{errors.dui.message}</span>}
        </div>

        {/* TELÉFONO */}
        <div className="col-md-4">
          <label className="cozca-label mb-1">Teléfono:</label>
          <input
            type="text"
            className="form-control cozca-input"
            placeholder="6875-5412"
            {...register("phone", {
              required: "El teléfono es obligatorio",
              pattern: PHONE_PATTERN,
            })}
          />
          {errors.phone && <span className="cozca-error-text">{errors.phone.message}</span>}
        </div>

        {/* DIRECCIÓN */}
        <div className={isEditing ? "col-md-8" : "col-md-12"}>
          <label className="cozca-label mb-1">Dirección:</label>
          <input
            type="text"
            className="form-control cozca-input"
            {...register("address", {
              required: "La dirección es obligatoria",
              minLength: { value: 5, message: "Debe tener al menos 5 caracteres" },
            })}
          />
          {errors.address && <span className="cozca-error-text">{errors.address.message}</span>}
        </div>

        {/* ESTADO (SOLO EN EDICIÓN) */}
        {isEditing && (
          <div className="col-md-4">
            <label className="cozca-label mb-1">Estado:</label>
            <select className="form-select cozca-input" {...register("status")}>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        )}
      </div>
    </form>
  );
};

export default FormEmployee;
