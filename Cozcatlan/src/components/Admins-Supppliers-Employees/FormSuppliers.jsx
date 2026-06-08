import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormSuppliers = ({ formData, isEditing, onValidSubmit }) => {
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
    <form id="supplierForm" className="container-fluid px-0 text-start" onSubmit={handleSubmit(onValidSubmit)} noValidate>
      <div className="row g-3">
        <div className="col-md-7">
          <label className="cozca-label mb-1">Nombre Completo:</label>
          <input
            type="text"
            className="form-control cozca-input"
            {...register("suppliers_name", { required: "El nombre es obligatorio" })}
          />
          {errors.suppliers_name && <span className="cozca-error-text">{errors.suppliers_name.message}</span>}
        </div>
        <div className="col-md-5">
          <label className="cozca-label mb-1">Tipo:</label>
          <select
            className="form-select cozca-input"
            {...register("type_supplier", { required: "Selecciona un tipo" })}
          >
            <option value="">Seleccionar...</option>
            <option value="Productor Agrícola">Productor Agrícola</option>
            <option value="Artesano Local">Artesano Local</option>
          </select>
          {errors.type_supplier && <span className="cozca-error-text">{errors.type_supplier.message}</span>}
        </div>
        <div className="col-md-6">
          <label className="cozca-label mb-1">Teléfono:</label>
          <input
            type="text"
            className="form-control cozca-input"
            placeholder="6875-5412"
            {...register("phone", {
              required: "El teléfono es obligatorio",
              pattern: { value: /^[0-9-]{8,}$/, message: "Formato de teléfono inválido" },
            })}
          />
          {errors.phone && <span className="cozca-error-text">{errors.phone.message}</span>}
        </div>
        <div className="col-md-6">
          <label className="cozca-label mb-1">Email:</label>
          <input
            type="email"
            className="form-control cozca-input"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de email inválido" },
            })}
          />
          {errors.email && <span className="cozca-error-text">{errors.email.message}</span>}
        </div>
        <div className="col-md-6">
          <label className="cozca-label mb-1">Calle:</label>
          <input
            type="text"
            className="form-control cozca-input"
            {...register("address.street", { required: "La calle es obligatoria" })}
          />
          {errors.address?.street && <span className="cozca-error-text">{errors.address.street.message}</span>}
        </div>
        <div className="col-md-6">
          <label className="cozca-label mb-1">Colonia/Barrio:</label>
          <input
            type="text"
            className="form-control cozca-input"
            {...register("address.neighborhood", { required: "La colonia es obligatoria" })}
          />
          {errors.address?.neighborhood && <span className="cozca-error-text">{errors.address.neighborhood.message}</span>}
        </div>
        {isEditing && (
          <div className="col-md-4">
            <label className="cozca-label mb-1">Estado:</label>
            <select
              className="form-select cozca-input"
              {...register("status", { setValueAs: (v) => v === "true" })}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        )}
      </div>
    </form>
  );
};

export default FormSuppliers;
