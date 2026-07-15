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

const FormAdmin = ({ formData, isEditing, onValidSubmit }) => {
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
    <form id="adminForm" className="container-fluid px-0" onSubmit={handleSubmit(onValidSubmit)} noValidate>
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

      </div>
    </form>
  );
};

export default FormAdmin;
